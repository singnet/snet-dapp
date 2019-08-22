import React from "react";
import { hasOwnDefinedProperty } from "../../../../utility/JSHelper";
import Button from "@material-ui/core/Button";

import SNETImageUpload from "../../standardComponents/SNETImageUpload";

export default class SiggraphColorization extends React.Component {
  constructor(props) {
    super(props);
    this.submitAction = this.submitAction.bind(this);
    this.handleServiceName = this.handleServiceName.bind(this);
    this.handleFormUpdate = this.handleFormUpdate.bind(this);
    this.getImageURL = this.getImageURL.bind(this);
    this.getServiceMethods = this.getServiceMethods.bind(this);

    this.state = {
      users_guide: "https://singnet.github.io/dnn-model-services/users_guide/siggraph-colorization.html",
      code_repo: "https://github.com/singnet/dnn-model-services/tree/master/services/siggraph-colorization",
      reference: "http://iizuka.cs.tsukuba.ac.jp/projects/colorization/en/",

      serviceName: "Colorization",
      methodName: "colorize",

      img_input: "",

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
        this.setState({ response: nextProps.response });
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
    this.setState({ img_input: data });
  }

  canBeInvoked() {
    return this.state.img_input;
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
      img_input: this.state.img_input,
    });
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
    let img_base64 = "";
    let status;

    if (typeof this.state.response === "object") {
      img_base64 = "data:image/jpeg;base64," + this.state.response.img_colorized;
    } else {
      status = this.state.response + "\n";
    }

    return (
      <div>
        <div className="row" align="center">
          <div style={{ align: "center", maxWidth: "100%" }}>
            <img style={{ maxWidth: "100%" }} src={img_base64} alt={"Response Image"} />
          </div>
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
