import React from "react";
import Button from "@material-ui/core/Button";
import { Grid, IconButton, MuiThemeProvider, Tooltip } from "@material-ui/core";

import { MinecraftizingService } from "./MinecraftizingService_pb_service";
import RandomDropDown from "./DropDown";
import MethodNamesDropDown from "../../common/MethodNamesDropDown";
import SNETImageUpload from "../../standardComponents/SNETImageUpload";

// const outsideWrapper = {
//   width: "256px",
//   height: "256px",
//   margin: "0px 0px",
//   border: "0px",
// };
// const insideWrapper = {
//   width: "100%",
//   height: "100%",
//   position: "relative",
// };
const coveredImage = {
  width: "100%",
  height: "100%",
  position: "absolute",
  top: "0px",
  left: "0px",
};
// const coveringCanvas = {
//   width: "100%",
//   height: "100%",
//   position: "absolute",
//   top: "0px",
//   left: "0px",
// };

const initialUserInput = {
  methodName: "Select a method",
  model_name: "Select model",
  dataset: "Select dataset",
  input_image: undefined,
};

export default class MinecraftService extends React.Component {
  constructor(props) {
    super(props);
    this.submitAction = this.submitAction.bind(this);
    this.handleFormUpdate = this.handleFormUpdate.bind(this);
    this.getImageData = this.getImageData.bind(this);

    this.state = {
      ...initialUserInput,
      users_guide: "",
      code_repo: "",
      response: undefined,
    };
  }

  canBeInvoked() {
    return this.state.input_image && this.state.network_name !== "Select model" && this.state.dataset !== "Select dataset";
  }


  handleFormUpdate(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  submitAction() {
    const { methodName, model_name, dataset, input_image } = this.state;
    const methodDescriptor = MinecraftizingService[methodName];
    const request = new methodDescriptor.requestType();

    request.setNetworkName(model_name);
    request.setDataset(dataset);
    request.setInputImage(input_image);

    const props = {
      request,
      onEnd: ({ message }) => {
        this.setState({
          ...initialUserInput,
          response: { status: message.getStatus(), data: message.getOutput(), source: input_image},
        });
      },
    };

    this.props.serviceClient.unary(methodDescriptor, props);
  }

  getImageData(data)
  {
    this.setState({input_image: data})
  }

  renderForm() {
    const serviceNameOptions = ["Select a method", ...this.props.serviceClient.getMethodNames(MinecraftizingService)];
    const modelNames = ["Select model", "UGATIT", "cycle_gan"];
    const datasetNames = ["Select dataset", "minecraft_landscapes"];

    return (
      <React.Fragment>
        <div className="row">
          <div className="col-md-3 col-lg-3" style={{ padding: "10px", fontSize: "13px", marginLeft: "10px" }}>
            Method Name:{" "}
          </div>
          <div className="col-md-3 col-lg-3">
            <MethodNamesDropDown
                list={serviceNameOptions}
                value={this.state.methodName}
                onChange={this.handleFormUpdate}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-3 col-lg-3" style={{ padding: "10px", fontSize: "13px", marginLeft: "10px" }}>
            Detector Name:{" "}
          </div>
          <div className="col-md-3 col-lg-3">
            <RandomDropDown
                name={"model_name"}
                list={modelNames}
                value={this.state.model_name}
                onChange={this.handleFormUpdate}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-3 col-lg-3" style={{ padding: "10px", fontSize: "13px", marginLeft: "10px" }}>
            Detector Name:{" "}
          </div>
          <div className="col-md-3 col-lg-3">
            <RandomDropDown
                name={"dataset"}
                list={datasetNames}
                value={this.state.dataset}
                onChange={this.handleFormUpdate}
            />
          </div>
        </div>
        <div className="row" align="center">
          <SNETImageUpload imageName={""} imageDataFunc={this.getImageData} instantUrlFetch={true} allowURL={true} />
        </div>
        <div className="row">
          <div className="col-md-3 col-lg-3" style={{ padding: "10px", fontSize: "13px", marginLeft: "10px" }}>
            About:{" "}
          </div>
          <div className="col-xs-3 col-xs-2">
            <Button target="_blank" href={this.state.users_guide} style={{ fontSize: "13px", marginLeft: "10px" }}>
              Guide
            </Button>
          </div>
          <div className="col-xs-3 col-xs-2">
            <Button target="_blank" href={this.state.code_repo} style={{ fontSize: "13px", marginLeft: "10px" }}>
              Code
            </Button>
          </div>
          <div className="col-xs-3 col-xs-2">
            <Button target="_blank" href={this.state.reference} style={{ fontSize: "13px", marginLeft: "10px" }}>
              Reference
            </Button>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 col-lg-6" style={{ textAlign: "right" }}>
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
    const { response } = this.state;
    let img_base64 = "data:image/jpeg;base64," + response.data;
    let source_image = "data:image/jpeg;base64," + response.source;
    return (
        <div style={{ padding: "10px 0" }}>:
          <img style={{ maxWidth: "100%" }} src={source_image} alt={"Original image"} />
          <img style={{ maxWidth: "100%" }} src={img_base64} alt={"Minecraftizied image"} />
        </div>
    )
  }

  render() {
    if (this.props.isComplete) return <div>{this.renderComplete()}</div>;
    else {
      return <div>{this.renderForm()}</div>;
    }
  }
}
