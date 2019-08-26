import React from "react";
import { hasOwnDefinedProperty } from "../../../../utility/JSHelper";
import Button from "@material-ui/core/Button";
import {VideoCaptioning} from "./video_cap_pb_service"
export default class S2VTVideoCaptioning extends React.Component {
  constructor(props) {
    super(props);
    this.submitAction = this.submitAction.bind(this);
    this.handleFormUpdate = this.handleFormUpdate.bind(this);


    this.state = {
      users_guide:
        "https://github.com/singnet/dnn-model-services/blob/master/docs/users_guide/s2vt-video-captioning.md",
      code_repo: "https://github.com/singnet/dnn-model-services/blob/master/Services/gRPC/s2vt-video-captioning",
      reference: "https://vsubhashini.github.io/s2vt.html",

      serviceName: "VideoCaptioning",
      methodName: "video_cap",

      url: "",
      start_time_sec: 0,
      stop_time_sec: 0,

      response: undefined,
      isComplete : false
    };
    this.isComplete = false;
    this.serviceMethods = [];
    this.allServices = [];
    this.methodsForAllServices = [];
    
  }

 

  isValidVideoURL(str) {
    return (str.startsWith("http://") || str.startsWith("https://")) && (str.endsWith(".avi") || str.endsWith(".mp4"));
  }

  canBeInvoked() {
    return this.isValidVideoURL(this.state.url) && this.state.start_time_sec <= this.state.stop_time_sec;
  }

  handleFormUpdate(event) {
    this.setState({ [event.target.name]: event.target.value });
  }


  submitAction() {
    const { methodName, url,start_time_sec,stop_time_sec } = this.state;
    const methodDescriptor = VideoCaptioning[methodName];
    const request = new methodDescriptor.requestType();

    request.setUrl(url)
    request.setStartTimeSec(start_time_sec)
    request.setStopTimeSec(stop_time_sec)

    const props = {
      request,
      onEnd: response => {
        const { message, status, statusMessage } = response;
        if (status !== 0) {
          throw new Error(statusMessage);
        }
        this.setState({
         
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
            Video (URL):{" "}
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
        <div className="row">
          <div className="col-md-3 col-lg-3" style={{ padding: "10px", fontSize: "13px", marginLeft: "10px" }}>
            StartTime (s):{" "}
          </div>
          <div className="col-md-3 col-lg-3">
            <input
              name="start_time_sec"
              type="number"
              min="0"
              style={{ height: "30px", width: "250px", fontSize: "13px", marginBottom: "5px" }}
              value={this.state.start_time_sec}
              onChange={this.handleFormUpdate}
            ></input>
          </div>
        </div>
        <div className="row">
          <div className="col-md-3 col-lg-3" style={{ padding: "10px", fontSize: "13px", marginLeft: "10px" }}>
            StopTime (s):{" "}
          </div>
          <div className="col-md-3 col-lg-3">
            <input
              name="stop_time_sec"
              type="number"
              min={this.state.start_time_sec}
              style={{ height: "30px", width: "250px", fontSize: "13px", marginBottom: "5px" }}
              value={this.state.stop_time_sec}
              onChange={this.handleFormUpdate}
            ></input>
          </div>
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
        <div style={{ padding: "10px 0" }}>Caption: 
            <div style={{color:"#212121", marginTop:"5px",padding:"10px", background:"#f1f1f1",borderRadius:"4px"}}>
                {value} 
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
