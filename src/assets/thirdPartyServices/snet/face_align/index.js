import React from "react";

import SNETImageUpload from "../../standardComponents/SNETImageUpload";
import { FaceAlignment } from "./face_alignment_pb_service";
import { FaceAlignmentHeader, ImageRGB } from "./face_alignment_pb";

export default class FaceAlignService extends React.Component {
  constructor(props) {
    super(props);
    this.submitAction = this.submitAction.bind(this);
    this.getData = this.getData.bind(this);

    this.state = {
      serviceName: "FaceAlignment",
      methodName: "AlignFace",
      imageData: undefined,
      imgsrc: undefined,
      facesString: '[{"x":10,"y":10,"w":100,"h":100}]',

      isComplete: false,
      response: undefined,
    };
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
    if (this.state.imageData !== prevState.imageData) this.setState({ inputValid: this.checkValid() });
  }

  handleChange(type, e) {
    this.setState({
      [type]: e.target.value,
    });
  }

  submitAction() {
    const methodDescriptor = FaceAlignment.AlignFace;
    const request = new methodDescriptor.requestType();

    const header = new FaceAlignmentHeader(JSON.parse(this.state.facesString)[0]);
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
        this.setState({ isComplete: true, response: { image_chunk: message.getImageChunkList() } });
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
    const { image_chunk } = this.state.response;

    const alignedFaceImgList = image_chunk.map((item, idx) => {
      // Of course this is how JS requires you to convert a uint8array to base64,
      // because everything in JS has to be 10x harder than other languages...
      return (
        <div key={idx} className="col-md-3 col-lg-3">
          <img src={"data:image/png;base64," + btoa(String.fromCharCode.apply(null, item.content))} />
        </div>
      );
    });
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-md-6 col-lg-6">
            <p>Aligned faces:</p>
          </div>
        </div>
        <div className="row">{alignedFaceImgList}</div>
      </React.Fragment>
    );
  }

  render() {
    if (this.props.isComplete) return <div>{this.renderComplete()}</div>;
    else {
      return <div>{this.renderForm()}</div>;
    }
  }
}
