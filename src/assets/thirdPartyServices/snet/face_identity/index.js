import React from "react";
import SNETImageUpload from "../../standardComponents/SNETImageUpload";

import {FaceRecognition} from "./face_recognition_pb_service"

import { FaceRecognitionHeader } from "./face_recognition_pb";
import { BoundingBox, ImageRGB } from "./face_common_pb"

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

const centerCanvas = {
  marginLeft: "auto",
  marginRight: "auto",
  display: "block",
};

class FaceIdentityBadge extends React.Component {
  constructor(props) {
    super(props);
    // This will fail if sliderWidth is not in a format like '550px'
    //this.width = parseInt(props.sliderWidth) - 30;
    this.width = 550 - 30;
    this.height = 160;
    this.sWidth = this.width / 16;
    this.sHeight = this.height / 8;
    this.canvas_ref = React.createRef();
  }

  componentDidMount() {
    this.renderBadge(this.props.identity);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.identity !== prevProps.identity) {
      this.renderBadge(this.props.identity);
    }
  }

  mapColor(p) {
    var rComponent = 0;
    var gComponent = 0;
    var bComponent = 0;

    if (p < -0.5) {
      var x = (-p - 0.5) * 2.0;
      rComponent = 0;
      gComponent = x * 255;
      bComponent = 255;
    } else if (p < 0.0) {
      var x = -p * 2.0;
      rComponent = 0;
      gComponent = 255;
      bComponent = 255 - x * 255;
    } else if (p < 0.5) {
      var x = p * 2.0;
      rComponent = x * 255;
      gComponent = 255;
      bComponent = 0;
    } else if (p < 1.0) {
      var x = (p - 0.5) * 2.0;
      rComponent = 255;
      gComponent = 255 - x * 255;
      bComponent = 0;
    }

    var s = "rgb(" + rComponent + "," + gComponent + "," + bComponent + ")";
    return s;
  }

  mapColorMonochrome(p) {
    var rComponent = 0;
    var gComponent = 0;
    var bComponent = 0;

    if (p < 0) {
      var x = -p;
      bComponent = x * 255;
    } else {
      var x = p;
      gComponent = x * 255;
    }

    var s = "rgb(" + rComponent + "," + gComponent + "," + bComponent + ")";
    return s;
  }

  renderBadge(identity) {
    var canvas = this.canvas_ref.current;
    if (canvas !== undefined && canvas.getContext) {
      var ctx = canvas.getContext("2d");
      identity.map((item, idx) => {
        var x = idx % 16;
        var y = Math.floor(idx / 16);
        var t = item + 1.0 / 2.0; // -1 .. 1 => 0 .. 1
        var logit = Math.log(t / (1 - t));
        ctx.fillStyle = this.mapColorMonochrome(logit); //'rgb(' + (item * 255) + ', 0, 0)';
        ctx.fillRect(x * this.sWidth, y * this.sHeight, this.sWidth, this.sHeight);
      });
    }
  }

  render() {
    return (
      <canvas
        style={centerCanvas}
        width={this.width}
        height={this.height}
        ref={this.canvas_ref}
        value={JSON.stringify(this.props.identity)}
      ></canvas>
    );
  }
}

export default class FaceIdentityService extends React.Component {
  constructor(props) {
    super(props);
    this.submitAction = this.submitAction.bind(this);
    this.getData = this.getData.bind(this);

    this.state = {
      serviceName: "FaceRecognition",
      methodName: "RecogniseFace",
      imageData: undefined,
      imgsrc: undefined,
      facesString: '[{"x":10,"y":10,"w":100,"h":100}]',
    };

    this.isComplete = false;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.facesString !== prevState.facesString) {
      let inputValid = this.checkValid();
      if (inputValid) {
        // TODO render the image inside the upload widget
        // renderBoundingBox
      }
      this.setState({ inputValid: this.checkValid() });
    }
    if (this.state.methodName !== prevState.methodName) this.setState({ inputValid: this.checkValid() });
    if (this.state.imageData !== prevState.imageData) this.setState({ inputValid: this.checkValid() });
  }

  handleChange(type, e) {
    this.setState({
      [type]: e.target.value,
    });
  }

  submitAction() {

    const methodDescriptor = FaceRecognition.RecogniseFace;  
    const request = new methodDescriptor.requestType();

    const header = new FaceRecognitionHeader();

    var bbList = []
    //var bb = new BoundingBox(JSON.parse(this.state.facesString)[0])

    var inputBoudingBox = JSON.parse(this.state.facesString)

    inputBoudingBox.forEach(item => {

      var bb = new BoundingBox();
      bb.setX(JSON.parse(item.x));
      bb.setY(JSON.parse(item.y));
      bb.setW(JSON.parse(item.w));
      bb.setH(JSON.parse(item.h));
      bbList.push(bb);

    })

    header.setFacesList(bbList)

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



  checkValid() {
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

    if (
      this.state.methodName === undefined ||
      this.state.methodName === "Select a method" ||
      this.state.methodName.length == 0
    )
      inputValid = false;

    if (this.state.imageData === undefined) inputValid = false;

    return inputValid;
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

  renderForm() {
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-md-6 col-lg-6">
            <SNETImageUpload imageDataFunc={this.getData} returnByteArray={true} />
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
          <div className="col-md-6 col-lg-6" style={{ marginTop: "5px", textAlign: "right" }}>
            <button
              type="button"
              className="btn btn-primary"
              onClick={this.submitAction}
              disabled={!this.state.inputValid}
            >
              Invoke
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  }

  renderComplete() {
    var identities = this.state.response.image_chunk.identitiesList.map((item, idx) => {
      return (
        <div key={idx}>
          <div className="row">
            <div className="col-md-12 col-lg-12">
              <h3>Raw vector</h3>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 col-lg-12">
              {/*  JSON.stringify(item.identity) */}
              <textarea rows="3" cols="60" readOnly value={JSON.stringify(item.identityList)} />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 col-lg-12">
              <h3>Badge</h3>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 col-lg-12">
              {/*  JSON.stringify(item.identity) */}
              <FaceIdentityBadge identity={item.identityList} sliderWidth={this.props.sliderWidth} />
            </div>
          </div>
        </div>
      );
    });
    return <React.Fragment>{identities}</React.Fragment>;
  }

  render() {
    if (this.props.isComplete) return <div>{this.renderComplete()}</div>;
    else {
      return <div>{this.renderForm()}</div>;
    }
  }
}
