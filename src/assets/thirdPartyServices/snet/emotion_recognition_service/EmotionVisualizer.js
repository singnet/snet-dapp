import React from "react";
import Button from "@material-ui/core/Button";
import { Tabs, Tab } from "@material-ui/core";
import ReactJson from "react-json-view";
import styles from "./emotion_recognition.css.cs";
import html2canvas from "html2canvas";

const ResultView = { Image: 0, JSON: 1 };

export default class EmotionVisualizer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resultView: ResultView.Image,
    };
    this.download = this.download.bind(this);
    this.download_img = this.download_img.bind(this);
    this.changeResultView = this.changeResultView.bind(this);
    this.renderBoundingBox();
  }

  componentDidUpdate() {
    if (this.state.resultView === ResultView.Image) {
      this.renderBoundingBox();
    }
  }

  changeResultView(e, value) {
    this.setState({ resultView: value });
  }

  download() {
    const link = document.createElement("a");
    link.setAttribute("type", "hidden");
    link.setAttribute("href", "data:text/json," + JSON.stringify(this.props.jobResult));
    link.setAttribute("download", "result.json");
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  download_img() {
    // this is a link to download the rendered boxes form the given image
    let cnvs = this.refs.outsideWrap;
    html2canvas(cnvs, {}).then(canvas => {
      const link = document.createElement("a");
      link.setAttribute("type", "hidden");
      link.setAttribute("href", canvas.toDataURL(this.props.inputImageType));
      link.setAttribute("download", "result." + this.props.inputImageType.split("/")[1]);
      document.body.appendChild(link);
      link.click();
      link.remove();
    });
  }

  renderBoundingBox() {
    let img = this.refs.sourceImg;
    let cnvs = this.refs.bboxCanvas;
    let outsideWrap = this.refs.outsideWrap;
    if (img === undefined || cnvs === undefined || outsideWrap === undefined) {
      setTimeout(() => this.renderBoundingBox(), 1);
      return;
    }

    let width;
    if (this.props.sliderWidth === "100%") {
      width = Math.min(document.documentElement.clientWidth, window.innerWidth);
    } else {
      width = parseInt(this.props.sliderWidth, 10);
    }
    let scale = width / parseInt(img.naturalWidth, 10);
    outsideWrap.style.width = img.naturalWidth * scale + "px";
    outsideWrap.style.height = img.naturalHeight * scale + "px";
    cnvs.style.position = "absolute";
    cnvs.style.left = img.offsetLeft + "px";
    cnvs.style.top = img.offsetTop + "px";
    cnvs.width = img.naturalWidth * scale;
    cnvs.height = img.naturalHeight * scale;

    let context = cnvs.getContext("2d");
    //this.props.jobResult["faces"].forEach(item => {
    this.props.jobResult.facesList.forEach(item => {
      context.beginPath();
      context.rect(
        item.boundingBox["x"] * scale,
        item.boundingBox["y"] * scale,
        item.boundingBox["w"] * scale,
        item.boundingBox["h"] * scale
      );
      context.lineWidth = 3;
      context.strokeStyle = "#F70056";
      context.fillStyle = "#F70056";
      context.font = "18px Arial";
      context.fillText(
        item.emotion.charAt(0).toUpperCase() + item.emotion.substr(1),
        item.boundingBox["x"] * scale + 10,
        item.boundingBox["y"] * scale + 20
      );
      context.stroke();
    });
    return cnvs;
  }

  render() {
    return (
      <React.Fragment>
        <Tabs variant="fullWidth" value={this.state.resultView} onChange={this.changeResultView}>
          <Tab value={ResultView.Image} label="Image" />
          <Tab value={ResultView.JSON} label="JSON" />
        </Tabs>

        {this.state.resultView === ResultView.Image && (
          <div ref="outsideWrap" style={styles.outsideWrapper}>
            <div style={styles.insideWrapper}>
              <img
                alt="source"
                ref="sourceImg"
                src={"data:" + this.props.inputImageType + ";base64," + this.props.inputImage}
                style={styles.coveredImage}
              />
              <canvas ref="bboxCanvas" style={styles.coveringCanvas} />
            </div>
            {/* <div className="row" align="center">
              <button type="button" className="btn btn-primary" onClick={this.download_img}>
                Download Image with Bounding Boxes
              </button>
            </div> */}
          </div>
        )}
        {this.state.resultView === ResultView.JSON && (
          <div className="row">
            <ReactJson src={this.props.jobResult} theme="apathy:inverted" />
            <div className="row" align="center">
              <Button variant="contained" color="primary" onClick={this.download}>
                Download Results JSON file
              </Button>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}
