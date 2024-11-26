import { useState } from "react";
import { withStyles } from "@mui/styles";
import { useStyles } from "./styles";
import { publishDatasetForImproving } from "../../../../Redux/actionCreators/ServiceTrainingActions";
import SNETFileUpload from "../../../common/SNETFileUpload";
import { isEmpty } from "lodash";

const examplesDatasets = [
  { id: 1, tag: "Text", name: "Dataset 1", link: "link/to/s3/1" },
  { id: 2, tag: "Text", name: "Dataset 2", link: "link/to/s3/2" },
  { id: 3, tag: "Text", name: "Dataset 3", link: "link/to/s3/3" },
  { id: 4, tag: "Text", name: "Dataset 4", link: "link/to/s3/4" },
];

const acceptedFileTypes = ["application/zip", "application/x-zip-compressed"];

const DatasetUploader = ({ classes, setDatasetLink }) => {
  //   const [uploadedDataset, setUploadedDataset] = useState()
  const [trainingDataFileName, setTrainingDataFileName] = useState("");
  const [trainingDataFileSize, setTrainingDataFileSize] = useState("");

  //   const setDataset = async (datasetBlob) => {
  //     const linkToDataset = await publishDatasetForImproving(datasetBlob); //sentToS3(datasetBlob);
  //     setUploadedDataset(datasetBlob);
  //     setDatasetLink(linkToDataset);
  //   };

  const ExampleDataset = ({ name, link, tag }) => {
    return (
      <div onClick={() => setDatasetLink(link)} className={classes.exampleDataset}>
        <div>{name}</div>
        <div>{tag}</div>
      </div>
    );
  };

  const ExampleFiles = () => {
    return (
      <div className={classes.examplesContainer}>
        {examplesDatasets.map((exampleDataset) => (
          <ExampleDataset
            key={exampleDataset.id}
            name={exampleDataset.name}
            link={exampleDataset.link}
            tag={exampleDataset.tag}
          />
        ))}
      </div>
    );
  };

  const handleDrop = async (acceptedFiles, rejectedFiles) => {
    if (!isEmpty(rejectedFiles)) {
      console.log("rejectedFiles: ", rejectedFiles);
      return;
    }
    if (!isEmpty(acceptedFiles)) {
      try {
        const fileBlob = acceptedFiles[0];
        const { name, size } = fileBlob;

        setTrainingDataFileName(name);
        setTrainingDataFileSize(size);
        const url = await publishDatasetForImproving(fileBlob, name);
        setDatasetLink(url);
      } catch (error) {
        console.log("error: ", error);

        // setAlert({ type: alertTypes.ERROR, message: error.message });
      }
    }
  };

  return (
    <div className={classes.datasetUploader}>
      <div className={classes.uploaderContainer}>
        <p>Drag & Drop or Select File</p>
        <SNETFileUpload
          onDrop={handleDrop}
          accept={acceptedFileTypes}
          multiple={false}
          showFileDetails
          helperText={
            <>
              <p>* Package must be under 50mb</p>
              <p>* Make sure the extension is .zip</p>
            </>
          }
          fileName={trainingDataFileName}
          fileSize={trainingDataFileSize}
          uploadSuccess={Boolean(trainingDataFileName)}
          isFileStatsDisplay={false}
        />
      </div>
      <div className={classes.examplesContainer}>
        <span>Select exemple dataset</span>
        <ExampleFiles />
      </div>
    </div>
  );
};

export default withStyles(useStyles)(DatasetUploader);
