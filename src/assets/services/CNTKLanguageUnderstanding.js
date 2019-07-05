import React from "react";
import { hasOwnDefinedProperty } from "../../util";
import Button from "@material-ui/core/Button";

export default class CNTKLanguageUnderstanding extends React.Component {
  constructor(props) {
    super(props);
    this.submitAction = this.submitAction.bind(this);
    this.handleServiceName = this.handleServiceName.bind(this);
    this.handleFormUpdate = this.handleFormUpdate.bind(this);
    this.getServiceMethods = this.getServiceMethods.bind(this);

    this.state = {
      users_guide:
        "https://github.com/singnet/nlp-services/blob/master/docs/users_guide/cntk-language-understanding.md",
      code_repo: "https://github.com/singnet/nlp-services/blob/master/cntk-language-understanding",
      reference: "https://cntk.ai/pythondocs/CNTK_202_Language_Understanding.html",

      serviceName: "LanguageUnderstanding",
      methodName: "Select a method",

      train_ctf_url: "",
      test_ctf_url: "",
      query_wl_url: "",
      slots_wl_url: "",
      intent_wl_url: "",
      vocab_size: 943,
      num_labels: 129,
      num_intents: 26,
      sentences_url: "",

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

        var methods = Object.keys(items[rr]["methods"]);
        methods.unshift("Select a method");
        this.methodsForAllServices[rr] = methods;
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

  isValidURL(str, file_ext) {
    return (str.startsWith("http://") || str.startsWith("https://")) && str.includes(file_ext);
  }

  canBeInvoked() {
    return (
      this.isValidURL(this.state.train_ctf_url, ".ctf") &&
      this.isValidURL(this.state.test_ctf_url, ".ctf") &&
      this.isValidURL(this.state.query_wl_url, ".wl") &&
      this.isValidURL(this.state.sentences_url, ".txt") &&
      this.state.methodName !== "Select a method"
    );
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
      train_ctf_url: this.state.train_ctf_url,
      test_ctf_url: this.state.test_ctf_url,
      query_wl_url: this.state.query_wl_url,
      slots_wl_url: this.state.slots_wl_url,
      intent_wl_url: this.state.intent_wl_url,
      vocab_size: this.state.vocab_size,
      num_labels: this.state.num_labels,
      num_intents: this.state.num_intents,
      sentences_url: this.state.sentences_url,
    });
  }

  renderForm() {
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-md-3 col-lg-3" style={{ padding: "10px", fontSize: "13px", marginLeft: "10px" }}>
            Method Name:{" "}
          </div>
          <div className="col-md-3 col-lg-3">
            <select
              name="methodName"
              style={{ height: "30px", width: "250px", fontSize: "13px", marginBottom: "5px" }}
              onChange={this.handleFormUpdate}
            >
              {this.serviceMethods.map((row, index) => (
                <option key={index}>{row}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="row">
          <div className="col-md-3 col-lg-3" style={{ padding: "10px", fontSize: "13px", marginLeft: "10px" }}>
            Train CTF (URL):{" "}
          </div>
          <div className="col-md-3 col-lg-3">
            <input
              name="train_ctf_url"
              type="text"
              style={{ height: "30px", width: "250px", fontSize: "13px", marginBottom: "5px" }}
              value={this.state.train_ctf_url}
              onChange={this.handleFormUpdate}
            ></input>
          </div>
        </div>
        <div className="row">
          <div className="col-md-3 col-lg-3" style={{ padding: "10px", fontSize: "13px", marginLeft: "10px" }}>
            Test CTF (URL):{" "}
          </div>
          <div className="col-md-3 col-lg-3">
            <input
              name="test_ctf_url"
              type="text"
              style={{ height: "30px", width: "250px", fontSize: "13px", marginBottom: "5px" }}
              value={this.state.test_ctf_url}
              onChange={this.handleFormUpdate}
            ></input>
          </div>
        </div>
        <div className="row">
          <div className="col-md-3 col-lg-3" style={{ padding: "10px", fontSize: "13px", marginLeft: "10px" }}>
            Query List (URL):{" "}
          </div>
          <div className="col-md-3 col-lg-3">
            <input
              name="query_wl_url"
              type="text"
              style={{ height: "30px", width: "250px", fontSize: "13px", marginBottom: "5px" }}
              value={this.state.query_wl_url}
              onChange={this.handleFormUpdate}
            ></input>
          </div>
        </div>
        <div className="row">
          <div className="col-md-3 col-lg-3" style={{ padding: "10px", fontSize: "13px", marginLeft: "10px" }}>
            Slots List (URL):{" "}
          </div>
          <div className="col-md-3 col-lg-3">
            <input
              name="slots_wl_url"
              type="text"
              style={{ height: "30px", width: "250px", fontSize: "13px", marginBottom: "5px" }}
              value={this.state.slots_wl_url}
              onChange={this.handleFormUpdate}
            ></input>
          </div>
        </div>
        <div className="row">
          <div className="col-md-3 col-lg-3" style={{ padding: "10px", fontSize: "13px", marginLeft: "10px" }}>
            Intent List (URL):{" "}
          </div>
          <div className="col-md-3 col-lg-3">
            <input
              name="intent_wl_url"
              type="text"
              style={{ height: "30px", width: "250px", fontSize: "13px", marginBottom: "5px" }}
              value={this.state.intent_wl_url}
              onChange={this.handleFormUpdate}
            ></input>
          </div>
        </div>
        <div className="row">
          <div className="col-md-3 col-lg-3" style={{ padding: "10px", fontSize: "13px", marginLeft: "10px" }}>
            Vocabulary Size:{" "}
          </div>
          <div className="col-md-3 col-lg-3">
            <input
              name="vocab_size"
              type="number"
              min="1"
              style={{ height: "30px", width: "250px", fontSize: "13px", marginBottom: "5px" }}
              value={this.state.vocab_size}
              onChange={this.handleFormUpdate}
            ></input>
          </div>
        </div>
        <div className="row">
          <div className="col-md-3 col-lg-3" style={{ padding: "10px", fontSize: "13px", marginLeft: "10px" }}>
            Number of Labels:{" "}
          </div>
          <div className="col-md-3 col-lg-3">
            <input
              name="num_labels"
              type="number"
              min="1"
              style={{ height: "30px", width: "250px", fontSize: "13px", marginBottom: "5px" }}
              value={this.state.num_labels}
              onChange={this.handleFormUpdate}
            ></input>
          </div>
        </div>
        <div className="row">
          <div className="col-md-3 col-lg-3" style={{ padding: "10px", fontSize: "13px", marginLeft: "10px" }}>
            Number of Intents:{" "}
          </div>
          <div className="col-md-3 col-lg-3">
            <input
              name="num_intents"
              type="number"
              min="1"
              style={{ height: "30px", width: "250px", fontSize: "13px", marginBottom: "5px" }}
              value={this.state.num_intents}
              onChange={this.handleFormUpdate}
            ></input>
          </div>
        </div>
        <div className="row">
          <div className="col-md-3 col-lg-3" style={{ padding: "10px", fontSize: "13px", marginLeft: "10px" }}>
            Sentences (URL):{" "}
          </div>
          <div className="col-md-3 col-lg-3">
            <input
              name="sentences_url"
              type="text"
              style={{ height: "30px", width: "250px", fontSize: "13px", marginBottom: "5px" }}
              value={this.state.sentences_url}
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
    let model_url = "\n";
    let output_url = "\n";

    if (typeof this.state.response === "object") {
      model_url = this.state.response.model_url + "\n";
      output_url = this.state.response.output_url;
    } else {
      status = this.state.response + "\n";
    }
    return (
      <div>
        <p style={{ fontSize: "13px" }}>Response from service is: </p>
        <pre>
          Status : {status}
          Model URL : {model_url}
          Output URL: {output_url}
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
