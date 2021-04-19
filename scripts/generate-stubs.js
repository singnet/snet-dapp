const util = require("util");
const exec = util.promisify(require("child_process").exec);
const fs = require("fs");
const fsPromises = fs.promises;
const os = require("os");

const axios = require("axios");
const AdmZip = require("adm-zip");
const rimraf = require("rimraf");
const prompts = require("prompts");
const dotenv = require("dotenv");
dotenv.config();

const protoCVersion = "3.15.8";
const extractedFolder = "protoBinary";
const downloadedZipName = `${extractedFolder}.zip`;
const outputDir = "generatedLibraries";
let packageName;
let orgId;
let serviceId;
let namespacePrefix;

console.log("proces architecture", process.arch);

const getProtoBinaryFileURL = () => {
  const osPlatform = os.platform();
  switch (osPlatform) {
    case "win32":
      return `https://github.com/protocolbuffers/protobuf/releases/download/v${protoCVersion}/protoc-${protoCVersion}-win32.zip`;
    case "darwin":
      return `https://github.com/protocolbuffers/protobuf/releases/download/v${protoCVersion}/protoc-${protoCVersion}-osx-x86_64.zip`;
    case "linux":
      return `https://github.com/protocolbuffers/protobuf/releases/download/v${protoCVersion}/protoc-${protoCVersion}-linux-x86_64.zip`;
    default:
      return `https://github.com/protocolbuffers/protobuf/releases/download/v${protoCVersion}/protoc-${protoCVersion}-linux-x86_64.zip`;
  }
};

const promptForDetails = async () => {
  const { shouldIncludeNamespacePrefix } = await prompts({
    type: "confirm",
    name: "shouldIncludeNamespacePrefix",
    message: "Do you like to include a unique namespace prefix in the generated client libraries",
    initial: false,
  });
  if (shouldIncludeNamespacePrefix) {
    orgId = process.env.REACT_APP_SANDBOX_ORG_ID;
    serviceId = process.env.REACT_APP_SANDBOX_SERVICE_ID;
    const response = await prompts({
      type: "text",
      name: "packageName",
      message: "Package Name",
      validate: value =>
        value && Boolean(value.trim()) ? true : "Please enter the Package Name. It wil be in the .proto file",
    });
    packageName = response.packageName.trim();
    if (!orgId) {
      const response = await prompts({
        type: "text",
        name: "orgId",
        message: "Organization Id",
        validate: value => (value && Boolean(value.trim()) ? true : "Please enter the organization Id"),
      });
      orgId = response.orgId.trim();
    }
    if (!serviceId) {
      const response = await prompts({
        type: "text",
        name: "serviceId",
        message: "Service Id",
        validate: value => (value && Boolean(value.trim()) ? true : "Please enter the service Id"),
      });
      serviceId = response.serviceId.trim();
    }
    namespacePrefix = `${packageName.replace(/-/g, "_")}_${orgId.replace(/-/g, "_")}_${serviceId.replace(/-/g, "_")}`;
  }
};

const getProtoFilePathFromArgs = async () => {
  if (process.argv.length <= 2) {
    console.error("Missing input file. Provide the path to the proto file");
    process.exit();
  }
  await promptForDetails();
  let protoFilePath = process.argv[2].split(".");
  if (protoFilePath[protoFilePath.length] !== "proto") protoFilePath = `${protoFilePath}.proto`;
  return protoFilePath;
};

const downloadProtoCBinary = async protoBinaryFileURL => {
  const { data } = await axios.get(protoBinaryFileURL, { responseType: "arraybuffer" });
  await fsPromises.writeFile(downloadedZipName, data);
  const zip = new AdmZip(downloadedZipName);
  zip.extractAllTo(`./${extractedFolder}`, true);
};

const executeProtoCBinary = async protoFilePath => {
  try {
    if (!fs.existsSync(outputDir)) await fsPromises.mkdir(outputDir);
    const { stderr } = await exec(
      `./${extractedFolder}/bin/protoc ${protoFilePath} --js_out=import_style=commonjs,binary,${
        namespacePrefix ? "namespace_prefix=" + namespacePrefix : ""
      }:${outputDir} --ts_out=service=grpc-web:${outputDir} --plugin=protoc-gen-ts=./node_modules/.bin/protoc-gen-ts`
    );
    if (stderr) throw new Error(stderr);
  } catch (err) {
    console.error(err.message);
    process.exit();
  }
};

const removeUnwantedFiles = () => {
  rimraf.sync(extractedFolder);
  rimraf.sync(downloadedZipName);
  rimraf.sync(`./${outputDir}/*.ts`);
};

const generateStubs = async () => {
  const protoFilePath = await getProtoFilePathFromArgs();
  const protoBinaryFileURL = getProtoBinaryFileURL();
  await downloadProtoCBinary(protoBinaryFileURL);
  await executeProtoCBinary(protoFilePath);
  removeUnwantedFiles();
};

generateStubs();
