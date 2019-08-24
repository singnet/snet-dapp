import React from "react";
import { Translation } from "./translate_pb_service";

const initialUserInput = {
  methodName: "Select a method",
  source_language: undefined,
  target_language: undefined,
  text: undefined,
};

export default class TranslationService extends React.Component {
  constructor(props) {
    super(props);
    this.submitAction = this.submitAction.bind(this);
    this.handleFormUpdate = this.handleFormUpdate.bind(this);

    this.state = {
      serviceName: "Translation",
      methodName: "translate",
      source_language: "en",
      target_language: "de",
      text: "Welcome to the future!",
    };
  }

  canBeInvoked() {
    return this.state.text !== "";
  }

  handleFormUpdate(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  submitAction() {
    const { methodName, source_language, target_language, text } = this.state;
    const methodDescriptor = Translation[methodName];
    const request = new methodDescriptor.requestType();

    request.setSourceLanguage(source_language);
    request.setTargetLanguage(target_language);
    request.setText(text)

    const props = {
      request,
      onEnd: response => {
        const { message, status, statusMessage } = response;
        if (status !== 0) {
          throw new Error(statusMessage);
        }
        this.setState({
          ...initialUserInput,
          response: { status: "success", translation: message.getTranslation(), },
        });
      },
    };

    this.props.serviceClient.unary(methodDescriptor, props);
  }



  renderForm() {
    // One day this should come from the service when free method calls are allowed.
    const languages = ["en", "de"];
    const languageOptions = languages.map((lang, index) => {
      return <option key={index}>{lang}</option>;
    });
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-md-3 col-lg-3" style={{ padding: "10px", fontSize: "13px", marginLeft: "10px" }}>
            Source Language:{" "}
          </div>
          <div className="col-md-3 col-lg-3">
            <select
              name="source_language"
              value={this.state.source_language}
              style={{ height: "30px", width: "250px", fontSize: "13px", marginBottom: "5px" }}
              onChange={this.handleFormUpdate}
            >
              {languageOptions}
            </select>
          </div>
        </div>
        <div className="row">
          <div className="col-md-3 col-lg-3" style={{ padding: "10px", fontSize: "13px", marginLeft: "10px" }}>
            Target Language:{" "}
          </div>
          <div className="col-md-3 col-lg-3">
            <select
              name="target_language"
              value={this.state.target_language}
              style={{ height: "30px", width: "250px", fontSize: "13px", marginBottom: "5px" }}
              onChange={this.handleFormUpdate}
            >
              {languageOptions}
            </select>
          </div>
        </div>
        <div className="row">
          <div className="col-md-3 col-lg-3" style={{ padding: "10px", fontSize: "13px", marginLeft: "10px" }}>
            Text to translate:{" "}
          </div>
          <div className="col-md-3 col-lg-3">
            <textarea rows="5" cols="60" name="text" value={this.state.text} onChange={this.handleFormUpdate} />
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

<div style={{background:"#F8F8F8", padding: "24px"}}>
    <h4> Results</h4>
    <div style={{ padding: "10px 10px 0 10px", fontSize: "14px", color:"#9b9b9b" }}>
        <div style={{ padding: "10px 0" }}>Response from service is: 
            <div style={{color:"#212121", marginTop:"5px",padding:"10px", background:"#f1f1f1",borderRadius:"4px"}}>
                {response.translation} 
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
