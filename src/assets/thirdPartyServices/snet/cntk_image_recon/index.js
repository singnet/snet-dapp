import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import SvgIcon from "@material-ui/core/SvgIcon";
import InfoIcon from "@material-ui/icons/Info";

import HoverIcon from "../../standardComponents/HoverIcon";
import OutlinedDropDown from "../../common/OutlinedDropdown";
import SNETImageUpload from "../../standardComponents/SNETImageUpload";

import { Recognizer } from "./image_recon_pb_service";

const initialUserInput = {
  methodIndex: "0",
  methodNames: [
    {
      label: "Flowers",
      content: "flowers",
      value: "0",
    },
    {
      label: "Dogs",
      content: "dogs",
      value: "1",
    },
  ],

  img_path: undefined,
};

export default class CNTKImageRecognition extends React.Component {
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
      response: undefined,
    };
  }

  canBeInvoked() {
    if(this.state.img_path) return true;
    return false;
  }

  getImageData(data) {
    this.setState({ img_path: data });
  }

  handleFormUpdate(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  submitAction() {
    const { methodIndex, methodNames, img_path } = this.state;
    const methodDescriptor = Recognizer[methodNames[methodIndex].content];
    const request = new methodDescriptor.requestType();

    request.setImgPath(img_path);
    request.setModel("ResNet152");

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
    return (
      <React.Fragment>
        <Grid container spacing={2} justify="center" alignItems="center">
          <Grid item xs={12} container justify="center" style={{ textAlign: 'center' }}>
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
            <SNETImageUpload imageName="" imageDataFunc={this.getImageData} instantUrlFetch={true} allowURL={true} />
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
    const { response } = this.state;
    let top5 = response.top_5;
    let topArray = ["No response!"];
    if (top5 && typeof top5 === "string") {
      top5 = top5.replace("{", "");
      top5 = top5.replace("}", "");
      topArray = top5.split(", ");
    }

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
              {topArray.map((elem, idx) => {
                return (
                  <Grid key={idx}>
                    <span key={idx} style={{ color: "#212121" }}>
                      {elem}
                    </span>
                  </Grid>
                );
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
