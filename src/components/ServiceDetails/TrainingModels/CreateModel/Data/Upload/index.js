import React, { useState } from "react";
import { publishDatasetToS3 } from "../../../../../../Redux/actionCreators/ServiceTrainingActions";
import AlertBox, { alertTypes } from "../../../../../common/AlertBox";
import { isEmpty } from "lodash";
import SNETFileUpload from "../../../../../common/SNETFileUpload";

import { withStyles } from "@mui/styles";
import { useStyles } from "./styles";

const acceptedFileTypes = ["application/zip", "application/x-zip-compressed"];

const Data = ({ classes, trainingDataLink, setTrainingDataLink }) => {
  const [alert, setAlert] = useState({});
  const [trainingDataFileName, setTrainingDataFileName] = useState("");
  const [trainingDataFileSize, setTrainingDataFileSize] = useState("");

  const handleDrop = async (acceptedFiles, rejectedFiles) => {
    setAlert({});
    if (!isEmpty(rejectedFiles)) {
      return setAlert({
        type: alertTypes.ERROR,
        message: "File more than 50mB",
      });
    }
    if (!isEmpty(acceptedFiles)) {
      try {
        const fileBlob = acceptedFiles[0];
        const { name, size } = fileBlob;

        setTrainingDataFileName(name);
        setTrainingDataFileSize(size);
        const url = await publishDatasetToS3(fileBlob, name);

        setTrainingDataLink(url);
      } catch (error) {
        setAlert({ type: alertTypes.ERROR, message: error.message });
      }
    }
  };

  return (
    <div className={classes.uploader}>
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
        uploadSuccess={Boolean(trainingDataLink)}
      />
      <AlertBox type={alert?.type} message={alert.message} />
    </div>
  );
};

export default withStyles(useStyles)(Data);
