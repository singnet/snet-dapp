const dotenv = require("dotenv");
dotenv.config();
const path = require("path");
const file_system = require("fs");
const archiver = require("archiver");

const outputFilePath = path.resolve("./", "component.zip");
const output = file_system.createWriteStream(outputFilePath);
const archive = archiver("zip");

console.log("inside zip components");

if (!process.env.REACT_APP_SANDBOX) {
  console.log("This feature is only for sandbox mode");
  process.exit(1);
}

if (!process.env.REACT_APP_SANDBOX_ORG_ID) {
  console.log("please set value for `REACT_APP_SANDBOX_ORG_ID` in the `.env` file");
  process.exit(1);
}

if (!process.env.REACT_APP_SANDBOX_SERVICE_ID) {
  console.log("please set value for `REACT_APP_SANDBOX_SERVICE_ID` in the `.env` file");
  process.exit(1);
}

const orgIdPath = process.env.REACT_APP_SANDBOX_ORG_ID.replace(/\-/g, "_");
const serviceIdPath = process.env.REACT_APP_SANDBOX_SERVICE_ID.replace(/\-/g, "_");
console.log("./", "src/assets/thirdPartyServices", orgIdPath, serviceIdPath);
const componentDirectory = path.resolve("./", "src/assets/thirdPartyServices", orgIdPath, serviceIdPath);

output.on("close", () => {
  console.log(archive.pointer() + " total bytes");
  console.log(`Your component has been archived successfully. \n${outputFilePath}`);
});

archive.on("error", err => {
  throw err;
});

archive.pipe(output);

// append files from a sub-directory, putting its contents at the root of archive
archive.directory(componentDirectory, false);

archive.finalize();

console.log("path   ", componentDirectory);
