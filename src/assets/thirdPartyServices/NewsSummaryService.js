import React from "react";

export default class NewSummaryService extends React.Component {
  constructor(props) {
    super(props);
    this.submitAction = this.submitAction.bind(this);
    this.handleFormUpdate = this.handleFormUpdate.bind(this);

    this.state = {
      serviceName: "TextSummary",
      methodName: "summary",
      article_content:
        'Analysts are predicting record highs as a global shortage of teddy bears sweeps the nation. "The market these products is way up". The advice is to stay indoors as society collapses under the demand.',
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
      article_content: this.state.article_content,
    });
  }

  renderForm() {
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-md-3 col-lg-3" style={{ padding: "10px", fontSize: "13px", marginLeft: "10px" }}>
            News text to summarise:{" "}
          </div>
          <div className="col-md-3 col-lg-3">
            <textarea
              rows="8"
              cols="60"
              name="article_content"
              value={this.state.article_content}
              onChange={this.handleFormUpdate}
            />
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
        <p style={{ fontSize: "13px" }}>Summary of article: {response.article_summary} </p>
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
