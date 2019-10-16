import React from "react";
import { hasOwnDefinedProperty } from "../../../../utility/JSHelper";
import Button from "@material-ui/core/Button";

import {ASR} from "./asr_pb_service"

const initialUserInput = {
  data: new ArrayBuffer(),
};

export default class AutomaticSpeechRecognition extends React.Component {
  constructor(props) {
    super(props);
    this.submitAction = this.submitAction.bind(this);
    this.handleFormUpdate = this.handleFormUpdate.bind(this);
    this.users_guide = "https://github.com/iktina/speech-recognition-service";

    this.state = {
      ...initialUserInput,
      serviceName: "ASR",
      methodName: "s2t",
      response: undefined,
      
    };

    this.isComplete = false;
    this.serviceMethods = [];
    this.allServices = [];
    this.methodsForAllServices = [];
  }

  handleFormUpdate(event) {
    if (event.target.name === "data" && event.target.type === "file") {
      var file = event.target.files[0];
      var self = this;
      if (file) {
        var reader = new FileReader();

        reader.loadend = function() {};

        reader.onload = function(e) {
          var data = new Uint8Array(e.target.result);

          var blob = new Blob([data], { type: "audio/wav" });
          var ac = document.getElementById("audio-container");
          ac.innerHTML = "";
          var audio = document.createElement("audio");
          audio.setAttribute("controls", "");

          var audioURL = window.URL.createObjectURL(blob);
          audio.src = audioURL;
          audio.style.height = "30px";
          audio.style.width = "250px";
          audio.style.marginLeft = "5px";
          ac.appendChild(audio);

          self.setState({
            ["data"]: data,
          });
        };

        reader.readAsArrayBuffer(file);
      } else {
        console.log("ASR Service say: Bad file!");
      }
    } else {
      this.setState({
        [event.target.name]: event.target.value,
      });
    }
  }

  onKeyPressvalidator(event) {
    // TODO validation
  }

  submitAction() {
    const { methodName, data } = this.state;
    const methodDescriptor = ASR[methodName];
    const request = new methodDescriptor.requestType();

    request.setData(data);

    const props = {
      request,
      onEnd: response => {
        const { message, status, statusMessage } = response;
        if (status !== 0) {
          throw new Error(statusMessage);
        }
        this.setState({
          ...initialUserInput,
          response: { status: "success", text: message.getText() },
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
            Choose wav
          </div>
          <div className="col-md-3 col-lg-2">
            <input
              name="data"
              type="file"
              style={{ height: "30px", width: "250px", fontSize: "13px", marginBottom: "5px" }}
              value={this.state.a}
              onChange={this.handleFormUpdate}
            ></input>
          </div>
        </div>
        <div className="row">
          <div className="col-md-3 col-lg-3" style={{ fontSize: "13px", marginLeft: "10px" }}>
            Audio
          </div>
          <div id="audio-container" className="col-md-3 col-lg-2">
            <audio controls style={{ height: "30px", width: "250px", fontSize: "13px", marginBottom: "5px" }}>
              <source id="asrAudio" src="http://bonch-ikt.ru:8209/tacotron1/audio/hoho.wav" type="audio/wav"></source>
            </audio>
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
        <p style={{ fontSize: "13px" }}>
          Response from service is <b>{this.state.response.text}</b>{" "}
        </p>
      </div>
    );
  }

  render() {
    if (this.props.isComplete) return <div>{this.renderComplete()}</div>;
    else {
      return <div>{this.renderForm()}</div>;
    }
  }
}
