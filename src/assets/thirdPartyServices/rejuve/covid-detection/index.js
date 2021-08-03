import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import FileUploader from "../../common/FileUploader";

const margin = 20;

const CovidDetection = () => {
  const uploadedFile = () => {
    alert("uploadedFile");
  };

  const handleFileUpload = () => {
    alert("handleFileUpload");
  };

  const validateFile = () => {
    alert("Validate File");
  };

  const submitAction = () => {
    alert("Submit action");
  };

  return (
    <>
      <Grid item xs={12} container justify="flex-start" style={{ textAlign: "center", marginTop: margin }}>
        <Typography variant="body2" component="p" align="left" style={{ marginBottom: margin }}>
          Select Breathe file to upload
        </Typography>
        <FileUploader
          name="coughUrl"
          type="file"
          uploadedFiles={() => uploadedFile()}
          handleFileUpload={() => handleFileUpload()}
          setValidationStatus={() => validateFile()}
          fileAccept=".wav or .mp3"
        />
        <Typography variant="body2" component="p" align="left" style={{ marginBottom: margin, marginTop: margin }}>
          Select Cough file to upload
        </Typography>
        <FileUploader
          name="coughUrl"
          type="file"
          uploadedFiles={() => uploadedFile()}
          handleFileUpload={() => handleFileUpload()}
          setValidationStatus={() => validateFile()}
          fileAccept=".wav or .mp3"
        />
        <Grid item xs={12} style={{ textAlign: "center", marginTop: margin }}>
          <Button variant="contained" color="primary" onClick={() => submitAction()}>
            Invoke
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default CovidDetection;
