import React from "react";
import { hasOwnDefinedProperty } from "../../utility/JSHelper";
import Button from "@material-ui/core/Button";
import SNETImageUpload from "./standardComponents/SNETImageUpload";
import {VqaService} from "./vqa_opencog_pb_service"

export default class VisualQAOpencog extends React.Component {
  constructor(props) {
    super(props);
    this.submitAction = this.submitAction.bind(this);
    this.handleServiceName = this.handleServiceName.bind(this);
    this.handleFormUpdate = this.handleFormUpdate.bind(this);
    this.getImageData = this.getImageData.bind(this);

    this.state = {
      users_guide: "https://github.com/singnet/semantic-vision/tree/master/services/vqa-service",
      code_repo: "https://github.com/singnet/semantic-vision/tree/master/services/vqa-service",
      reference: "https://github.com/singnet/semantic-vision",

      serviceName: undefined,
      methodName: undefined,

      imageData: undefined,
      question: "",
      use_pm: false,

      response: undefined,
      isComplete : false
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
      console.log(nextProps.response);
      if (typeof nextProps.response !== "undefined") {
        this.state.response = nextProps.response;
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
    this.setState({ [event.target.name]: event.target.value });
  }

  handleServiceName(event) {
    var strService = event.target.value;
    this.setState({
      serviceName: strService,
    });
    console.log("Selected service is " + strService);
    var data = this.methodsForAllServices[strService];
    if (typeof data === "undefined") {
      data = [];
    }
    this.serviceMethods = data;
  }

  getImageData(imgData) {
    this.state.imageData = imgData;
  }

  submitAction() {
    const { methodName, question,use_pm,imageData } = this.state;
    const methodDescriptor = VisualQAOpencog[methodName];
    const request = new methodDescriptor.requestType();

    request.setQuestion(question)
    request.setUsePm(use_pm)
    request.setImageData(imageData)


    const props = {
        request,
        onEnd: ({ message }) => {
          this.setState({ isComplete: true, response: { answer: message.getAnswer(),ok:message.getOk(),error_message:message.getErrorMessage() } });
        },
      };

    this.props.serviceClient.unary(methodDescriptor, props);
  }

  renderForm() {
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-md-3 col-lg-3" style={{ fontSize: "13px", marginLeft: "10px" }}>
            Service Name
          </div>
          <div className="col-md-3 col-lg-3">
            <select
              style={{ height: "30px", width: "250px", fontSize: "13px", marginBottom: "5px" }}
              onChange={this.handleServiceName}
            >
              {this.allServices.map((row, index) => (
                <option key={index}>{row}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="row">
          <div className="col-md-3 col-lg-3" style={{ fontSize: "13px", marginLeft: "10px" }}>
            Method Name
          </div>
          <div className="col-md-3 col-lg-3">
            <select
              name="methodName"
              style={{ height: "30px", width: "250px", fontSize: "13px", marginBottom: "5px" }}
              onChange={this.handleFormUpdate}
            >
              {this.serviceMethods.map((row, index) => (
                <option key={index}>{row}</option>
              ))}
            </select>
          </div>
        </div>
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
              <option value={true}>pattern matcher</option>
              <option value={false}>URE</option>
            </select>
          </div>
        </div>
        <div className="row">
          <div className="col-md-3 col-lg-3" style={{ fontSize: "13px", marginLeft: "10px" }}>
            Image URL
          </div>
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
      delta_time = this.state.response.deltaTime + "s\n";
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
          Status : {status}
          Time : {delta_time}
          {answer}
        </pre>
      </div>
    );
  }

  render() {
    if (this.state.isComplete) return <div>{this.renderComplete()}</div>;
    else {
      return <div>{this.renderForm()}</div>;
    }
  }
}