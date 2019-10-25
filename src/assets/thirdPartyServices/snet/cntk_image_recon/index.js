import React from "react";
import Grid from "@material-ui/core/Grid";
import { useStyles } from "./styles";
import { withStyles } from "@material-ui/styles";

import { Recognizer } from "./image_recon_pb_service";

import SNETImageUpload from "../../standardComponents/SNETImageUpload";
import StyledDropdown from "../../../../components/common/StyledDropdown";
import StyledButton from "../../../../components/common/StyledButton";

const initialUserInput = {
  methodName: "Select a method",
  img_path: undefined,
};

class CNTKImageRecognition extends React.Component {
  constructor(props) {
    super(props);
    this.submitAction = this.submitAction.bind(this);
    this.handleFormUpdate = this.handleFormUpdate.bind(this);
    this.getImageData = this.getImageData.bind(this);

    this.state = {
      ...initialUserInput,
      users_guide: "https://singnet.github.io/dnn-model-services/users_guide/cntk-image-recon.html",
      code_repo: "https://github.com/singnet/dnn-model-services/tree/master/services/cntk-image-recon",
      reference: "https://cntk.ai/pythondocs/CNTK_301_Image_Recognition_with_Deep_Transfer_Learning.html",
      model: "ResNet152",
      response: undefined,
    };
  }

  canBeInvoked() {
    return this.state.img_path && this.state.methodName !== "Select a method";
  }

  getImageData(data) {
    this.setState({ img_path: data });
  }

  handleFormUpdate(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  submitAction() {
    const { methodName, img_path, model } = this.state;
    const methodDescriptor = Recognizer[methodName];
    const request = new methodDescriptor.requestType();

    request.setImgPath(img_path);
    request.setModel(model);

    const props = {
      request,
      onEnd: ({ message }) => {
        this.setState({
          ...initialUserInput,
          response: { status: "Success", top_5: message.getTop5(), delta_time: message.getDeltaTime() },
        });
      },
    };

    this.props.serviceClient.unary(methodDescriptor, props);
  }

  renderForm() {
    const { classes } = this.props;
    const serviceNameOptions = Object.entries(Recognizer).map(([key, value]) => ({ value: value.methodName, label: key }));
    serviceNameOptions.shift();
    return (
      <React.Fragment>
        <Grid
          container
          direction="column"
          justify="center">
            <Grid xs={6} className={classes.dropDown} align="left">
                  <span className={classes.dropDownTitle}>Method</span>
              <StyledDropdown
                labelTxt={"methodName"}
                list={serviceNameOptions}
                value={this.state.methodName}
                onChange={this.handleFormUpdate}/>
            </Grid>
        
            <Grid xs className={classes.upload} align="center">
                <SNETImageUpload
                imageName={"Content Image"}
                imageDataFunc={this.getImageData}
                instantUrlFetch={true}
                allowURL={true} />
            </Grid>

            <Grid xs className={classes.about}>
                About:{" "}
                <StyledButton
                  type="blue"
                  btnText="Guide"
                  target="_blank"
                  href={this.state.users_guide}/>
                <StyledButton
                  type="blue"
                  btnText="Code"
                  target="_blank"
                  href={this.state.code_repo}/>
                <StyledButton
                  type="blue"
                  btnText="Reference"
                  target="_blank"
                  href={this.state.reference}/>
            </Grid>

            <Grid xs className={classes.invoke}>
              <StyledButton
              type="blue"
              btnText="Invoke"
              disabled={!this.canBeInvoked()}
              onClick={this.submitAction}/>
            </Grid>
        </Grid>
      </React.Fragment>
    );
  }

  renderComplete() {
    const { response } = this.state;
    var top5 = response.top5;
    top5 = top5.replace('{', '');
    top5 = top5.replace('}', '');
    var topArray = top5.split(', ');

    return (
      <Grid style={{ background: "#F8F8F8", padding: "24px" }}>
        <h4> Results</h4>
        <Grid style={{ padding: "10px 10px 0 10px", fontSize: "14px", color: "#9b9b9b" }}>
          <Grid style={{ padding: "10px 0", borderBottom: "1px solid #eee" }}>
            Status: <span style={{ color: "#212121" }}>{response.status}</span>
          </Grid>
          <Grid style={{ padding: "10px 0", borderBottom: "1px solid #eee" }}>
            Time : <span style={{ color: "#212121" }}>{response.delta_time}</span>
          </Grid>
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
              {topArray.map((elem) => {
                return (<Grid><span style={{ color: "#212121" }}>{elem}</span></Grid>)
              })}
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

export default withStyles(useStyles)(CNTKImageRecognition);
