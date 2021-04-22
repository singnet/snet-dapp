const util = require("util");
const exec = util.promisify(require("child_process").exec);
const fs = require("fs");
const fsPromises = fs.promises;
const os = require("os");

const axios = require("axios");
const AdmZip = require("adm-zip");
const rimraf = require("rimraf");
const prompts = require("prompts");
const chalk = require("chalk");
const dotenv = require("dotenv");
dotenv.config();

const protoCVersion = "3.15.8";
const extractedFolder = "protoBinary";
const downloadedZipName = `${extractedFolder}.zip`;
const outputDir = "grpc-client-libraries";
let packageName;
let orgId;
let serviceId;
let namespacePrefix;

console.log("proces architecture", process.arch);

const displayError = (...args) => {
  console.error(chalk.red(...args));
  process.exit();
};

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

const validateCommand = () => {
  if (process.argv.length <= 2) {
    displayError("Missing input file. Provide the path to the proto file");
  }
};

const promptForDetails = async () => {
  const { shouldIncludeNamespacePrefix } = await prompts({
    type: "select",
    name: "shouldIncludeNamespacePrefix",
    message: "How do you want to create the stubs",
    choices: [
      { title: "With namespace prefix", description: "Recommended", value: true },
      { title: "Without namespace prefix", value: false },
    ],
    initial: 0,
  });

  if (shouldIncludeNamespacePrefix) {
    const response = await prompts({
      type: "text",
      name: "packageName",
      message: "Package Name",
      validate: value =>
        value && Boolean(value.trim()) ? true : "Please enter the Package Name. It wil be in the .proto file",
    });
    if (!response.packageName) {
      displayError("Package Name is not provided.");
    }
    packageName = response.packageName.trim();
    if (!orgId) {
      const response = await prompts({
        type: "text",
        name: "orgId",
        message: "Organization Id",
        validate: value => (value && Boolean(value.trim()) ? true : "Please enter the organization Id"),
        initial: process.env.REACT_APP_SANDBOX_ORG_ID,
      });
      if (!response.orgId) {
        displayError("Organization Id is not provided.");
      }
      orgId = response.orgId.trim();
    }
    if (!serviceId) {
      const response = await prompts({
        type: "text",
        name: "serviceId",
        message: "Service Id",
        validate: value => (value && Boolean(value.trim()) ? true : "Please enter the service Id"),
        initial: process.env.REACT_APP_SANDBOX_SERVICE_ID,
      });
      if (!response.serviceId) {
        displayError("Service Id is not provided.");
      }
      serviceId = response.serviceId.trim();
    }
    namespacePrefix = `${packageName.replace(/-/g, "_")}_${orgId.replace(/-/g, "_")}_${serviceId.replace(/-/g, "_")}`;
  }
};

const getProtoFilePathFromArgs = () => {
  let protoFilePath = process.argv[2];
  const regex = new RegExp("([a-zA-Z0-9s_\\.-:])+(.proto)$");
  if (!regex.test(protoFilePath)) {
    displayError("Please provide path to the file with `.proto` extension");
  }
  return protoFilePath;
};

const downloadProtoCBinary = async protoBinaryFileURL => {
  let data;
  try {
    const response = await axios.get(protoBinaryFileURL, { responseType: "arraybuffer" });
    data = response.data;
  } catch (error) {
    displayError("Unable to download the binary from the URL: ", protoBinaryFileURL);
  }

  try {
    await fsPromises.writeFile(downloadedZipName, data);
    const zip = new AdmZip(downloadedZipName);
    zip.extractAllTo(`./${extractedFolder}`, true);
  } catch (error) {
    displayError("unable to extract the downloaded zip file: ", downloadedZipName);
  }
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
    displayError("Unable to execute the binary", err.message);
  }
};

const removeUnwantedFiles = () => {
  rimraf.sync(extractedFolder);
  rimraf.sync(downloadedZipName);
  rimraf.sync(`./${outputDir}/*.ts`);
};

const generateStubs = async () => {
  validateCommand();
  const protoFilePath = getProtoFilePathFromArgs();
  await promptForDetails();
  const protoBinaryFileURL = getProtoBinaryFileURL();
  await downloadProtoCBinary(protoBinaryFileURL);
  await executeProtoCBinary(protoFilePath);
  removeUnwantedFiles();
  console.log(
    chalk.green("Grpc client libraries have been generated successfully and saved inside the folder ", outputDir)
  );
};

generateStubs();
