import React from "react";
import { hasOwnDefinedProperty } from "../../../../utility/JSHelper";
import Button from "@material-ui/core/Button";

export default class NeuralSpeechSynthesis extends React.Component {
  constructor(props) {
    super(props);
    this.submitAction = this.submitAction.bind(this);
    this.handleFormUpdate = this.handleFormUpdate.bind(this);

    this.users_guide = "https://github.com/iktina/speech-synthesis-service";
    this.serviceName = "TTS";
    this.methodName = "t2s";

    this.state = {
      response: undefined,
      text: "",
    };

    this.isComplete = false;
    this.serviceMethods = [];
    this.allServices = [];
    this.methodsForAllServices = [];
    this.parseProps(props);
  }

  componentWillReceiveProps(nextProps) {
    if (this.isComplete !== nextProps.isComplete) {
      this.parseProps(nextProps);
    }
  }

  parseProps(nextProps) {
    this.isComplete = nextProps.isComplete;
    if (!this.isComplete) {
      this.parseServiceSpec(nextProps.serviceSpec);
    } else {
      if (typeof nextProps.response !== "undefined") {
        if (typeof nextProps.response === "string") {
          this.state.response = nextProps.response;
        } else {
          this.state.response = nextProps.response.data;
        }
      }
    }
  }

  parseServiceSpec(serviceSpec) {
    const packageName = Object.keys(serviceSpec.nested).find(
      key => typeof serviceSpec.nested[key] === "object" && hasOwnDefinedProperty(serviceSpec.nested[key], "nested")
    );

    var objects = undefined;
    var items = undefined;
    if (typeof packageName !== "undefined") {
      items = serviceSpec.lookup(packageName);
      objects = Object.keys(items);
    } else {
      items = serviceSpec.nested;
      objects = Object.keys(serviceSpec.nested);
    }

    this.allServices.push("Select a service");
    this.methodsForAllServices = [];
    objects.map(rr => {
      if (typeof items[rr] === "object" && items[rr] !== null && items[rr].hasOwnProperty("methods")) {
        this.allServices.push(rr);
        this.methodsForAllServices.push(rr);

        var methods = Object.keys(items[rr]["methods"]);
        methods.unshift("Select a method");
        this.methodsForAllServices[rr] = methods;
      }
    });
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

    this.props.callApiCallback(this.serviceName, this.methodName, {
      text: this.state.text,
    });
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
              maxLength="5000"
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
    if (this.isComplete) {
      var data = new Uint8Array(this.state.response);
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
    if (this.isComplete) return <div>{this.renderComplete()}</div>;
    else {
      return <div>{this.renderForm()}</div>;
    }
  }
}
