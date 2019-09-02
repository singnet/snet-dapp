import React from "react";
import SNETImageUpload from "../../standardComponents/SNETImageUpload";
import EmotionVisualizer from "./EmotionVisualizer";
import MethodNamesDropDown from "../../common/MethodNamesDropDown";
import {EmotionRecognition} from "./EmotionService_pb_service"

export default class EmotionRecognitionService extends React.Component {
  constructor(props) {
    super(props);
    this.handleImageUpload = this.handleImageUpload.bind(this);
    this.handleFormUpdate = this.handleFormUpdate.bind(this);
    this.submitAction = this.submitAction.bind(this);

    this.state = {
      serviceName: "EmotionRecognition",
      methodName: "classify",
      uploadedImage: null,
    };
  }

  canBeInvoked() {
    // When the image isn't uploaded yet and when function name isn't yet given.
    return this.state.methodName !== "Select a method" && this.state.uploadedImage !== null;
  }

  handleFormUpdate(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleImageUpload(imageData, mimeType) {
    this.setState({
      uploadedImage: imageData,
      uploadedImageType: mimeType,
    });
  }

  submitAction() {
    const { methodName, uploadedImage, uploadedImageType } = this.state;
    const methodDescriptor = EmotionRecognition[methodName];
    const request = new methodDescriptor.requestType();

    request.setImageType(uploadedImageType);
    request.setImage(uploadedImage);

    const props = {
      request,
      onEnd: ({message}) => {
        this.setState({
          response: message.toObject(),
        });
      },
    };

    this.props.serviceClient.unary(methodDescriptor, props);  
  }

  renderForm() {
    const serviceNameOptions = ["Select a method", ...this.props.serviceClient.getMethodNames(EmotionRecognition)];

    return (
      <React.Fragment>
        <div className="row">
          <div className="col-md-3 col-lg-3" style={{ padding: "10px", fontSize: "13px", marginLeft: "10px" }}>
            Method Name:
          </div>
          <div className="col-md-3 col-lg-3">
          <MethodNamesDropDown
              list={serviceNameOptions}
              value={this.state.methodName}
              onChange={this.handleFormUpdate}
            />
          </div>
        </div>
        <div className="row">
          <SNETImageUpload imageName={""} imageDataFunc={this.handleImageUpload} disableUrlTab={true} />
        </div>
        <div className="row" align="center">
          <button type="button" className="btn btn-primary" disabled={!this.canBeInvoked()} onClick={this.submitAction}>
            Call Emotion Recognizer
          </button>
        </div>
      </React.Fragment>
    );
  }

  parseResponse() {
    const { response } = this.state;
    if (typeof response !== "undefined") {
      if (typeof response === "string") {
        return response;
      }
      return response;
    }
  }

  renderComplete() {
    const response = this.parseResponse();
    return (
      <EmotionVisualizer
        jobResult={response}
        inputImage={this.state.uploadedImage}
        inputImageType={this.state.uploadedImageType}
        sliderWidth={this.props.sliderWidth}
      />
    );
  }

  render() {
    if (this.props.isComplete) return <div>{this.renderComplete()}</div>;
    else {
      return <div>{this.renderForm()}</div>;
    }
  }
}
