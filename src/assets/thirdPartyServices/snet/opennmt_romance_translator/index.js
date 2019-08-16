import React from "react";
import { hasOwnDefinedProperty } from "../../../../utility/JSHelper";
import Button from "@material-ui/core/Button";

export default class OpenNMTRomanceTranslator extends React.Component {
  constructor(props) {
    super(props);
    this.submitAction = this.submitAction.bind(this);
    this.handleServiceName = this.handleServiceName.bind(this);
    this.handleFormUpdate = this.handleFormUpdate.bind(this);
    this.getServiceMethods = this.getServiceMethods.bind(this);

    this.state = {
      users_guide: "https://github.com/singnet/nlp-services/blob/master/docs/users_guide/opennmt-romance-translator.md",
      code_repo: "https://github.com/singnet/nlp-services/blob/master/opennmt-romance-translator",
      reference: "http://forum.opennmt.net/t/training-romance-multi-way-model/86",

      serviceName: "RomanceTranslator",
      methodName: "translate",

      source_lang: "es",
      target_lang: "it",
      sentences_url: "",

      response: undefined,
    };
    this.langOptions = ["es", "fr", "it", "pt", "ro"];
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

  canBeInvoked() {
    return this.state.source_lang !== this.state.target_lang && this.state.sentences_url !== "";
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
      source_lang: this.state.source_lang,
      target_lang: this.state.target_lang,
      sentences_url: this.state.sentences_url,
    });
  }

  renderForm() {
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-md-4 col-lg-4" style={{ padding: "10px", fontSize: "13px", marginLeft: "10px" }}>
            Source Language:{" "}
          </div>
          <div className="col-md-3 col-lg-3">
            <select
              name="source_lang"
              style={{ height: "30px", width: "250px", fontSize: "13px", marginBottom: "5px" }}
              value={this.state.source_lang}
              onChange={this.handleFormUpdate}
            >
              {this.langOptions.map((row, index) => (
                <option value={row} key={index}>
                  {row}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4 col-lg-4" style={{ padding: "10px", fontSize: "13px", marginLeft: "10px" }}>
            Target Language:{" "}
          </div>
          <div className="col-md-3 col-lg-3">
            <select
              name="target_lang"
              style={{ height: "30px", width: "250px", fontSize: "13px", marginBottom: "5px" }}
              value={this.state.target_lang}
              onChange={this.handleFormUpdate}
            >
              {this.langOptions.map((row, index) => (
                <option value={row} key={index}>
                  {row}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4 col-lg-4" style={{ padding: "10px", fontSize: "13px", marginLeft: "10px" }}>
            Sentences:{" "}
          </div>
          <div className="col-md-3 col-lg-3">
            <input
              name="sentences_url"
              type="text"
              style={{ height: "30px", width: "250px", fontSize: "13px", marginBottom: "5px" }}
              placeholder={"or URL with text file"}
              value={this.state.sentences_url}
              onChange={this.handleFormUpdate}
            ></input>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4 col-lg-4" style={{ padding: "10px", fontSize: "13px", marginLeft: "10px" }}>
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
    let translation = "\n";

    if (typeof this.state.response === "object") {
      translation = "\n" + this.state.response.translation;
    } else {
      status = this.state.response + "\n";
    }
    return (
      <div>
        <p style={{ fontSize: "13px" }}>Response from service is: </p>
        <pre>
          Status : {status}
          Translation:
          {translation}
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
