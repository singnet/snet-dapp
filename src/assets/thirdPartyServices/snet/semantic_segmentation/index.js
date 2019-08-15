import React from "react";
import SNETImageUpload from "../../standardComponents/SNETImageUpload";

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

export default class SemanticSegmentationService extends React.Component {
  constructor(props) {
    super(props);
    this.submitAction = this.submitAction.bind(this);
    this.handleFormUpdate = this.handleFormUpdate.bind(this);
    this.getData = this.getData.bind(this);
    this.canBeInvoked = this.canBeInvoked.bind(this);

    this.state = {
      serviceName: "SemanticSegmentation",
      methodName: "segment",
      imgsrc: undefined,
      imageData: undefined,
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

  getData(imageData, mimetype, format, fn) {
    this.setState({ imageData: imageData, mimetype: mimetype });
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
    this.props.callApiCallback(this.state.serviceName, this.state.methodName, {
      img: { content: this.state.imageData, mimetype: this.state.mimetype },
      visualise: true,
    });
  }

  renderForm() {
    return (
      <React.Fragment>
        <div className="row">
          <div style={{ fontSize: "14px", marginTop: "10px", marginBottom: "10px" }} className="col-md-12 col-lg-12">
            Please select image you'd like to be segmented:
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 col-lg-12">
            <SNETImageUpload imageDataFunc={this.getData} disableUrlTab={true} returnByteArray={true} />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 col-lg-12" style={{ textAlign: "right", marginTop: "10px", marginBottom: "10px" }}>
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
    const response = this.props.response;

    return (
      <React.Fragment>
        <div className="row">
          <div style={{ fontSize: "14px", marginTop: "10px", marginBottom: "10px" }} className="col-md-12 col-lg-12">
            Semantic Segmentation Result:
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 col-lg-12">
            <img
              width={this.props.sliderWidth}
              src={
                "data:image/png;base64," +
                btoa(
                  response.debug_img.content.reduce((data, byte) => {
                    return data + String.fromCharCode(byte);
                  }, "")
                )
              }
            />
          </div>
        </div>
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
