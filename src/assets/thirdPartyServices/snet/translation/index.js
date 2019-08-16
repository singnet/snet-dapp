import React from "react";

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
    this.props.callApiCallback(this.state.serviceName, this.state.methodName, {
      source_language: this.state.source_language,
      target_language: this.state.target_language,
      text: this.state.text,
    });
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
    const response = this.props.response;

    return (
      <div>
        <p style={{ fontSize: "13px" }}>Response from service is: {response.translation} </p>
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
