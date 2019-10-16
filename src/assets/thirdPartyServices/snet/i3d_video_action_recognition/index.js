import React from "react";
import { hasOwnDefinedProperty } from "../../../../utility/JSHelper";
import Button from "@material-ui/core/Button";

import { VideoActionRecognition } from './video_action_recon_pb_service'

const initialUserInput = {
  model: "400",
  url: "",
};



export default class I3DActionRecognition extends React.Component {
  constructor(props) {
    super(props);
    this.submitAction = this.submitAction.bind(this);

    this.handleFormUpdate = this.handleFormUpdate.bind(this);

    this.state = {
      ...initialUserInput,
      users_guide:
        "https://github.com/singnet/dnn-model-services/blob/master/docs/users_guide/i3d-video-action-recognition.md",
      code_repo: "https://github.com/singnet/dnn-model-services/blob/master/Services/gRPC/i3d-video-action-recognition",
      reference: "https://github.com/deepmind/kinetics-i3d",

      serviceName: "VideoActionRecognition",
      methodName: "video_action_recon",
      response: undefined,
    };

    this.modelOptions = ["400", "600"];
    this.isComplete = false;
    this.serviceMethods = [];
    this.allServices = [];
    this.methodsForAllServices = [];
  }

  isValidVideoURL(str) {
    return (str.startsWith("http://") || str.startsWith("https://")) && (str.endsWith(".avi") || str.endsWith(".mp4"));
  }

  canBeInvoked() {
    return this.isValidVideoURL(this.state.url);
  }

  handleFormUpdate(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  submitAction() {
    const { methodName, model, url } = this.state;
    const methodDescriptor = VideoActionRecognition[methodName];
    const request = new methodDescriptor.requestType();

    request.setModel(model);
    request.setUrl(url);

    const props = {
      request,
      onEnd: ({message}) => {
        this.setState({
          ...initialUserInput,
          response: { status: "success", value: message.getValue() },
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
            I3D Model:{" "}
          </div>
          <div className="col-md-3 col-lg-3">
            <select
              name="model"
              style={{ height: "30px", width: "250px", fontSize: "13px", marginBottom: "5px" }}
              onChange={this.handleFormUpdate}
            >
              {this.modelOptions.map((row, index) => (
                <option value={row} key={index}>
                  {row}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="row">
          <div className="col-md-3 col-lg-3" style={{ padding: "10px", fontSize: "13px", marginLeft: "10px" }}>
            Video URL:{" "}
          </div>
          <div className="col-md-3 col-lg-3">
            <input
              name="url"
              type="text"
              style={{ height: "30px", width: "250px", fontSize: "13px", marginBottom: "5px" }}
              value={this.state.url}
              onChange={this.handleFormUpdate}
            ></input>
          </div>
        </div>
        <div className="col-md-3 col-lg-3" style={{ textAlign: "center", height: "20px", fontSize: "13px"}}>
              {!this.canBeInvoked() ? "The URL must be of a .avi or .mp4 video only." : " "}
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
    let value = "\n";

    if (typeof this.state.response === "object") {
      value = "\n" + this.state.response.value;
    } else {
      status = this.state.response + "\n";
    }
    return (
        
<div style={{background:"#F8F8F8", padding: "24px"}}>
    <h4> Results</h4>
    <div style={{ padding: "10px 10px 0 10px", fontSize: "14px", color:"#9b9b9b" }}>
        <div style={{ padding: "10px 0",borderBottom: "1px solid #eee" }}>Status: <span style={{color:"#212121"}}>{status}</span></div>
        <div style={{ padding: "10px 0" }}>Top Predicted Actions: 
            <div style={{color:"#212121", marginTop:"5px",padding:"10px", background:"#f1f1f1",borderRadius:"4px"}}><pre>{value}</pre></div>
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
