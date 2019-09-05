import React from "react";
import { hasOwnDefinedProperty } from "../../../../utility/JSHelper";
import Button from "@material-ui/core/Button";

import {TTS} from "./tts_pb_service"

const initialUserInput = {
  text: "",
};

export default class NeuralSpeechSynthesis extends React.Component {
  constructor(props) {
    super(props);
    this.submitAction = this.submitAction.bind(this);
    this.handleFormUpdate = this.handleFormUpdate.bind(this);

    this.users_guide = "https://github.com/iktina/speech-synthesis-service";

    this.state = {
      ...initialUserInput,
      serviceName: "TTS",
      methodName: "t2s",
      response: undefined,
    };

    this.isComplete = false;
    this.serviceMethods = [];
    this.allServices = [];
    this.methodsForAllServices = [];
  }

  handleFormUpdate(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  onKeyPressvalidator(event) {
    // console.log(event.target.value);
  }

  submitAction() {

    var btn = document.getElementById("invoke-button");
    btn.disabled = true;
    btn.innerHTML = "Wait...";

    const { methodName, text } = this.state;
    const methodDescriptor = TTS[methodName];
    const request = new methodDescriptor.requestType();

    request.setText(text);

    const props = {
      request,
      onEnd: response => {
        const { message, status, statusMessage } = response;
        if (status !== 0) {
          throw new Error(statusMessage);
        }
        this.setState({
          ...initialUserInput,
          response: { status: "success", data: message.getData_asU8() },
        });
      },
    };

    this.props.serviceClient.unary(methodDescriptor, props);
  }


  renderForm() {
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-md-3 col-lg-3" style={{ fontSize: "13px", marginLeft: "10px" }}>
            Sentence
          </div>
          <div className="col-md-3 col-lg-2">
            <textarea
              name="text"
              placeholder="Enter a sentence."
              className="w3-input w3-border"
              style={{ resize: "none", width: "250px" }}
              rows="3"
              maxLength="140"
              value={this.state.text}
              onChange={this.handleFormUpdate}
              onKeyPress={e => this.onKeyPressvalidator(e)}
            ></textarea>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 col-lg-6" style={{ textAlign: "right", marginTop: "5px", width: "245px" }}>
            <button id="invoke-button" type="button" className="btn btn-primary" onClick={this.submitAction}>
              Invoke
            </button>
          </div>
        </div>

        <div className="row">
          <div className="col-md-3 col-lg-3" style={{ fontSize: "13px", marginLeft: "10px", marginTop: "10px" }}>
            About
          </div>
          <div className="col-md-3 col-lg-2">
            <Button target="_blank" href={this.users_guide} style={{ fontSize: "13px", marginTop: "5px" }}>
              Guide
            </Button>
          </div>
        </div>
      </React.Fragment>
    );
  }

  renderComplete() {
    return (
      <div>
        <div id="audio-container"> </div>
      </div>
    );
  }

  componentDidUpdate() {
    if (this.props.isComplete) {
      var data = new Uint8Array(this.state.response.data);
      var blob = new Blob([data], { type: "audio/wav" });
      var ac = document.getElementById("audio-container");
      ac.innerHTML = "";
      var audio = document.createElement("audio");
      audio.setAttribute("controls", "");

      var audioURL = window.URL.createObjectURL(blob);
      audio.src = audioURL;
      audio.style.width = "100%";
      ac.appendChild(audio);
    }
  }

  render() {
    if (this.props.isComplete) return <div>{this.renderComplete()}</div>;
    else {
      return <div>{this.renderForm()}</div>;
    }
  }
}
