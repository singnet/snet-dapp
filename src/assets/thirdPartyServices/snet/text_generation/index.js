import React from "react";
import { hasOwnDefinedProperty } from "../../../../utility/JSHelper";
import Button from "@material-ui/core/Button";

import {GENGPT2} from "./ntg_pb_service"

const initialUserInput = {
  start_text: "",
  temperature : 1.2,
  top_k: 20
};

export default class ShortQuestionAnswering extends React.Component {
  constructor(props) {
    super(props);
    this.submitAction = this.submitAction.bind(this);
    this.handleFormUpdate = this.handleFormUpdate.bind(this);

    this.users_guide = "https://github.com/iktina/neural-text-generation";

    this.state = {
      ...initialUserInput,
      serviceName: "GENGPT2",
      methodName: "gen_gpt_2",
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

    const { methodName, start_text, temperature, top_k } = this.state;
    const methodDescriptor = GENGPT2[methodName];
    const request = new methodDescriptor.requestType();

    request.setStartText(start_text);    
    request.setTemperature(temperature);
    request.setTopK(top_k);

    const props = {
      request,
      onEnd: response => {
        const { message, status, statusMessage } = response;
        if (status !== 0) {
          throw new Error(statusMessage);
        }
        this.setState({
          ...initialUserInput,
          response: { status: "success", answer: message.getAnswer() },
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
            Start Text <br/>
            Leave this field empty or insert the beginning of the text to generate a continuation.
          </div>
          <div className="col-md-3 col-lg-2">
            <textarea
              name="start_text"
              placeholder="Enter a start text."
              className="w3-input w3-border"
              style={{ resize: "none", width: "250px" }}
              rows="4"
              maxLength="5000"
              value={this.state.start_text}
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
        <p style={{ fontSize: "13px" }}>
          Response from service is: <b>{this.state.response.answer}</b>{" "}
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
