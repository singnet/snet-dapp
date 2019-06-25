// const { outPath } = require("./../config/paths.js");
const { outPath } = require("./path");

const [, , Bucket, region] = process.argv;
console.log("Region " + region + " Bucket " + Bucket);

const { createReadStream } = require("fs");
const { relative } = require("path");
const { cwd } = require("process");
const readdir = require("recursive-readdir");
const mime = require("mime-types");
const AWS = require("aws-sdk");
AWS.config.update({ region });
const s3 = new AWS.S3({ apiVersion: "2006-03-01" });

const getFilePath = file =>
    relative(cwd(), file)
        .split("/")
        .slice(1)
        .join("/");

readdir(outPath)
    .then(files =>
        Promise.all(
            files.map(Key => {
                const fileRelativePath = getFilePath(Key);
                console.log(fileRelativePath);
                return s3
                    .upload({
                        Bucket,
                        Key: fileRelativePath,
                        ContentType: mime.lookup(Key),
                        Body: createReadStream(Key),
                        CacheControl:
                            fileRelativePath === "index.html"
                                ? "no-cache, no-store, must-revalidate"
                                : "public, max-age=31536000",
                        ...(Key.includes("bundle") ? { ContentEncoding: "gzip" } : {}),
                    })
                    .promise();
            })
        )
    )
    .then(() => {
        console.log(`Files uploaded successfully`);
    })
    .catch(error => {
        console.log(error);
    });
