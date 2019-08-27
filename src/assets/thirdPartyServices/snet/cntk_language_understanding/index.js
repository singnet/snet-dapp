import React from "react";
import Button from "@material-ui/core/Button";

import { LanguageUnderstanding } from "./language_understanding_pb_service";
import MethodNamesDropDown from "../../common/MethodNamesDropDown";

const initialUserInput = {
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
};
export default class CNTKLanguageUnderstanding extends React.Component {
  constructor(props) {
    super(props);
    this.submitAction = this.submitAction.bind(this);
    this.handleFormUpdate = this.handleFormUpdate.bind(this);

    this.state = {
      ...initialUserInput,
      users_guide:
        "https://github.com/singnet/nlp-services/blob/master/docs/users_guide/cntk-language-understanding.md",
      code_repo: "https://github.com/singnet/nlp-services/blob/master/cntk-language-understanding",
      reference: "https://cntk.ai/pythondocs/CNTK_202_Language_Understanding.html",

      response: undefined,
    };
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

  submitAction() {
      const {
        methodName,
        train_ctf_url,
        test_ctf_url,
        query_wl_url,
        slots_wl_url,
        intent_wl_url,
        vocab_size,
        num_labels,
        num_intents,
        sentences_url,
      } = this.state;
  
      const methodDescriptor = LanguageUnderstanding[methodName];
      const request = new methodDescriptor.requestType();
      request.setTrainCtfUrl(train_ctf_url);
      request.setTestCtfUrl(test_ctf_url);
      request.setQueryWlUrl(query_wl_url);
      request.setSlotsWlUrl(slots_wl_url);
      request.setIntentWlUrl(intent_wl_url);
      request.setVocabSize(vocab_size);
      request.setNumLabels(num_labels);
      request.setNumIntents(num_intents);
      request.setSentencesUrl(sentences_url);
  
      const props = {
        request,
        onEnd: ({message}) => {
          this.setState({
            ...initialUserInput,
            response: { status: "success", model_url: message.getModelUrl(), output_url: message.getOutputUrl() },
          });
        },
      };
      this.props.serviceClient.unary(methodDescriptor, props);
  }

  renderForm() {
    const serviceNameOptions = ["select a method", ...this.props.serviceClient.getMethodNames(LanguageUnderstanding)];
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-md-3 col-lg-3" style={{ padding: "10px", fontSize: "13px", marginLeft: "10px" }}>
            Method Name:{" "}
          </div>
          <div className="col-md-3 col-lg-3">
            <MethodNamesDropDown
              name="methodName"
              list={serviceNameOptions}
              value={this.state.methodName}
              onChange={this.handleFormUpdate}
            />
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
    const { status, model_url, output_url } = this.state.response;

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
    if (this.props.isComplete) return <div>{this.renderComplete()}</div>;
    else {
      return <div>{this.renderForm()}</div>;
    }
  }
}
