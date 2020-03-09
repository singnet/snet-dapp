import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import SvgIcon from "@material-ui/core/SvgIcon";
import InfoIcon from "@material-ui/icons/Info";

import HoverIcon from "../../standardComponents/HoverIcon";
import OutlinedDropDown from "../../common/OutlinedDropdown";
import OutlinedTextArea from "../../common/OutlinedTextArea";
import SNETImageUpload from "../../standardComponents/SNETImageUpload";

import { VqaService } from "./vqa_opencog_pb_service";

const initialUserInput = {
  methodIndex: "0",
  methodNames: [
    {
      label: "Pattern Matcher",
      content: true,
      value: "0",
    },
    {
      label: "URE",
      content: false,
      value: "1",
    },
  ],
  imageData: undefined,
  question: "",
  use_pm: true,
};

export default class VisualQAOpencog extends React.Component {
  constructor(props) {
    super(props);
    this.submitAction = this.submitAction.bind(this);
    this.handleFormUpdate = this.handleFormUpdate.bind(this);
    this.getImageData = this.getImageData.bind(this);

    this.state = {
      ...initialUserInput,
      users_guide: "https://github.com/singnet/semantic-vision/tree/master/services/vqa-service",
      code_repo: "https://github.com/singnet/semantic-vision/tree/master/services/vqa-service",
      reference: "https://github.com/singnet/semantic-vision",
      response: undefined,
    };
  }

  canBeInvoked() {
    if (this.state.imageData && this.state.question !== "") return true;
    return false;
  }

  handleFormUpdate(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  getImageData(data) {
    this.setState({ imageData: data });
  }

  submitAction() {
    const { methodIndex, methodNames, question, imageData } = this.state;
    const methodDescriptor = VqaService["answer"];
    const request = new methodDescriptor.requestType();
    const use_pm = methodNames[methodIndex].content;

    request.setQuestion(question);
    request.setUsePm(use_pm);
    request.setImageData(imageData);

    const props = {
      request,
      onEnd: ({ message }) => {
        this.setState({
          response: {
            answer: message.getAnswer(),
            ok: message.getOk(),
            error_message: message.getErrorMessage(),
          },
        });
      },
    };

    this.props.serviceClient.unary(methodDescriptor, props);
  }

  renderForm() {
    return (
      <React.Fragment>
        <Grid container spacing={2} justify="center" alignItems="center">
          <Grid item xs={12} container justify="center" style={{ textAlign: "center" }}>
            <OutlinedDropDown
              id="method"
              name="methodIndex"
              label="Method"
              fullWidth={true}
              list={this.state.methodNames}
              value={this.state.methodIndex}
              onChange={this.handleFormUpdate}
            />
          </Grid>

          <Grid item xs={12} container justify="center">
            <SNETImageUpload imageName="" imageDataFunc={this.getImageData} disableUrlTab={true} />
          </Grid>

          <Grid item xs={12} container justify="center" style={{ textAlign: "center" }}>
            <OutlinedTextArea
              id="question"
              name="question"
              label="Question"
              fullWidth={true}
              value={this.state.question}
              onChange={this.handleFormUpdate}
            />
          </Grid>

          <Grid item xs container justify="flex-end">
            <Grid item>
              <HoverIcon text="View code on Github" href={this.state.code_repo}>
                <SvgIcon>
                  <path // Github Icon
                    d="M12.007 0C6.12 0 1.1 4.27.157 10.08c-.944 5.813 2.468 11.45 8.054 13.312.19.064.397.033.555-.084.16-.117.25-.304.244-.5v-2.042c-3.33.735-4.037-1.56-4.037-1.56-.22-.726-.694-1.35-1.334-1.756-1.096-.75.074-.735.074-.735.773.103 1.454.557 1.846 1.23.694 1.21 2.23 1.638 3.45.96.056-.61.327-1.178.766-1.605-2.67-.3-5.462-1.335-5.462-6.002-.02-1.193.42-2.35 1.23-3.226-.327-1.015-.27-2.116.166-3.09 0 0 1.006-.33 3.3 1.23 1.966-.538 4.04-.538 6.003 0 2.295-1.5 3.3-1.23 3.3-1.23.445 1.006.49 2.144.12 3.18.81.877 1.25 2.033 1.23 3.226 0 4.607-2.805 5.627-5.476 5.927.578.583.88 1.386.825 2.206v3.29c-.005.2.092.393.26.507.164.115.377.14.565.063 5.568-1.88 8.956-7.514 8.007-13.313C22.892 4.267 17.884.007 12.008 0z"
                  />
                </SvgIcon>
              </HoverIcon>
            </Grid>
            <Grid item>
              <HoverIcon text="User's guide" href={this.state.users_guide}>
                <InfoIcon />
              </HoverIcon>
            </Grid>
            <Grid item>
              <HoverIcon text="View original project" href={this.state.reference}>
                <SvgIcon>
                  <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 11.701c0 2.857-1.869 4.779-4.5 5.299l-.498-1.063c1.219-.459 2.001-1.822 2.001-2.929h-2.003v-5.008h5v3.701zm6 0c0 2.857-1.869 4.779-4.5 5.299l-.498-1.063c1.219-.459 2.001-1.822 2.001-2.929h-2.003v-5.008h5v3.701z" />
                </SvgIcon>
              </HoverIcon>
            </Grid>
          </Grid>

          <Grid item xs={12} container justify="center">
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
    let answer = "\n";
    if (typeof this.state.response === "object") {
      if (this.state.response.ok) {
        answer = "answer " + this.state.response.answer;
      } else {
        answer = "Request failed with " + this.state.response.error_message;
      }
    } else {
      status = this.state.response + "\n";
    }

    return (
      <Grid style={{ background: "#F8F8F8", padding: "24px" }}>
        <h4> Results</h4>
        <Grid style={{ padding: "10px 10px 0 10px", fontSize: "14px", color: "#9b9b9b" }}>
          <Grid style={{ padding: "10px 0" }}>
            Output:
            <Grid
              style={{
                color: "#212121",
                marginTop: "5px",
                padding: "10px",
                background: "#f1f1f1",
                borderRadius: "4px",
              }}
            >
              <pre>
                Question : {this.state.question}
                <br />
                Status : {status}
                {answer}
              </pre>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }

  render() {
    if (this.props.isComplete) return <div>{this.renderComplete()}</div>;
    else {
      return <div>{this.renderForm()}</div>;
    }
  }
}
