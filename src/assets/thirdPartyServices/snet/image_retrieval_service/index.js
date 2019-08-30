import React from "react";
import { Grid } from "@material-ui/core";
import SNETImageUpload from "../../standardComponents/SNETImageUpload";
import { ImageGridViewer } from "../image-viewer-helpers/ImageGridViewer";

import MethodNamesDropDown from "../../common/MethodNamesDropDown";
import {SimilarImage} from "./image_retrival_pb_service"

const initialUserInput = {
  uploadedImage: null,
};


export default class ImageRetrievalService extends React.Component {
  constructor(props) {
    super(props);
    this.handleImageUpload = this.handleImageUpload.bind(this);
    this.handleServiceName = this.handleServiceName.bind(this);
    this.handleFormUpdate = this.handleFormUpdate.bind(this);
    this.handleSimilarityUpdate = this.handleSimilarityUpdate.bind(this);
    this.submitAction = this.submitAction.bind(this);

    this.state = {
      ...initialUserInput,
      users_guide: "",
      code_repo: "",
      reference: "",
      serviceName: "SimilarImage",
      methodName: "FindSimilar",
      uploadedImage: null,
      similarityMeasure: "CosineDistance",
      response: undefined,
    };

  }

  canBeInvoked() {
    // When the image isn't uploaded yet and when function name isn't yet given.
    return (
      this.state.methodName !== "Select a method" &&
      this.state.uploadedImage !== null &&
      this.state.similarityMeasure !== null
    );
  }

  handleFormUpdate(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleImageUpload(imageData) {
    this.setState({
      uploadedImage: imageData,
    });
  }

  handleServiceName(event) {
    let strService = event.target.value;
    this.setState({
      serviceName: strService,
    });
  }

  handleSimilarityUpdate(event) {
    let strService = event.target.value;
    this.setState({
      similarityMeasure: strService,
    });
  }

  renderSimilarityMeasures() {
    const similarityMeasures = ["CosineDistance", "EuclideanDistance"];
    return similarityMeasures.map((similarityMeasure, index) => {
      return <option key={index}>{similarityMeasure}</option>;
    });
  }

  submitAction() {
      const { methodName, uploadedImage, similarityMeasure } = this.state;
      const methodDescriptor = SimilarImage[methodName];
      const request = new methodDescriptor.requestType();
  
      request.setImage(uploadedImage);
      request.setSimilarity(similarityMeasure);
  
      const props = {
        request,
        onEnd: ({message}) => {
          this.setState({
            ...initialUserInput,
            response: { status: "success", imageOut1: message.getImageout1(), imageOut2: message.getImageout2(), imageOut3: message.getImageout3(), imageOut4: message.getImageout4(), imageOut5: message.getImageout5() },
          });
        },
      };
  
      this.props.serviceClient.unary(methodDescriptor, props);
  }

  renderForm() {
    const serviceNameOptions = ["Select a method", ...this.props.serviceClient.getMethodNames(SimilarImage)];

    return (
      <React.Fragment>
        <div className="row">
          <div className="col-md-3 col-lg-3" style={{ padding: "10px", fontSize: "13px", marginLeft: "10px" }}>
            Method Name:
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
            Similarity Measure:
          </div>
          <div className="col-md-3 col-lg-3">
            <select
              name="similarityMeasure"
              value={this.state.similarityMeasure}
              style={{ height: "30px", width: "250px", fontSize: "13px", marginBottom: "5px" }}
              onChange={this.handleSimilarityUpdate}
            >
              {this.renderSimilarityMeasures()}
            </select>
          </div>
        </div>
        <div className="row">
          <SNETImageUpload imageName={""} imageDataFunc={this.handleImageUpload} disableUrlTab={true} />
        </div>
        <div className="row" align="center">
          <button type="button" className="btn btn-primary" disabled={!this.canBeInvoked()} onClick={this.submitAction}>
            Call Image Retrieval Service
          </button>
        </div>
      </React.Fragment>
    );
  }

  parseResponse() {
    const { response } = this.state;
    if (typeof response !== "undefined") {
      if (typeof response === "string") {
        return response;
      }
      return response;
    }
  }

  renderComplete() {
    const response = this.parseResponse();
    let response_grid = [];
    // TODO but all the images in open images dataset are .jpg, so for the hack we can do the following
    // https://stackoverflow.com/questions/27886677/javascript-get-extension-from-base64-image
    response_grid.push({
      image: response.imageOut1,
      image_type: "jpg",
    });
    response_grid.push({
      image: response.imageOut2,
      image_type: "jpg",
    });
    response_grid.push({
      image: response.imageOut3,
      image_type: "jpg",
    });
    response_grid.push({
      image: response.imageOut4,
      image_type: "jpg",
    });
    response_grid.push({
      image: response.imageOut5,
      image_type: "jpg",
    });
    return (
      <Grid container>
        <Grid item xs={12}>
          <ImageGridViewer result={response_grid} />
        </Grid>
      </Grid>
    );
  }

  render() {
    if (this.props.isComplete) return <div>{this.renderComplete()}</div>;
    else {
      return <div>{this.renderForm()}</div>;
    }
  }
}
