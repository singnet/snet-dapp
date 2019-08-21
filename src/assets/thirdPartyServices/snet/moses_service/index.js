import React from "react";
import { showNotification } from "./utils";
import MosesServiceForm from "./MosesServiceForm";
import MosesServiceResult from "./MosesServiceResult";

export default class MosesService extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      busy: false,
      error: null,
      notification: null,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidUpdate(nextProps) {
    if (this.props.isComplete !== nextProps.isComplete) {
      if (!this.props.response || !this.props.response.resultUrl) {
        this.state.notification = {
          message: nextProps.response.description,
          busy: false,
        };
      } else {
        this.state.notification = null;
      }
    }
  }

  parseResponse() {
    const { response } = this.props;
    if (typeof response !== "undefined") {
      return response;
    }
  }

  handleSubmit(analysisParameters) {
    this.setState({
      busy: true,
      notification: { message: "Attempting to start analysis ...", busy: true },
    });
    this.props.callApiCallback("MosesService", "StartAnalysis", analysisParameters);
  }

  renderForm() {
    return <MosesServiceForm busy={this.state.busy} handleSubmit={this.handleSubmit} error={this.state.error} />;
  }

  renderComplete() {
    return <MosesServiceResult result={this.parseResponse()} />;
  }

  render() {
    return (
      <div>
        {this.props.isComplete ? this.renderComplete() : this.renderForm()}
        {this.state.notification &&
          showNotification(this.state.notification, () => {
            this.setState({ notification: null });
          })}
      </div>
    );
  }
}