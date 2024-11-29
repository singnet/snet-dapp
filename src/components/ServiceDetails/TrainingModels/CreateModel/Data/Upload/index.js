import React, { useState } from "react";
import { publishDatasetForTraining } from "../../../../../../Redux/actionCreators/ServiceTrainingActions";
import AlertBox, { alertTypes } from "../../../../../common/AlertBox";
import { isEmpty } from "lodash";
import SNETFileUpload from "../../../../../common/SNETFileUpload";

import { withStyles } from "@mui/styles";
import { useStyles } from "./styles";
import { useDispatch } from "react-redux";

const acceptedFileTypes = { "application/zip": ".zip", "application/x-zip-compressed": ".zip" };

const Data = ({ classes, trainingDataset, setTrainingDataset }) => {
  const dispatch = useDispatch();

  const [alert, setAlert] = useState({});
  const [trainingDataFileName, setTrainingDataFileName] = useState(trainingDataset ? trainingDataset?.name : "");
  const [trainingDataFileSize, setTrainingDataFileSize] = useState(trainingDataset ? trainingDataset?.size : "");

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
        const  { url } = await dispatch(publishDatasetForTraining(fileBlob, name));

        setTrainingDataset({ link: url, name, size });
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
        uploadSuccess={Boolean(trainingDataset?.link)}
      />
      <AlertBox type={alert?.type} message={alert.message} />
    </div>
  );
};

export default withStyles(useStyles)(Data);
