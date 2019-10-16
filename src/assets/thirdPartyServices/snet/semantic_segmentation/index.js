import React from "react";
import SNETImageUpload from "../../standardComponents/SNETImageUpload";
import { SemanticSegmentation } from "./segmentation_pb_service";

import {Image} from "./segmentation_pb"

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
  methodName: "segment",
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
      users_guide: "",
      code_repo: "",
      reference: "",
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
    const { methodName, imageData, mimetype, visualise, model } = this.state;
    const methodDescriptor = SemanticSegmentation[methodName];
    const request = new methodDescriptor.requestType();

    // Setting the Proto Message Img
    var imgProto = new Image();
    imgProto.setMimetype(mimetype);
    imgProto.setContent(imageData);

    request.setVisualise(visualise)
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
    const {response} = this.state;

    return (
            
<div style={{background:"#F8F8F8", padding: "24px"}}>
    <h4> Results</h4>
    <div style={{ padding: "10px 0",fontSize: "14px",color:"#9b9b9b" }}>Semantic Segmentation Result:
        <div style={{color:"#212121", marginTop:"5px",padding:"10px", background:"#f1f1f1",borderRadius:"4px"}}>
          <React.Fragment>
            <div className="row">
              <div className="col-md-12 col-lg-12">
                <img
                  width={this.props.sliderWidth}
                  src={
                    "data:image/png;base64," +
                    btoa(
                      response.debug_img.getContent().reduce((data, byte) => {
                        return data + String.fromCharCode(byte);
                      }, "")
                    )
                  }
                />
              </div>
            </div>
          </React.Fragment>
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
