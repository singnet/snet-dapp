import React from "react";
import { hasOwnDefinedProperty } from "../../utility/JSHelper";
import Button from "@material-ui/core/Button";
import Slider from "@material-ui/lab/Slider";

import SNETImageUpload from "./standardComponents/SNETImageUpload";

export default class YOLOv3ObjectDetection extends React.Component {
  constructor(props) {
    super(props);
    this.submitAction = this.submitAction.bind(this);
    this.handleServiceName = this.handleServiceName.bind(this);
    this.handleFormUpdate = this.handleFormUpdate.bind(this);
    this.getImageURL = this.getImageURL.bind(this);
    this.getServiceMethods = this.getServiceMethods.bind(this);
    this.handleSliderChange = this.handleSliderChange.bind(this);

    this.state = {
      users_guide:
        "https://github.com/singnet/dnn-model-services/blob/master/docs/users_guide/yolov3-object-detection.md",
      code_repo: "https://github.com/singnet/dnn-model-services/blob/master/Services/gRPC/yolov3-object-detection",
      reference: "https://pjreddie.com/darknet/yolo/",

      serviceName: "Detect",
      methodName: "detect",

      model: "yolov3",
      img_path: "",
      confidence: 0.5,

      response: undefined,
    };

    this.isComplete = false;
    this.serviceMethods = [];
    this.allServices = [];
    this.methodsForAllServices = [];
    this.parseProps(props);
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

  componentWillReceiveProps(nextProps) {
    if (this.isComplete !== nextProps.isComplete) {
      this.parseProps(nextProps);
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

    this.methodsForAllServices = [];
    objects.map(rr => {
      if (typeof items[rr] === "object" && items[rr] !== null && items[rr].hasOwnProperty("methods")) {
        this.allServices.push(rr);
        this.methodsForAllServices.push(rr);
        this.methodsForAllServices[rr] = Object.keys(items[rr]["methods"]);
      }
    });
    this.getServiceMethods(this.allServices[0]);
  }

  getServiceMethods(strService) {
    this.setState({
      serviceName: strService,
    });
    var data = this.methodsForAllServices[strService];
    if (typeof data === "undefined") {
      data = [];
    }
    this.serviceMethods = data;
  }

  getImageURL(data) {
    this.setState({ img_path: data });
  }

  canBeInvoked() {
    return this.state.img_path;
  }

  handleSliderChange(event, value) {
    this.setState({ confidence: value });
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

  submitAction() {
    this.props.callApiCallback(this.state.serviceName, this.state.methodName, {
      model: this.state.model,
      img_path: this.state.img_path,
      confidence: this.state.confidence.toFixed(2),
    });
  }

  renderForm() {
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-md-3 col-lg-3" style={{ padding: "10px", fontSize: "13px", marginLeft: "10px" }}>
            Confidence ({this.state.confidence.toFixed(2)}):{" "}
          </div>
          <div className="col-md-3 col-lg-3" style={{ width: "280px" }}>
            <Slider
              style={{ padding: "15px 0px", width: "100%" }}
              value={this.state.confidence}
              min={0.05}
              max={1.0}
              step={0.05}
              onChange={this.handleSliderChange}
            />
          </div>
        </div>
        <div className="row" align="center">
          <SNETImageUpload imageName={""} imageDataFunc={this.getImageURL} instantUrlFetch={true} allowURL={true} />
        </div>
        <div className="row">
          <div className="col-md-3 col-lg-3" style={{ padding: "10px", fontSize: "13px", marginLeft: "10px" }}>
            About:{" "}
          </div>
          <div className="col-xs-3 col-xs-2">
            <Button target="_blank" href={this.state.users_guide} style={{ fontSize: "13px", marginLeft: "10px" }}>
              Guide
            </Button>
          </div>
          <div className="col-xs-3 col-xs-2">
            <Button target="_blank" href={this.state.code_repo} style={{ fontSize: "13px", marginLeft: "10px" }}>
              Code
            </Button>
          </div>
          <div className="col-xs-3 col-xs-2">
            <Button target="_blank" href={this.state.reference} style={{ fontSize: "13px", marginLeft: "10px" }}>
              Reference
            </Button>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 col-lg-6" style={{ textAlign: "right" }}>
            <button
              type="button"
              className="btn btn-primary"
              onClick={this.submitAction}
              disabled={!this.canBeInvoked()}
            >
              Invoke
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  }

  renderComplete() {
    let status = "Ok\n";
    let delta_time = "\n";
    let boxes = "\n";
    let class_ids = "\n";
    let confidences = "\n";
    let img_base64 = "\n";

    if (typeof this.state.response === "object") {
      delta_time = this.state.response.delta_time + "s\n";
      boxes = this.state.response.boxes + "\n";
      class_ids = this.state.response.class_ids + "\n";
      confidences = this.state.response.confidences + "\n";
      img_base64 = "data:image/jpeg;base64," + this.state.response.img_base64;
    } else {
      status = this.state.response + "\n";
    }

    return (
      <div>
        <div>
          <p style={{ fontSize: "13px" }}>Response from service is: </p>
          <pre>
            Status : {status}
            Time : {delta_time}
            Boxes : {boxes}
            Classes : {class_ids}
            Confidences: {confidences}
            Image :
          </pre>
        </div>
        <div style={{ align: "center", maxWidth: "100%" }}>
          <img style={{ maxWidth: "100%" }} src={img_base64} alt={"Response Image"} />
        </div>
      </div>
    );
  }

  render() {
    if (this.isComplete) return <div>{this.renderComplete()}</div>;
    else {
      return <div>{this.renderForm()}</div>;
    }
  }
}
