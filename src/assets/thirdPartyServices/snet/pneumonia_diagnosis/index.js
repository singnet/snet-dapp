import React from "react";
import Button from "@material-ui/core/Button";
import SNETImageUpload from "../../standardComponents/SNETImageUpload";

import { Diagnosis } from "./pneumonia_diagnosis_pb_service";

const initialUserInput = {
  methodName: "check",
  img_path: undefined,
};

export default class PneumoniaDiagnosis extends React.Component {
  constructor(props) {
    super(props);
    this.submitAction = this.submitAction.bind(this);
    this.handleFormUpdate = this.handleFormUpdate.bind(this);
    this.getImageURL = this.getImageURL.bind(this);

    this.state = {
      ...initialUserInput,
      users_guide: "https://singnet.github.io/dnn-model-services/users_guide/pneumonia-diagnosis.html",
      code_repo: "https://github.com/singnet/dnn-model-services/tree/master/services/pneumonia-diagnosis",
      reference: "https://link.medium.com/0sr3inVSWY",
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
    const methodDescriptor = Diagnosis[methodName];
    const request = new methodDescriptor.requestType();

    request.setImgPath(img_path);
    //request.setModel(model);

    const props = {
      request,
      onEnd: ({ message }) => {
        this.setState({
          ...initialUserInput,
          response: { status: "success", output: message.getOutput() },
        });
      },
    };

    this.props.serviceClient.unary(methodDescriptor, props);
  }

  renderForm() {
    return (
      <React.Fragment>
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
      <div style={{ background: "#F8F8F8", padding: "24px" }}>
        <h4> Results</h4>
        <div style={{ padding: "10px 10px 0 10px", fontSize: "14px", color: "#9b9b9b" }}>
          <div style={{ padding: "10px 0", borderBottom: "1px solid #eee" }}>
            Status: <span style={{ color: "#212121" }}>{response.status}</span>
          </div>
          <div style={{ padding: "10px 0" }}>
            Diagnosis:
            <div
              style={{
                color: "#212121",
                marginTop: "5px",
                padding: "10px",
                background: "#f1f1f1",
                borderRadius: "4px",
              }}
            >
              {response.output}
            </div>
          </div>
        </div>
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
