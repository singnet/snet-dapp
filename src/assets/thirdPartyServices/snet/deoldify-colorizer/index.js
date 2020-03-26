import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Slider from "@material-ui/lab/Slider";
import SvgIcon from "@material-ui/core/SvgIcon";
import InfoIcon from "@material-ui/icons/Info";

import SNETImageUpload from "../../standardComponents/SNETImageUpload";
import HoverIcon from "../../standardComponents/HoverIcon";

import { Colorization } from "./colorization_pb_service";

const initialUserInput = {
  img_path: undefined,
  render_factor: 35,
};

export default class ColorizationService extends React.Component {
  constructor(props) {
    super(props);
    this.submitAction = this.submitAction.bind(this);

    this.handleFormUpdate = this.handleFormUpdate.bind(this);
    this.getImageURL = this.getImageURL.bind(this);
    this.handleSliderChange = this.handleSliderChange.bind(this);

    this.state = {
      ...initialUserInput,
      users_guide: "https://singnet.github.io/dnn-model-services/users_guide/deoldify-colorizer.html",
      code_repo: "https://github.com/singnet/dnn-model-services/tree/master/services/deoldify-colorizer",
      reference: "https://github.com/jantic/DeOldify",
      response: undefined,
    };
  }

  getImageURL(data) {
    this.setState({ img_path: data });
  }

  canBeInvoked() {
    return this.state.img_path;
  }

  handleSliderChange(event, value) {
    this.setState({ render_factor: value });
  }

  handleFormUpdate(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  submitAction() {
    const { img_path, render_factor } = this.state;
    const methodDescriptor = Colorization["colorize"];
    const request = new methodDescriptor.requestType();

    request.setImgInput(img_path);
    request.setRenderFactor(render_factor);

    const props = {
      request,
      onEnd: response => {
        const { message, status, statusMessage } = response;
        if (status !== 0) {
          throw new Error(statusMessage);
        }
        this.setState({
          ...initialUserInput,
          response: {
            status: "success",
            img_colorized: message.getImgColorized(),
          },
        });
      },
    };

    this.props.serviceClient.unary(methodDescriptor, props);
  }

  parseResponse() {
    const { response } = this.state;
    const { isComplete } = this.props;

    if (isComplete) {
      if (typeof response !== "undefined") {
        if (typeof response === "string") {
          return response;
        }
        return response.img_colorized;
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  render() {
    return (
      <React.Fragment>
        <Grid container spacing={3} direction="column" justify="center" alignItems="center">
          <Grid item xs={12} />
          {!this.props.isComplete && (
            <Grid item xs={8} container justify="center">
              <Grid item xs>
                Render Factor ({this.state.render_factor}):{" "}
              </Grid>
              <Grid item xs>
                <Slider
                  style={{ padding: "12px 0px" }}
                  value={this.state.render_factor}
                  min={1}
                  max={45}
                  step={1}
                  onChange={this.handleSliderChange}
                />
              </Grid>
            </Grid>
          )}

          <Grid item xs={12} container justify="center">
            <SNETImageUpload
              imageName=""
              imageDataFunc={this.getImageURL}
              outputImage={this.parseResponse()}
              outputImageName="Response"
              instantUrlFetch={true}
              allowURL={true}
              width="100%"
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

          {!this.props.isComplete && (
            <Grid item xs={12} style={{ textAlign: "center" }}>
              <Button variant="contained" color="primary" onClick={this.submitAction} disabled={!this.canBeInvoked()}>
                Invoke
              </Button>
            </Grid>
          )}
        </Grid>
      </React.Fragment>
    );
  }
}
