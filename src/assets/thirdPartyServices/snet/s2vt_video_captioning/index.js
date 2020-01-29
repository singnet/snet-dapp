import React from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import OutlinedTextArea from "../../common/OutlinedTextArea";

import { VideoCaptioning } from "./video_cap_pb_service";

export default class S2VTVideoCaptioning extends React.Component {
  constructor(props) {
    super(props);
    this.submitAction = this.submitAction.bind(this);
    this.handleFormUpdate = this.handleFormUpdate.bind(this);

    this.textInput = React.createRef();

    this.state = {
      users_guide:
        "https://github.com/singnet/dnn-model-services/blob/master/docs/users_guide/s2vt-video-captioning.md",
      code_repo: "https://github.com/singnet/dnn-model-services/blob/master/Services/gRPC/s2vt-video-captioning",
      reference: "https://vsubhashini.github.io/s2vt.html",

      serviceName: "VideoCaptioning",
      methodName: "video_cap",

      url: "",
      start_time_sec: "0",
      stop_time_sec: "0",

      response: undefined,
      isComplete: false,
    };
    this.isComplete = false;
    this.serviceMethods = [];
    this.allServices = [];
    this.methodsForAllServices = [];
  }

  isValidVideoURL(str) {
    return str.startsWith("http://") || str.startsWith("https://");
  }

  canBeInvoked() {
    return (
      this.isValidVideoURL(this.state.url) &&
      ((parseInt(this.state.start_time_sec) >= 0 &&
        parseInt(this.state.stop_time_sec) > 0 &&
        parseInt(this.state.start_time_sec) < parseInt(this.state.stop_time_sec)) ||
        (parseInt(this.state.start_time_sec) === 0 && parseInt(this.state.stop_time_sec) === 0))
    );
  }

  handleFormUpdate(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  submitAction() {
    const { methodName, url, start_time_sec, stop_time_sec } = this.state;
    const methodDescriptor = VideoCaptioning[methodName];
    const request = new methodDescriptor.requestType();

    request.setUrl(url);
    request.setStartTimeSec(start_time_sec);
    request.setStopTimeSec(stop_time_sec);

    const props = {
      request,
      onEnd: response => {
        const { message, status, statusMessage } = response;
        if (status !== 0) {
          throw new Error(statusMessage);
        }
        this.setState({
          response: { status: "success", value: message.getValue() },
        });
      },
    };

    this.props.serviceClient.unary(methodDescriptor, props);
  }

  handleFocus = event => event.target.select();

  renderForm() {
    return (
      <React.Fragment>
        <Grid container direction="column" justify="center">
          <Grid item xs={12} style={{ textAlign: "left" }}>
            <OutlinedTextArea
              id="url"
              ref={this.textInput}
              name="url"
              label="Video URL (.avi, .mp4 or YouTube)"
              fullWidth={true}
              value={this.state.url}
              rows={1}
              onChange={this.handleFormUpdate}
              onFocus={this.handleFocus}
            />
          </Grid>

          <Grid item xs={4} style={{ textAlign: "left" }}>
            <OutlinedTextArea
              id="standard-number"
              ref={this.textInput}
              name="start_time_sec"
              label="StartTime (s):"
              type="number"
              fullWidth={false}
              value={this.state.start_time_sec}
              rows={1}
              onChange={this.handleFormUpdate}
              onFocus={this.handleFocus}
            />
          </Grid>

          <Grid item xs={4} style={{ textAlign: "left" }}>
            <OutlinedTextArea
              id="filled-number"
              ref={this.textInput}
              name="stop_time_sec"
              label="EndTime (s):"
              type="number"
              fullWidth={false}
              value={this.state.stop_time_sec}
              rows={1}
              onChange={this.handleFormUpdate}
              onFocus={this.handleFocus}
            />
          </Grid>

          <Grid item xs={12} style={{ textAlign: "center" }}>
            <Button variant="contained" color="primary" onClick={this.submitAction} disabled={!this.canBeInvoked()}>
              Invoke
            </Button>
          </Grid>
        </Grid>
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
      <div style={{ background: "#F8F8F8", padding: "24px" }}>
        <h4> Results</h4>
        <div style={{ padding: "10px 10px 0 10px", fontSize: "14px", color: "#9b9b9b" }}>
          <div style={{ padding: "10px 0", borderBottom: "1px solid #eee" }}>
            Status: <span style={{ color: "#212121" }}>{status}</span>
          </div>
          <div style={{ padding: "10px 0" }}>
            Caption:
            <div
              style={{
                color: "#212121",
                marginTop: "5px",
                padding: "10px",
                background: "#f1f1f1",
                borderRadius: "4px",
              }}
            >
              <pre>{value}</pre>
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
