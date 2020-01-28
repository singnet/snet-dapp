import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import OutlinedDropDown from "../../common/OutlinedDropdown";
import OutlinedTextArea from "../../common/OutlinedTextArea";

import { VideoActionRecognition } from "./video_action_recon_pb_service";

const initialUserInput = {
  modelIndex: 0,
  modelNames: [
    {
      label: "400",
      content: "400",
      value: 0,
    },
    {
      label: "600",
      content: "600",
      value: 1,
    },
  ],

  url: "",
};

export default class I3DActionRecognition extends React.Component {
  constructor(props) {
    super(props);
    this.submitAction = this.submitAction.bind(this);

    this.handleFormUpdate = this.handleFormUpdate.bind(this);

    this.textInput = React.createRef();

    this.state = {
      ...initialUserInput,
      users_guide:
        "https://github.com/singnet/dnn-model-services/blob/master/docs/users_guide/i3d-video-action-recognition.md",
      code_repo: "https://github.com/singnet/dnn-model-services/blob/master/Services/gRPC/i3d-video-action-recognition",
      reference: "https://github.com/deepmind/kinetics-i3d",

      serviceName: "VideoActionRecognition",
      methodName: "video_action_recon",
      response: undefined,
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
    return this.isValidVideoURL(this.state.url);
  }

  handleFormUpdate(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  submitAction() {
    const { methodName, modelIndex, modelNames, url } = this.state;
    const methodDescriptor = VideoActionRecognition[methodName];
    const request = new methodDescriptor.requestType();

    request.setModel(modelNames[modelIndex].content);
    request.setUrl(url);

    const props = {
      request,
      onEnd: ({ message }) => {
        this.setState({
          ...initialUserInput,
          response: { status: "success", value: message.getValue() },
        });
      },
    };

    this.props.serviceClient.unary(methodDescriptor, props);
  }

  renderForm() {
    return (
      <React.Fragment>
        <Grid container direction="column" justify="center">
          <Grid item xs={4} style={{ textAlign: "left" }}>
            <OutlinedDropDown
              id="model"
              name="modelIndex"
              label="Model"
              fullWidth={true}
              list={this.state.modelNames}
              value={this.state.modelIndex}
              onChange={this.handleFormUpdate}
            />
          </Grid>

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
            Top Predicted Actions:
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
