import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import SvgIcon from "@material-ui/core/SvgIcon";
import InfoIcon from "@material-ui/icons/Info";

import HoverIcon from "../../standardComponents/HoverIcon";
import SNETImageUpload from "../../standardComponents/SNETImageUpload";

import { SemanticSegmentation } from "./segmentation_pb_service";
import { Image } from "./segmentation_pb";

const initialUserInput = {
  mimetype: undefined,
  imageData: undefined,
};

export default class SemanticSegmentationService extends React.Component {
  constructor(props) {
    super(props);
    this.submitAction = this.submitAction.bind(this);
    this.handleFormUpdate = this.handleFormUpdate.bind(this);
    this.getData = this.getData.bind(this);
    this.canBeInvoked = this.canBeInvoked.bind(this);

    this.state = {
      ...initialUserInput,
      users_guide: "https://github.com/singnet/semantic-segmentation",
      code_repo: "https://github.com/singnet/semantic-segmentation",
      reference: "https://github.com/matterport/Mask_RCNN/tree/6fe7db7f01123a7290e1aa1fd72c797f285dfe10",
      model: "",
      response: undefined,
      visualise: true,
    };
  }

  handleFormUpdate(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  canBeInvoked() {
    if (this.state.imageData !== undefined) {
      return true;
    }
    return false;
  }

  getData(imageData, mimetype) {
    this.setState({ imageData, mimetype });
    var reader = new FileReader();

    reader.addEventListener(
      "load",
      () => {
        var dataurl = reader.result;
        this.setState({ imgsrc: "data:" + mimetype + ";base64," + dataurl.substr(dataurl.indexOf(",") + 1) });
      },
      false
    );

    reader.readAsDataURL(new Blob([imageData]));
  }

  submitAction() {
    const { imageData, mimetype, visualise } = this.state;
    const methodDescriptor = SemanticSegmentation["segment"];
    const request = new methodDescriptor.requestType();

    // Setting the Proto Message Img
    var imgProto = new Image();
    imgProto.setMimetype(mimetype);
    imgProto.setContent(imageData);

    request.setVisualise(visualise);
    request.setImg(imgProto);

    const props = {
      request,
      onEnd: response => {
        const { message, status, statusMessage } = response;
        if (status !== 0) {
          throw new Error(statusMessage);
        }
        this.setState({
          ...initialUserInput,
          response: { status: "success", debug_img: message.getDebugImg() },
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
        return btoa(
          response.debug_img.getContent().reduce((data, byte) => {
            return data + String.fromCharCode(byte);
          }, "")
        );
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
        <Grid container direction="column" alignItems="center" justify="center">
          <Grid item xs={12} container justify="center">
            <SNETImageUpload
              style={{ align: "center" }}
              maxImageSize={3000000}
              maxImageWidth={2400}
              maxImageHeight={1800}
              imageDataFunc={this.getData}
              imageName="Input"
              outputImage={this.parseResponse()}
              outputImageName="Output"
              width="100%"
              disableUrlTab={true}
              returnByteArray={true}
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
            <Grid item xs={12} container justify="center" style={{ textAlign: "center" }}>
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
