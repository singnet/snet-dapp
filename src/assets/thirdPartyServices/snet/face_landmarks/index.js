import React from "react";
import SNETImageUpload from "../../standardComponents/SNETImageUpload";

import {FaceLandmark} from "./face_landmarks_pb_service"
import { FaceLandmarkHeader } from "./face_landmarks_pb";
import { FaceDetections, BoundingBox, ImageRGB } from "./face_common_pb"

const outsideWrapper = {
  width: "256px",
  height: "256px",
  margin: "0px 0px",
  border: "0px",
};
const insideWrapper = {
  width: "100%",
  height: "100%",
  position: "relative",
};
const coveredImage = {
  width: "100%",
  height: "100%",
  position: "absolute",
  top: "0px",
  left: "0px",
};
const coveringCanvas = {
  width: "100%",
  height: "100%",
  position: "absolute",
  top: "0px",
  left: "0px",
};

const initialUserInput = {
  imageData: undefined,
  imgsrc: undefined,
};

export default class FaceLandmarksService extends React.Component {
  constructor(props) {
    super(props);
    this.submitAction = this.submitAction.bind(this);
    this.getData = this.getData.bind(this);

    this.state = {
      serviceName: "FaceLandmark",
      methodName: "GetLandmarks",
      facesString: '[{"x":10,"y":10,"w":100,"h":100}]',
      landmarkModel: "68",
    };
    this.valid = false;
    this.parseErr = undefined;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.isComplete && this.state.response !== undefined) {
      this.renderLandmarks(this.state.response);
    }

    // This is hacky, but could figure out a better way to avoid react difficulties
    if (
      this.state.facesString != prevState.facesString ||
      this.state.imageData != prevState.imageData ||
      this.state.landmarkModel != prevState.landmarkModel
    ) {
      let currValid = this.checkValid(this.state);
      this.setState(currValid);
    }
  }

  handleChange(type, e) {
    this.setState({
      [type]: e.target.value,
    });
  }

  submitAction() {

    const methodDescriptor = FaceLandmark.GetLandmarks;
    const request = new methodDescriptor.requestType();

    const header = new FaceLandmarkHeader();

    const faceDetection = new FaceDetections();

    var bbList = []
    //var bb = new BoundingBox(JSON.parse(this.state.facesString)[0])

    // Creating the Bouding Boxes object
    var inputBoudingBox = JSON.parse(this.state.facesString)

    inputBoudingBox.forEach(item => {

      var bb = new BoundingBox();
      bb.setX(JSON.parse(item.x));
      bb.setY(JSON.parse(item.y));
      bb.setW(JSON.parse(item.w));
      bb.setH(JSON.parse(item.h));
      bbList.push(bb);

    })

    // Setting the Bouding Boxes List
    faceDetection.setFaceBboxList(bbList)

    // Setting Header Object Attributes
    header.setFaces(faceDetection)
    header.setLandmarkModel(this.state.landmarkModel)

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


  canBeInvoked() {
    return this.state.inputValid;
  }

  checkValid(state) {
    let inputValid = true;
    let err = undefined;

    try {
      let faces = JSON.parse(state.facesString);
      faces.forEach(item => {
        let expectedKeys = ["x", "y", "w", "h"];
        expectedKeys.forEach(k => {
          if (!(k in item)) inputValid = false;
        });
      });
    } catch (e) {
      err = e.message;
      inputValid = false;
    }

    if (state.landmarkModel !== "68" && state.landmarkModel !== "5") {
      err = "model must be '68' or '5'";
      inputValid = false;
    }

    if (state.imageData === undefined) {
      err = "You need to upload an image";
      inputValid = false;
    }

    return { parseErr: err, inputValid: inputValid };
  }

  getData(imageData, mimetype, format, fn) {
    this.setState({ imageData: imageData });
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

  drawX(ctx, x, y) {
    let size = 3;

    ctx.moveTo(x - size, y - size);
    ctx.lineTo(x + size, y + size);
    ctx.stroke();

    ctx.moveTo(x + size, y - size);
    ctx.lineTo(x - size, y + size);
  }

  renderLandmarks(result) {
    let img = this.refs.sourceImg;
    let cnvs = this.refs.bboxCanvas;
    let outsideWrap = this.refs.outsideWrap;
    if (img === undefined || cnvs === undefined || outsideWrap == undefined) return;
    if (img.naturalWidth === 0 || img.naturalHeight === 0) {
      setTimeout(() => this.renderLandmarks(result), 200);
      return;
    }
    //let desiredWidth = this.props.sliderWidth;
    let desiredWidth = img.naturalWidth;
    let scaleFactor = desiredWidth / img.naturalWidth;
    outsideWrap.style.width = img.naturalWidth * scaleFactor + "px";
    outsideWrap.style.height = img.naturalHeight * scaleFactor + "px";
    cnvs.style.position = "absolute";
    cnvs.style.left = img.offsetLeft + "px";
    cnvs.style.top = img.offsetTop + "px";
    cnvs.width = img.naturalWidth * scaleFactor;
    cnvs.height = img.naturalHeight * scaleFactor;

    let ctx = cnvs.getContext("2d");
    
    //result.landmarked_faces.forEach(item => {
    result.image_chunk.landmarkedFacesList.forEach(item => {
      ctx.beginPath();
      //item.point.forEach(p => {
      item.pointList.forEach(p => {
        this.drawX(ctx, p.x * scaleFactor, p.y * scaleFactor);
      });
      ctx.lineWidth = 1;
      ctx.strokeStyle = "#00ff00";
      ctx.stroke();
    });

  }

  renderBoundingBox(result) {
    // {"faces": [{"x": 511, "y": 170, "w": 283, "h": 312}, {"x": 61, "y": 252, "w": 236, "h": 259}]}
    let img = this.refs.sourceImg;
    let cnvs = this.refs.bboxCanvas;
    let outsideWrap = this.refs.outsideWrap;
    if (img === undefined || cnvs === undefined || outsideWrap == undefined) return;
    if (img.naturalWidth === 0 || img.naturalHeight === 0) {
      setTimeout(() => this.renderBoundingBox(result), 200);
      return;
    }
    let desiredWidth = this.props.sliderWidth;
    let scaleFactor = desiredWidth / img.naturalWidth;
    outsideWrap.style.width = img.naturalWidth * scaleFactor + "px";
    outsideWrap.style.height = img.naturalHeight * scaleFactor + "px";
    cnvs.style.position = "absolute";
    cnvs.style.left = img.offsetLeft + "px";
    cnvs.style.top = img.offsetTop + "px";
    cnvs.width = img.naturalWidth * scaleFactor;
    cnvs.height = img.naturalHeight * scaleFactor;

    let ctx = cnvs.getContext("2d");
    result.face_bbox.forEach(item => {
      ctx.beginPath();
      ctx.rect(item.x * scaleFactor, item.y * scaleFactor, item.w * scaleFactor, item.h * scaleFactor);
      ctx.lineWidth = 3;
      ctx.strokeStyle = "#00ff00";
      ctx.stroke();
    });
  }

  renderForm() {
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-md-6 col-lg-6">
            <SNETImageUpload imageDataFunc={this.getData} returnByteArray={true} disableUrlTab={true} />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 col-lg-6">
            <label>
              Landmark model:
              <input
                type="text"
                value={this.state.landmarkModel}
                onChange={this.handleChange.bind(this, "landmarkModel")}
              />
            </label>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 col-lg-6">
            <label>
              Faces JSON (you can get this from face detect):
              <textarea onChange={this.handleChange.bind(this, "facesString")} value={this.state.facesString} />
            </label>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 col-lg-6" style={{ marginTop: "5px", textAlign: "center" }}>
            <p style={{ fontSize: "14px", color: "red" }}>{this.state.parseErr}</p>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 col-lg-6" style={{ marginTop: "5px", textAlign: "right" }}>
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
    return (
      <div>
        <p style={{ fontSize: "13px" }}>Response from service is {JSON.stringify(this.state.response)} </p>
        <div ref="outsideWrap" style={outsideWrapper}>
          <div style={insideWrapper}>
            <img ref="sourceImg" style={coveredImage} src={this.state.imgsrc} />
            <canvas ref="bboxCanvas" style={coveringCanvas} />
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
