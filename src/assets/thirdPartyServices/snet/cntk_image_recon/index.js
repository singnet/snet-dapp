import React from "react";
import Button from "@material-ui/core/Button";

import { Recognizer } from "./image_recon_pb_service";
import MethodNamesDropDown from "../../common/MethodNamesDropDown";
import SNETImageUpload from "../../standardComponents/SNETImageUpload";

const initialUserInput = {
  methodName: "Select a method",
  img_path: undefined,
};

export default class CNTKImageRecognition extends React.Component {
  constructor(props) {
    super(props);
    this.submitAction = this.submitAction.bind(this);
    this.handleFormUpdate = this.handleFormUpdate.bind(this);
    this.getImageURL = this.getImageURL.bind(this);

    this.state = {
      ...initialUserInput,
      users_guide: "https://github.com/singnet/dnn-model-services/blob/master/docs/users_guide/cntk-image-recon.md",
      code_repo: "https://github.com/singnet/dnn-model-services/blob/master/Services/gRPC/cntk-image-recon",
      reference: "https://cntk.ai/pythondocs/CNTK_301_Image_Recognition_with_Deep_Transfer_Learning.html",
      model: "ResNet152",
      response: undefined,
    };
  }

  canBeInvoked() {
    return this.state.img_path && this.state.methodName !== "Select a method";
  }

  getImageURL(data) {
    this.setState({ img_path: data });
  }

  handleFormUpdate(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  submitAction() {
    const { methodName, img_path, model } = this.state;
    const methodDescriptor = Recognizer[methodName];
    const request = new methodDescriptor.requestType();

    request.setImgPath(img_path);
    request.setModel(model);

    const props = {
      request,
      onEnd: response => {
        const { message, status, statusMessage } = response;
        if (status !== 0) {
          throw new Error(statusMessage);
        }
        this.setState({
          ...initialUserInput,
          response: { status: "success", top_5: message.getTop5(), delta_time: message.getDeltaTime() },
        });
      },
    };

    this.props.serviceClient.unary(methodDescriptor, props);
  }

  renderForm() {
    const serviceNameOptions = ["Select a method", ...this.props.serviceClient.getMethodNames(Recognizer)];

    return (
      <React.Fragment>
        <div className="row">
          <div className="col-md-3 col-lg-3" style={{ padding: "10px", fontSize: "13px", marginLeft: "10px" }}>
            Method Name:{" "}
          </div>
          <div className="col-md-3 col-lg-3">
            <MethodNamesDropDown
              list={serviceNameOptions}
              value={this.state.methodName}
              onChange={this.handleFormUpdate}
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
    const { response } = this.state;

    return (
      <div>
        <p style={{ fontSize: "13px" }}>Response from service is: </p>
        <pre>
          Status: {response.status}
          Time : {response.delta_time}
          Output: {response.top_5}
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
