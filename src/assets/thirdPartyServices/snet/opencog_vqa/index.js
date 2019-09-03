import React from "react";

import { hasOwnDefinedProperty } from  "../../../../utility/JSHelper";
import Button from "@material-ui/core/Button";
import SNETImageUpload from "../../standardComponents/SNETImageUpload";
import {VqaService} from "./vqa_opencog_pb_service"

export default class VisualQAOpencog extends React.Component {
  constructor(props) {
    super(props);
    this.submitAction = this.submitAction.bind(this);
    this.handleFormUpdate = this.handleFormUpdate.bind(this);
    this.getImageData = this.getImageData.bind(this);

    this.state = {
      users_guide: "https://github.com/singnet/semantic-vision/tree/master/services/vqa-service",
      code_repo: "https://github.com/singnet/semantic-vision/tree/master/services/vqa-service",
      reference: "https://github.com/singnet/semantic-vision",

      serviceName: "VqaService",
      methodName: "answer",

      imageData: undefined,
      question: "",
      use_pm: true,

      response: undefined,
      isComplete : false
    };
    this.isComplete = false;
    this.serviceMethods = [];
    this.allServices = [];
    this.methodsForAllServices = [];
  }

  handleFormUpdate(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  getImageData(imgData) {
    this.state.imageData = imgData;
  }

  submitAction() {
    const { methodName, question,use_pm,imageData } = this.state;
    const methodDescriptor = VqaService[methodName];
    const request = new methodDescriptor.requestType();

    request.setQuestion(question)
    request.setUsePm(use_pm==="true")
    request.setImageData(imageData)

    const props = {
      request,
      onEnd: ({ message }) => {
        this.setState({
          response: { answer: message.getAnswer(),ok:message.getOk(),error_message:message.getErrorMessage() },
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
            Use pattern matcher or URE
          </div>
          <div className="col-md-3 col-lg-3">
            <select
              name="use_pm"
              style={{ height: "30px", width: "250px", fontSize: "13px", marginBottom: "5px" }}
              onChange={this.handleFormUpdate}
            >
              <option value={true}>Pattern Matcher</option>
              <option value={false}>URE</option>
            </select>
          </div>
        </div>
        <div className="row">
          {/* <div className="col-md-3 col-lg-3" style={{ fontSize: "13px", marginLeft: "10px" }}>
            Image URL
          </div> */}
          <div className="col-md-3 col-lg-2">
            <div>
              <SNETImageUpload imageDataFunc={this.getImageData} disableUrlTab={true} returnByteArray={true} />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-3 col-lg-3" style={{ fontSize: "13px", marginLeft: "10px" }}>
            Question
          </div>
          <div className="col-md-3 col-lg-2">
            <input
              name="question"
              type="text"
              style={{ height: "30px", width: "250px", fontSize: "13px", marginBottom: "5px" }}
              onChange={this.handleFormUpdate}
            ></input>
          </div>
        </div>
        <div className="row">
          <div className="col-md-3 col-lg-3" style={{ fontSize: "13px", marginLeft: "10px" }}>
            About
          </div>
          <div className="col-xs-3 col-xs-2">
            <Button href={this.state.users_guide} style={{ fontSize: "13px", marginLeft: "10px" }}>
              Guide
            </Button>
          </div>
          <div className="col-xs-3 col-xs-2">
            <Button href={this.state.code_repo} style={{ fontSize: "13px", marginLeft: "10px" }}>
              Code
            </Button>
          </div>
          <div className="col-xs-3 col-xs-2">
            <Button href={this.state.reference} style={{ fontSize: "13px", marginLeft: "10px" }}>
              Reference
            </Button>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 col-lg-6" style={{ textAlign: "right" }}>
            <button type="button" className="btn btn-primary" onClick={this.submitAction}>
              Invoke
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  }

  renderComplete() {
    let status = "Ok\n";
    let top_5 = "\n";
    let delta_time = "\n";
    let answer = "\n";
    if (typeof this.state.response === "object") {
      // There is no response from the service for deltaTime
      // delta_time = this.state.response.deltaTime + "s\n";
      if (this.state.response.ok) {
        answer = "answer " + this.state.response.answer;
      } else {
        answer = "Request failed with " + this.state.response.error_message;
      }
    } else {
      status = this.state.response + "\n";
    }
    return (
      <div>
        <p style={{ fontSize: "13px" }}>Response from service is: </p>
        <pre>
          Question : {this.state.question}<br />
          Status : {status}
          {/* Time : {delta_time} */}
          {answer}
        </pre>
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