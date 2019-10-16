import React from "react";
import { hasOwnDefinedProperty } from "../../../../utility/JSHelper";
import Button from "@material-ui/core/Button";
import {RomanceTranslator} from "./romance_translator_pb_service" ;


export default class OpenNMTRomanceTranslator extends React.Component {
  constructor(props) {
    super(props);
    this.submitAction = this.submitAction.bind(this);
    this.handleFormUpdate = this.handleFormUpdate.bind(this);


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
      isComplete : false 
    };
    this.langOptions = ["es", "fr", "it", "pt", "ro"];
    this.isComplete = false;
    this.serviceMethods = [];
    this.allServices = [];
    this.methodsForAllServices = [];
   
  }

  canBeInvoked() {
    return this.state.source_lang !== this.state.target_lang && this.state.sentences_url !== "";
  }

  handleFormUpdate(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  submitAction() {
    const { methodName, source_lang,target_lang,sentences_url } = this.state;
    const methodDescriptor = RomanceTranslator[methodName];
    const request = new methodDescriptor.requestType();

    request.setSourceLang(source_lang)
    request.setTargetLang(target_lang)
    request.setSentencesUrl(sentences_url)


    const props = {
        request,
        onEnd: ({ message }) => {
          this.setState({ isComplete: true, response: { translation: message.getTranslation() } });
        },
      };

    this.props.serviceClient.unary(methodDescriptor, props);
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
        
<div style={{background:"#F8F8F8", padding: "24px"}}>
    <h4> Results</h4>
    <div style={{ padding: "10px 10px 0 10px", fontSize: "14px", color:"#9b9b9b" }}>
        <div style={{ padding: "10px 0",borderBottom: "1px solid #eee" }}>Status: <span style={{color:"#212121"}}>{status}</span></div>
        <div style={{ padding: "10px 0" }}>Translation: 
            <div style={{color:"#212121", marginTop:"5px",padding:"10px", background:"#f1f1f1",borderRadius:"4px"}}>{translation}</div>
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
