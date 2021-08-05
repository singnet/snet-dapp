import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import FileUploader from "../../common/FileUploader";

import { COVID } from "./cough_test_pb_service";

const margin = 20;
const maxFilePerUpload = 1;

const fileType = { COUGH: "COUGH", BREATH: "BREATH", VOWEL: "VOWEL" };

const initialState = {
  uploadedFiles: { [fileType.COUGH]: undefined, [fileType.BREATH]: undefined, [fileType.VOWEL]: undefined },
};

export default class CovidDetection extends React.Component {
  constructor(props) {
    super(props);

    this.submitAction = this.submitAction.bind(this);
    this.handleFileUpload = this.handleFileUpload.bind(this);
    this.handleCoughFile = this.handleCoughFile.bind(this);
    this.handleBreathFile = this.handleBreathFile.bind(this);
    this.handleVowelFile = this.handleVowelFile.bind(this);
    this.isEnabled = this.isEnabled.bind(this);
    this.validateFile = this.validateFile.bind(this);
    this.createTmpPath = this.createTmpPath.bind(this);

    this.state = { ...initialState, response: undefined };
  }

  createTmpPath(file) {
    const blob = new Blob([file], { type: "audio/wav" });
    return window.URL.createObjectURL(blob);
  }

  submitAction() {
    const methodDescriptor = COVID["s2t"];
    const request = new methodDescriptor.requestType();

    const { uploadedFiles } = this.state;

    request.setCoughUrl(this.createTmpPath(uploadedFiles[fileType.COUGH]));
    request.setBreathUrl(this.createTmpPath(uploadedFiles[fileType.BREATH]));
    request.setVowelSoundUrl(this.createTmpPath(uploadedFiles[fileType.VOWEL]));
    request.setUserId("some-random");
    request.setSubmissionId("random-id");

    const props = {
      request,
      onEnd: response => {
        const { message, status, statusMessage } = response;
        if (status !== 0) {
          throw new Error(statusMessage);
        }
        this.setState({
          response: { status: "success", language: message.getText() },
        });
      },
    };

    this.props.serviceClient.unary(methodDescriptor, props);
  }

  validateFile() {
    return;
  }

  handleVowelFile(files) {
    this.handleFileUpload(files, fileType.VOWEL);
  }

  handleBreathFile(files) {
    this.handleFileUpload(files, fileType.BREATH);
  }

  handleCoughFile(files) {
    this.handleFileUpload(files, fileType.COUGH);
  }

  handleFileUpload(files, name) {
    const [file] = files;
    this.setState({ ...this.state, uploadedFiles: { ...this.state.uploadedFiles, [name]: file } });
  }

  isEnabled() {
    const { uploadedFiles } = this.state;
    if (uploadedFiles[fileType.BREATH] && uploadedFiles[fileType.COUGH] && uploadedFiles[fileType.VOWEL]) {
      return true;
    }
    return false;
  }

  renderComplete() {
    return (
      <Grid item xs={12} container justify="center">
        <p style={{ fontSize: "20px" }}>Response from service: {this.state.response} </p>
      </Grid>
    );
  }

  render() {
    if (this.props.isComplete) return <div>{this.renderComplete()}</div>;
    return (
      <Grid container direction="column" alignItems="center" justify="center">
        <Grid item xs={8} container justify="flex-start" style={{ textAlign: "center", marginTop: margin }}>
          <Typography variant="body2" component="p" align="left" style={{ marginBottom: margin, marginTop: margin }}>
            Select Vowel file to upload
          </Typography>
          <FileUploader
            name="vowelUrl"
            type="file"
            uploadedFiles={this.state.uploadedFiles[fileType.VOWEL]}
            handleFileUpload={this.handleVowelFile}
            setValidationStatus={this.validateFile}
            maxFileNames={maxFilePerUpload}
            fileAccept=".wav"
          />
          <Typography variant="body2" component="p" align="left" style={{ marginBottom: margin, marginTop: margin }}>
            Select Breathe file to upload
          </Typography>
          <FileUploader
            name="breathUrl"
            type="file"
            uploadedFiles={this.state.uploadedFiles[fileType.BREATH]}
            handleFileUpload={this.handleBreathFile}
            setValidationStatus={this.validateFile}
            maxFileNames={maxFilePerUpload}
            fileAccept=".wav"
          />
          <Typography variant="body2" component="p" align="left" style={{ marginBottom: margin, marginTop: margin }}>
            Select Cough file to upload
          </Typography>
          <FileUploader
            name="coughUrl"
            type="file"
            uploadedFiles={this.state.uploadedFiles[fileType.COUGH]}
            handleFileUpload={this.handleCoughFile}
            setValidationStatus={this.validateFile}
            maxFileNames={maxFilePerUpload}
            fileAccept=".wav"
          />

          <Grid item xs={12} container justify="center" style={{ textAlign: "center", marginTop: margin }}>
            <Button variant="contained" color="primary" onClick={this.submitAction} disabled={!this.isEnabled()}>
              Invoke
            </Button>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}
