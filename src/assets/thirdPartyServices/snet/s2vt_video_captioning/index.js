import React from "react";
import { hasOwnDefinedProperty } from "../../../../utility/JSHelper";
import Button from "@material-ui/core/Button";

export default class S2VTVideoCaptioning extends React.Component {
  constructor(props) {
    super(props);
    this.submitAction = this.submitAction.bind(this);
    this.handleServiceName = this.handleServiceName.bind(this);
    this.handleFormUpdate = this.handleFormUpdate.bind(this);
    this.getServiceMethods = this.getServiceMethods.bind(this);

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

  isValidVideoURL(str) {
    return (str.startsWith("http://") || str.startsWith("https://")) && (str.endsWith(".avi") || str.endsWith(".mp4"));
  }

  canBeInvoked() {
    return this.isValidVideoURL(this.state.url) && this.state.start_time_sec <= this.state.stop_time_sec;
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
      url: this.state.url,
      start_time_sec: this.state.start_time_sec.toString(),
      stop_time_sec: this.state.stop_time_sec.toString(),
    });
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
      <div>
        <p style={{ fontSize: "13px" }}>Response from service is: </p>
        <pre>
          Status : {status}
          Caption: {value}
        </pre>
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
