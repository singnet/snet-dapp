import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import SvgIcon from "@material-ui/core/SvgIcon";
import InfoIcon from "@material-ui/icons/Info";

import HoverIcon from "../../standardComponents/HoverIcon";
import OutlinedDropDown from "../../common/OutlinedDropdown";
import FileUploader from "../../common/FileUploader";

import { SoundSpleeter } from "./sound_spleeter_pb_service";

const initialUserInput = {
  sampleIndex: "0",
  samples: [
    {
      label: "From file",
      content: undefined,
      value: "0",
    },
    {
      label: "Slow Motion Dream by Steven M Bryant",
      content: "http://54.203.198.53:7000/Resources/audio_example.mp3",
      value: "1",
    },
  ],
  audio: undefined,
  audio_url: undefined,
  isValid: {
    uploadedFile: false,
    validWAV: false,
  },
};

export default class SoundSpleeterService extends React.Component {
  constructor(props) {
    super(props);
    this.submitAction = this.submitAction.bind(this);
    this.handleFileUpload = this.handleFileUpload.bind(this);
    this.handleFormUpdate = this.handleFormUpdate.bind(this);

    this.state = {
      ...initialUserInput,
      users_guide: "https://singnet.github.io/dnn-model-services/users_guide/sound-spleeter.html",
      code_repo: "https://github.com/singnet/dnn-model-services/tree/master/services/sound-spleeter",
      reference: "https://github.com/deezer/spleeter",
      response: undefined,
    };
  }

  handleFileUpload(files) {
    this.setState({ audio: undefined, audio_url: undefined });
    if (files.length) {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(files[0]);
      fileReader.onload = () => {
        var data = new Uint8Array(fileReader.result);

        var blob = new Blob([data], { type: "audio/wav" });
        var ac = document.getElementById("audio-container");
        ac.innerHTML = "";
        var audio_elem = document.createElement("audio");
        audio_elem.setAttribute("controls", "");

        var audioURL = window.URL.createObjectURL(blob);
        audio_elem.src = audioURL;
        audio_elem.style.height = "50px";
        audio_elem.style.width = "100%";
        audio_elem.style.marginLeft = "5px";
        ac.appendChild(audio_elem);

        this.setState({ audio: data, audio_url: undefined });
      };
    }
  }

  canBeInvoked() {
    if (this.state.audio || this.state.audio_url) return true;
    return false;
  }

  handleFormUpdate(event) {
    this.setState({ [event.target.name]: event.target.value });
    if (event.target.name === "sampleIndex") {
      let sample_url = this.state.samples[event.target.value].content;
      var ac = document.getElementById("audio-container");
      ac.innerHTML = "";
      var audio_elem = document.createElement("audio");
      audio_elem.setAttribute("controls", "");
      audio_elem.src = sample_url;
      audio_elem.style.height = "50px";
      audio_elem.style.width = "100%";
      audio_elem.style.marginLeft = "5px";
      ac.appendChild(audio_elem);
      this.setState({ audio: undefined, audio_url: sample_url });
    }
  }

  submitAction() {
    const { audio, audio_url } = this.state;
    const methodDescriptor = SoundSpleeter["spleeter"];
    const request = new methodDescriptor.requestType();

    request.setAudio(audio);
    if (audio_url) request.setAudioUrl(audio_url);

    const props = {
      request,
      onEnd: response => {
        const { message, status, statusMessage } = response;
        if (status !== 0) {
          throw new Error(statusMessage);
        }
        var blob_vocals = new Blob([message.getVocals()], { type: "audio/wav" });
        var blob_accomp = new Blob([message.getAccomp()], { type: "audio/wav" });
        this.setState({
          ...initialUserInput,
          response: {
            status: "success",
            vocals: window.URL.createObjectURL(blob_vocals),
            accomp: window.URL.createObjectURL(blob_accomp),
          },
        });
      },
    };

    this.props.serviceClient.unary(methodDescriptor, props);
  }

  setValidationStatus(key, valid) {
    this.state.isValid[key] = valid;
  }

  render() {
    return (
      <React.Fragment>
        <Grid container direction="column" justify="center" spacing={2}>
          {!this.props.isComplete && (
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
          )}
          {!this.props.isComplete && (
            <Grid item xs={12} container justify="center" style={{ textAlign: "center" }}>
              <FileUploader
                name="audio"
                type="file"
                uploadedFiles={this.state.uploadedFiles}
                handleFileUpload={this.handleFileUpload}
                setValidationStatus={valid => this.setValidationStatus("uploadedFile", valid)}
                fileAccept=".wav, .mp3"
              />
            </Grid>
          )}
          {!this.props.isComplete && (
            <Grid item xs={12} style={{ textAlign: "center" }}>
              <div id="audio-container" className="col-md-3 col-lg-2">
                <audio controls style={{ height: "50px", width: "100%", fontSize: "13px", marginBottom: "5px" }}>
                  <source id="ssAudio" src="" type="audio/wav" />
                </audio>
              </div>
            </Grid>
          )}

          {this.props.isComplete && (
            <Grid item xs={12} style={{ textAlign: "center" }}>
              Vocals:
              <div id="vocals-container" className="col-md-3 col-lg-2">
                <audio controls style={{ height: "50px", width: "100%", fontSize: "13px", marginBottom: "5px" }}>
                  <source id="ssvAudio" src={this.state.response.vocals} type="audio/wav" />
                </audio>
              </div>
            </Grid>
          )}
          {this.props.isComplete && (
            <Grid item xs={12} style={{ textAlign: "center" }}>
              Accompaniment:
              <div id="accomp-container" className="col-md-3 col-lg-2">
                <audio controls style={{ height: "50px", width: "100%", fontSize: "13px", marginBottom: "5px" }}>
                  <source id="ssaAudio" src={this.state.response.accomp} type="audio/wav" />
                </audio>
              </div>
            </Grid>
          )}

          <Grid item xs container justify="flex-end">
            <Grid item>
              <HoverIcon text="View code on Github" href={this.state.code_repo}>
                <SvgIcon>
                  <path // Github Icon
                    d="M12.007 0C6.12 0 1.1 4.27.157 10.08c-.944 5.813 2.468 11.45 8.054 13.312.19.064.397.033.555-.084.16-.117.25-.304.244-.5v-2.042c-3.33.735-4.037-1.56-4.037-1.56-.22-.726-.694-1.35-1.334-1.756-1.096-.75.074-.735.074-.735.773.103 1.454.557 1.846 1.23.694 1.21 2.23 1.638 3.45.96.056-.61.327-1.178.766-1.605-2.67-.3-5.462-1.335-5.462-6.002-.02-1.193.42-2.35 1.23-3.226-.327-1.015-.27-2.116.166-3.09 0 0 1.006-.33 3.3 1.23 1.966-.538 4.04-.538 6.003 0 2.295-1.5 3.3-1.23 3.3-1.23.445 1.006.49 2.144.12 3.18.81.877 1.25 2.033 1.23 3.226 0 4.607-2.805 5.627-5.476 5.927.578.583.88 1.386.825 2.206v3.29c-.005.2.092.393.26.507.164.115.377.14.565.063 5.568-1.88 8.956-7.514 8.007-13.313C22.892 4.267 17.884.007 12.008 0z"
                  />
                </SvgIcon>
              </HoverIcon>
            </Grid>
            <Grid item>
              <HoverIcon text="User's guide" href={this.state.users_guide}>
                <InfoIcon />
              </HoverIcon>
            </Grid>
            <Grid item>
              <HoverIcon text="View original project" href={this.state.reference}>
                <SvgIcon>
                  <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 11.701c0 2.857-1.869 4.779-4.5 5.299l-.498-1.063c1.219-.459 2.001-1.822 2.001-2.929h-2.003v-5.008h5v3.701zm6 0c0 2.857-1.869 4.779-4.5 5.299l-.498-1.063c1.219-.459 2.001-1.822 2.001-2.929h-2.003v-5.008h5v3.701z" />
                </SvgIcon>
              </HoverIcon>
            </Grid>
          </Grid>

          {!this.props.isComplete && (
            <Grid item xs={12} style={{ textAlign: "center" }}>
              <Button variant="contained" color="primary" onClick={this.submitAction} disabled={!this.canBeInvoked()}>
                Invoke
              </Button>
            </Grid>
          )}
        </Grid>
      </React.Fragment>
    );
  }
}
