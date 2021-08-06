import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import upperFirst from "lodash/upperFirst";

import FileUploader from "../../common/FileUploader";
import OutlinedDropDown from "../../common/OutlinedDropdown";

import { COVID } from "./cough_test_pb_service";

const margin = 20;
const maxFilePerUpload = 1;

const fileType = { COUGH: "COUGH", BREATH: "BREATH", VOWEL: "VOWEL" };

const initialState = {
  sampleIndex: 0,
  samples: [
    {
      label: "From file",
      content: undefined,
      value: 0,
    },
    {
      label: "Sample files",
      content: {
        coughUrl:
          "https://rejuve-user-assets.s3.us-west-2.amazonaws.com/public/COUGH_TEST_84C3FE4B-9859-4E0F-B657-B637802D557C/COUGH_RECORD.wav",
        breathUrl:
          "https://rejuve-user-assets.s3.us-west-2.amazonaws.com/public/COUGH_TEST_84C3FE4B-9859-4E0F-B657-B637802D557C/BREATHE_RECORD.wav",
        vowelUrl:
          "https://rejuve-user-assets.s3.us-west-2.amazonaws.com/public/COUGH_TEST_84C3FE4B-9859-4E0F-B657-B637802D557C/A_RECORD.wav",
      },
      value: 1,
    },
  ],
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
    this.handleFormUpdate = this.handleFormUpdate.bind(this);

    this.state = { ...initialState, response: undefined };
  }

  createTmpPath(file) {
    const blob = new Blob([file], { type: "audio/wav" });
    return window.URL.createObjectURL(blob);
  }

  submitAction() {
    let _coughUrl;
    let _breathUrl;
    let _vowelUrl;

    const { uploadedFiles, sampleIndex } = this.state;

    if (sampleIndex === 1) {
      const { content } = this.state.samples[sampleIndex];
      _coughUrl = content.coughUrl;
      _breathUrl = content.breathUrl;
      _vowelUrl = content.vowelUrl;
    } else {
      _coughUrl = this.createTmpPath(uploadedFiles[fileType.COUGH]);
      _breathUrl = this.createTmpPath(uploadedFiles[fileType.BREATH]);
      _vowelUrl = this.createTmpPath(uploadedFiles[fileType.VOWEL]);
    }

    const methodDescriptor = COVID["s2t"];
    const request = new methodDescriptor.requestType();

    request.setCoughUrl(_coughUrl);
    request.setBreathUrl(_breathUrl);
    request.setVowelSoundUrl(_vowelUrl);

    const props = {
      request,
      onEnd: response => {
        const { message, status, statusMessage } = response;
        if (status !== 0) {
          throw new Error(statusMessage);
        }
        this.setState({
          response: { status: "success", result: message.getText() },
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

  handleFormUpdate(event) {
    const { value } = event.target;
    this.setState({ ...this.state, sampleIndex: value });
  }

  handleFileUpload(files, name) {
    const [file] = files;

    this.setState({ ...this.state, uploadedFiles: { ...this.state.uploadedFiles, [name]: file } });
  }

  isEnabled() {
    const { uploadedFiles, sampleIndex } = this.state;
    if (
      (uploadedFiles[fileType.BREATH] && uploadedFiles[fileType.COUGH] && uploadedFiles[fileType.VOWEL]) ||
      sampleIndex === 1
    ) {
      return true;
    }
    return false;
  }

  response() {
    const { result } = this.state.response;
    return upperFirst(result.replace("_", " "));
  }

  renderComplete() {
    return (
      <Grid item xs={12} container justify="center">
        <p style={{ fontSize: "20px", marginTop: "40px" }}>
          Response from service: <b>{this.response()}</b>
        </p>
      </Grid>
    );
  }

  render() {
    if (this.props.isComplete) return <div>{this.renderComplete()}</div>;
    return (
      <Grid container direction="column" alignItems="center" justify="center">
        <Grid item xs={8} container justify="flex-start" style={{ textAlign: "center", marginTop: margin }}>
          <Grid item xs={12} container justify="center" style={{ textAlign: "center" }}>
            <OutlinedDropDown
              id="sample"
              name="sampleIndex"
              label="Sample"
              fullWidth={true}
              list={this.state.samples}
              value={this.state.sampleIndex}
              onChange={this.handleFormUpdate}
            />
          </Grid>
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
