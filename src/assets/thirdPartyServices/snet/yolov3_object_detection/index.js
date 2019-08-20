import React from "react";
import { hasOwnDefinedProperty } from "../../../../utility/JSHelper";
import Button from "@material-ui/core/Button";
import Slider from "@material-ui/lab/Slider";

import SNETImageUpload from "../../standardComponents/SNETImageUpload";
import { Detect } from "./object_detection_pb_service";


const initialUserInput = {
  img_path: undefined,
  confidence: 0.5,
};

export default class YOLOv3ObjectDetection extends React.Component {
  constructor(props) {
    super(props);
    this.submitAction = this.submitAction.bind(this);

    this.handleFormUpdate = this.handleFormUpdate.bind(this);
    this.getImageURL = this.getImageURL.bind(this);
    this.handleSliderChange = this.handleSliderChange.bind(this);

    this.state = {
      ...initialUserInput,
      users_guide: "https://github.com/singnet/dnn-model-services/blob/master/docs/users_guide/yolov3-object-detection.md",
      code_repo: "https://github.com/singnet/dnn-model-services/blob/master/Services/gRPC/yolov3-object-detection",
      reference: "https://pjreddie.com/darknet/yolo/",
      serviceName: "Detect",
      methodName: "detect",
      model: "yolov3",
      response: undefined,
    };


    this.isComplete = false;
    this.serviceMethods = [];
    this.allServices = [];
    this.methodsForAllServices = [];
    
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

  submitAction() {
    const { methodName, img_path, model, confidence } = this.state;
    const methodDescriptor = Detect[methodName];
    const request = new methodDescriptor.requestType();

    request.setImgPath(img_path);
    request.setModel(model);
    request.setConfidence(confidence)

    const props = {
      request,
      onEnd: response => {
        const { message, status, statusMessage } = response;
        if (status !== 0) {
          throw new Error(statusMessage);
        }
        this.setState({
          ...initialUserInput,
          response: { status: "success", delta_time: message.getDeltaTime(), boxes: message.getBoxes(), class_ids: message.getClassIds(), confidences: message.getConfidences(), img_base64: message.getImgBase64() },
        });
      },
    };

    this.props.serviceClient.unary(methodDescriptor, props);
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
