import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import SvgIcon from "@material-ui/core/SvgIcon";
import InfoIcon from "@material-ui/icons/Info";

import HoverIcon from "../../standardComponents/HoverIcon";
import OutlinedDropDown from "../../common/OutlinedDropdown";
import OutlinedTextArea from "../../common/OutlinedTextArea";
import SNETImageUpload from "../../standardComponents/SNETImageUpload";

import { FaceLandmark } from "./face_landmarks_pb_service";
import { FaceLandmarkHeader } from "./face_landmarks_pb";
import { FaceDetections, BoundingBox, ImageRGB } from "./face_common_pb";

const initialUserInput = {
  modelIndex: "0",
  modelNames: [
    {
      label: "68",
      content: "68",
      value: "0",
    },
    {
      label: "5",
      content: "5",
      value: "1",
    },
  ],
  imageData: undefined,
  imgsrc: undefined,
  facesString: '[{"x":10,"y":10,"w":100,"h":100}]',
};

export default class FaceLandmarksService extends React.Component {
  constructor(props) {
    super(props);
    this.handleFormUpdate = this.handleFormUpdate.bind(this);
    this.submitAction = this.submitAction.bind(this);
    this.getData = this.getData.bind(this);
    this.renderLandmarks = this.renderLandmarks.bind(this);

    this.state = {
      ...initialUserInput,
      users_guide: "https://github.com/singnet/face-services",
      code_repo: "https://github.com/singnet/face-services",
      reference: "https://github.com/davisking/dlib/blob/master/python_examples/face_landmark_detection.py",
    };
  }

  handleFormUpdate(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  canBeInvoked() {
    let inputValid = true;
    try {
      let faces = JSON.parse(this.state.facesString);
      faces.forEach(item => {
        let expectedKeys = ["x", "y", "w", "h"];
        expectedKeys.forEach(k => {
          if (!(k in item)) inputValid = false;
        });
      });
    } catch (e) {
      inputValid = false;
    }
    if (!this.state.imageData) inputValid = false;
    return inputValid;
  }

  getData(data) {
    this.setState({ imageData: data });
    if (data) {
      var reader = new FileReader();
      reader.addEventListener(
        "load",
        () => {
          var dataurl = reader.result;
          this.setState({ imgsrc: "data:image/jpeg;base64," + dataurl.substr(dataurl.indexOf(",") + 1) });
        },
        false
      );
      reader.readAsDataURL(new Blob([data]));
    }
  }

  submitAction() {
    const methodDescriptor = FaceLandmark.GetLandmarks;
    const request = new methodDescriptor.requestType();
    const header = new FaceLandmarkHeader();
    const faceDetection = new FaceDetections();
    var bbList = [];

    // Creating the Bounding Boxes object
    var inputBoundingBox = JSON.parse(this.state.facesString);

    inputBoundingBox.forEach(item => {
      var bb = new BoundingBox();
      bb.setX(JSON.parse(item.x));
      bb.setY(JSON.parse(item.y));
      bb.setW(JSON.parse(item.w));
      bb.setH(JSON.parse(item.h));
      bbList.push(bb);
    });

    // Setting the Bounding Boxes List
    faceDetection.setFaceBboxList(bbList);

    // Setting Header Object Attributes
    header.setFaces(faceDetection);
    const idx = this.state.modelIndex;
    const model = this.state.modelNames[idx].content;
    header.setLandmarkModel(model);

    // Setting Request Object
    request.setHeader(header);
    const imageChunk = new ImageRGB();
    imageChunk.setContent(this.state.imageData);
    request.setImageChunk(imageChunk);

    const props = {
      request,
      onEnd: response => {
        const { message, status, statusMessage } = response;
        if (status !== 0) {
          throw new Error(statusMessage);
        }
        this.setState({
          response: { image_chunk: message.toObject() },
        });
      },
    };

    this.props.serviceClient.unary(methodDescriptor, props);
  }

  drawX(ctx, x, y) {
    let size = 3;
    ctx.moveTo(x - size, y - size);
    ctx.lineTo(x + size, y + size);
    ctx.stroke();
    ctx.moveTo(x + size, y - size);
    ctx.lineTo(x - size, y + size);
  }

  renderLandmarks(result) {
    let img = document.createElement("img");
    img.src = this.state.imgsrc;
    let cnvs = document.createElement("canvas");

    cnvs.style.position = "absolute";
    cnvs.style.left = img.offsetLeft + "px";
    cnvs.style.top = img.offsetTop + "px";
    cnvs.width = img.naturalWidth;
    cnvs.height = img.naturalHeight;

    let ctx = cnvs.getContext("2d");
    ctx.drawImage(img, 0, 0);
    ctx.globalAlpha = 1;

    result.image_chunk.landmarkedFacesList.forEach(item => {
      ctx.beginPath();
      item.pointList.forEach(p => {
        this.drawX(ctx, p.x, p.y);
      });
      ctx.lineWidth = 1;
      ctx.strokeStyle = "#00ff00";
      ctx.stroke();
    });

    return cnvs;
  }

  parseResponse() {
    const { response } = this.state;
    const { isComplete } = this.props;
    if (isComplete) {
      if (typeof response !== "undefined") {
        let cnvs = this.renderLandmarks(response);
        let b64img = cnvs.toDataURL("image/jpeg");
        return b64img.replace("data:image/jpeg;base64,", "");
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
        <Grid container spacing={2} justify="center" alignItems="center">
          <Grid item xs={12} container justify="center">
            <SNETImageUpload
              style={{ align: "center" }}
              imageDataFunc={this.getData}
              imageName="Input"
              outputImage={this.parseResponse()}
              outputImageName="Output"
              width="100%"
              disableUrlTab={true}
              returnByteArray={true}
            />
          </Grid>

          {!this.props.isComplete && (
            <Grid item xs={12} container justify="center" style={{ textAlign: "center" }}>
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
          )}

          {!this.props.isComplete && (
            <Grid item xs={12} container justify="center" style={{ textAlign: "center" }}>
              <OutlinedTextArea
                id="facesString"
                name="facesString"
                label="Bounding Boxes (from Detect Faces)"
                type="text"
                fullWidth={true}
                value={this.state.facesString}
                rows={8}
                onChange={this.handleFormUpdate}
              />
            </Grid>
          )}

          {this.props.isComplete && this.state.response.image_chunk.landmarkedFacesList && (
            <Grid item xs={12} container justify="center" style={{ textAlign: "center" }}>
              <OutlinedTextArea
                id="landmarks"
                name="landmarks"
                label="Landmarks"
                type="text"
                fullWidth={true}
                value={JSON.stringify(this.state.response.image_chunk.landmarkedFacesList, null, "\t")}
                rows={8}
              />
            </Grid>
          )}

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
