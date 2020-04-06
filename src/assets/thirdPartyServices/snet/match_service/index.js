import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import SvgIcon from "@material-ui/core/SvgIcon";
import InfoIcon from "@material-ui/icons/Info";

import OutlinedDropDown from "../../common/OutlinedDropdown";
import FileUploader from "../../common/FileUploader";
import SNETImageUpload from "../../standardComponents/SNETImageUpload";
import HoverIcon from "../../standardComponents/HoverIcon";

import { MatchApi } from "./MatchingAPI_pb_service";

let descriptors = [
  "ORB",
  "AKAZE",
  "KAZE",
  "BRISK",
  "BRIEF",
  "FREAK",
  "LUCID",
  "LATCH",
  "DAISY",
  "VGG",
  "BOOST",
  "PCT",
  "Superpoint",
];

const detectors = [
  "ORB",
  "KAZE",
  "AKAZE",
  "AGAST",
  "GFT",
  "MSER",
  "BRISK",
  "FAST",
  "BLOB",
  "STAR",
  "MSDS",
  "HLFD",
  "Superpoint",
  "Magicpoint",
];

const transforms = ["Affine", "Perspective", "Homography", "Shift", "ShiftRot", "ShiftScale", "Similarity"];

let descriptorNames = [];
descriptors.forEach((item, idx) => {
  descriptorNames.push({
    label: item,
    content: item,
    value: idx.toString(),
  });
});

let detectorNames = [];
detectors.forEach((item, idx) => {
  detectorNames.push({
    label: item,
    content: item,
    value: idx.toString(),
  });
});

let transformNames = [];
transforms.forEach((item, idx) => {
  transformNames.push({
    label: item,
    content: item,
    value: idx.toString(),
  });
});

const initialUserInput = {
  methodIndex: "0",
  methodNames: [
    {
      label: "getKP",
      content: "getKP",
      value: "0",
    },
    {
      label: "getMatchByImage",
      content: "getMatchByImage",
      value: "1",
    },
    {
      label: "getTransformParametersByImage",
      content: "getTransformParametersByImage",
      value: "2",
    },
    {
      label: "getClosestImages",
      content: "getClosestImages",
      value: "3",
    },
  ],
  descriptorIndex: "0",
  descriptorNames,
  detectorIndex: "0",
  detectorNames,
  transformIndex: "0",
  transformNames,
  image: "",
  second_image: "",
  filesContentList: [],
  selectedFiles: [],
  isValid: {
    selectedFiles: false,
  },
};

export default class MatchingService extends React.Component {
  constructor(props) {
    super(props);
    this.submitAction = this.submitAction.bind(this);
    this.handleFormUpdate = this.handleFormUpdate.bind(this);
    this.getImageData = this.getImageData.bind(this);
    this.getSecondImageData = this.getSecondImageData.bind(this);
    this.handleFileUpload = this.handleFileUpload.bind(this);
    this.setSelectedFiles = this.setSelectedFiles.bind(this);

    this.state = {
      ...initialUserInput,
      users_guide: "https://github.com/singnet/semantic-vision/blob/master/services/MatchingAPI/Readme_service.md",
      code_repo: "https://github.com/singnet/semantic-vision/tree/master/services/MatchingAPI",
      reference: "https://github.com/singnet/semantic-vision/blob/master/services/MatchingAPI",
      response: undefined,
    };
  }

  canBeInvoked() {
    const { methodIndex, image, second_image, filesContentList } = this.state;
    if (methodIndex === "0") return image;
    else if (methodIndex === "1") return image && second_image;
    else if (methodIndex === "2") return image && second_image;
    else if (methodIndex === "3") return image && filesContentList.length > 0;
    return false;
  }

  handleFormUpdate(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  submitAction() {
    const {
      methodIndex,
      methodNames,
      detectorIndex,
      detectorNames,
      descriptorIndex,
      descriptorNames,
      transformIndex,
      transformNames,
      image,
      second_image,
      filesContentList,
    } = this.state;

    const method_name = methodNames[methodIndex].content;
    const methodDescriptor = MatchApi[method_name];
    const request = new methodDescriptor.requestType();

    const detector_name = detectorNames[detectorIndex].content;
    const descriptor_name = descriptorNames[descriptorIndex].content;
    const transform_name = transformNames[transformIndex].content;

    if (methodIndex === "0") {
      request.setImage(image);
      request.setDetectorName(detector_name);
    } else if (methodIndex === "1") {
      request.setImageFirst(image);
      request.setImageSecond(second_image);
      request.setDetectorName(detector_name);
      request.setDescriptorName(descriptor_name);
    } else if (methodIndex === "2") {
      request.setImageFirst(image);
      request.setImageSecond(second_image);
      request.setDetectorName(detector_name);
      request.setDescriptorName(descriptor_name);
      request.setTransformType(transform_name);
    } else if (methodIndex === "3") {
      request.setInputImage(image);
      request.setDetectorName(detector_name);
      request.setDescriptorName(descriptor_name);
      for (var i = 0; i < filesContentList.length; i++) {
        request.addImageBase(filesContentList[i]);
      }
      request.setNumofimagestoretrieve(5);
      request.setNumofclusters(1000);
    }

    const props = {
      request,
      onEnd: ({ message }) => {
        this.setState({
          ...initialUserInput,
          response: { resultImage: message.getUiimage(), status: message.getStatus() },
        });
      },
    };

    this.props.serviceClient.unary(methodDescriptor, props);
  }

  getImageData(data) {
    this.setState({ image: data });
  }

  getSecondImageData(data) {
    this.setState({ second_image: data });
  }

  handleFileUpload(files) {
    this.setState({ filesContentList: [], selectedFiles: [] });
    let images = [];
    let fileList = [];
    for (let i = 0; i < files.length; i++) {
      let reader = new FileReader();
      reader.onloadend = () => {
        let content = reader.result.replace(/^data:(.*;base64,)?/, "");
        images.push(content);
        fileList.push(files[i]);
        if (images.length === files.length) this.setSelectedFiles(images, fileList);
      };
      reader.readAsDataURL(files[i]);
    }
  }

  setSelectedFiles(images, fileList) {
    this.setState({ filesContentList: images, selectedFiles: fileList });
  }

  setValidationStatus(key, valid) {
    this.state.isValid[key] = valid;
  }

  parseResponse() {
    const { response } = this.state;
    const { isComplete } = this.props;

    if (isComplete) {
      if (typeof response !== "undefined") {
        if (typeof response === "string") {
          return response;
        }
        return response.resultImage;
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  render() {
    const { methodIndex, methodNames } = this.state;
    const method_name = methodNames[methodIndex].content;

    return (
      <React.Fragment>
        <Grid container spacing={2} justify="center" alignItems="center">
          {!this.props.isComplete && (
            <Grid item xs={12} container justify="center" style={{ textAlign: "center" }}>
              <OutlinedDropDown
                id="method"
                name="methodIndex"
                label="Method"
                fullWidth={true}
                list={this.state.methodNames}
                value={this.state.methodIndex}
                onChange={this.handleFormUpdate}
              />
            </Grid>
          )}
          {!this.props.isComplete && (
            <Grid item xs={12} container justify="center" style={{ textAlign: "center" }}>
              <OutlinedDropDown
                id="detector"
                name="detectorIndex"
                label="Detector"
                fullWidth={true}
                list={this.state.detectorNames}
                value={this.state.detectorIndex}
                onChange={this.handleFormUpdate}
              />
            </Grid>
          )}

          {!this.props.isComplete && method_name !== "getKP" && (
            <Grid item xs={12} container justify="center" style={{ textAlign: "center" }}>
              <OutlinedDropDown
                id="descriptor"
                name="descriptorIndex"
                label="Descriptor"
                fullWidth={true}
                list={this.state.descriptorNames}
                value={this.state.descriptorIndex}
                onChange={this.handleFormUpdate}
              />
            </Grid>
          )}
          {!this.props.isComplete && method_name === "getMatchByImage" && (
            <Grid item xs={12} container justify="center" style={{ textAlign: "center" }}>
              <SNETImageUpload
                imageName=""
                imageDataFunc={this.getSecondImageData}
                instantUrlFetch={true}
                allowURL={true}
                width="100%"
              />
            </Grid>
          )}
          {!this.props.isComplete && method_name === "getTransformParametersByImage" && (
            <Grid item xs={12} container justify="center" style={{ textAlign: "center" }}>
              <Grid item xs={12}>
                <OutlinedDropDown
                  id="transform"
                  name="transformIndex"
                  label="Transform"
                  fullWidth={true}
                  list={this.state.transformNames}
                  value={this.state.transformIndex}
                  onChange={this.handleFormUpdate}
                />
              </Grid>
              <Grid item xs={12}>
                <SNETImageUpload
                  imageName=""
                  imageDataFunc={this.getSecondImageData}
                  instantUrlFetch={true}
                  allowURL={true}
                  width="100%"
                />
              </Grid>
            </Grid>
          )}
          {!this.props.isComplete && method_name === "getClosestImages" && (
            <Grid item xs={12} container justify="center" style={{ textAlign: "center" }}>
              Choose database (upload a folder with images):
              <FileUploader
                multiple={true}
                uploadedFiles={this.state.selectedFiles}
                handleFileUpload={this.handleFileUpload}
                setValidationStatus={valid => this.setValidationStatus("selectedFiles", valid)}
                fileAccept=".png, .jpg, .jpeg"
              />
              Note: Upload one image to retrieve Top-5 closest images from uploaded database.
            </Grid>
          )}

          <Grid item xs={12} container justify="center">
            <SNETImageUpload
              imageName=""
              imageDataFunc={this.getImageData}
              instantUrlFetch={true}
              allowURL={true}
              outputImage={this.parseResponse()}
              outputImageName="Output"
              width="100%"
            />
          </Grid>

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
            <Grid item xs={12} container justify="center">
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
