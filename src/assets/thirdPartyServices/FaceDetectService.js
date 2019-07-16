import React from "react";
import SNETImageUpload from "./standardComponents/SNETImageUpload";

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

export default class FaceDetectService extends React.Component {
  constructor(props) {
    super(props);
    this.submitAction = this.submitAction.bind(this);
    this.getData = this.getData.bind(this);

    this.state = {
      serviceName: "FaceDetect",
      methodName: "FindFace",
      imageData: undefined,
      imgsrc: undefined,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.isComplete && this.props.response !== undefined) {
      this.renderBoundingBox(this.props.response);
    }
  }

  submitAction() {
    this.props.callApiCallback(this.state.serviceName, this.state.methodName, {
      content: this.state.imageData,
    });
  }

  canBeInvoked() {
    return this.state.methodName !== "Select a method";
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
          <div className="col-md-6 col-lg-6" style={{ marginTop: "5px", textAlign: "right" }}>
            <button type="button" className="btn btn-primary" onClick={this.submitAction}>
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
        <p style={{ fontSize: "13px" }}>Response from service is {JSON.stringify(this.props.response)} </p>
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
