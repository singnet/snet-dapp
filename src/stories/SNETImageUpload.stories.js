import React from "react";
import { storiesOf } from "@storybook/react";
import SNETImageUpload from "../assets/thirdPartyServices/standardComponents/SNETImageUpload";

let imagePath;

const setImagePath = data => {
  console.log("setImagePath", data);
  imagePath = data;
};

const WithReqdProps = props => <SNETImageUpload imageDataFunc={setImagePath} {...props} />;

storiesOf("SNETImageUpload")
  .add("_default", () => <WithReqdProps />)
  .add("Disabled Upload Tab", () => <WithReqdProps disableUploadTab />)
  .add("Disabled URL", () => <WithReqdProps disableUrlTab />)
  .add("Disabled Reset Button", () => <WithReqdProps disableResetButton />)
  .add("Custom Image Tab Width", () => <WithReqdProps width="1000px" />)
  .add("Custom Image Tab height", () => <WithReqdProps tabHeight={1000} />)
  .add("Max Image Size(mb)", () => <WithReqdProps maxImageSize={1000000} />)
  .add("Max Image Width", () => <WithReqdProps maxImageWidth={100} />)
  .add("Max Image Height", () => <WithReqdProps maxImageHeight={100} />)
  .add("Display Proportional Image", () => <WithReqdProps maxImageHeight={100} />)
  .add("Display Mode title", () => <WithReqdProps displayModeTitle="Hello" outputImage={JSON.stringify(imagePath)} />);

//   SNETImageUpload.propTypes = {
//     width: PropTypes.string, // e.g.: "500px", "50%" (of parent component width)
//     tabHeight: PropTypes.number, // a number without units
//     imageDataFunc: PropTypes.func.isRequired,
//     imageName: PropTypes.string,
//     disableUploadTab: PropTypes.bool, // If true disables upload tab
//     disableUrlTab: PropTypes.bool, // If true disables url tab
//     disableResetButton: PropTypes.bool, // If true disables image reset button
//     returnByteArray: PropTypes.bool, // whether to return base64 or byteArray image data
//     outputFormat: PropTypes.oneOf(["image/png", "image/jpg", "image/jpeg"]),
//     allowedInputTypes: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
//     maxImageSize: PropTypes.number, // 10 mb
//     maxImageWidth: PropTypes.number,
//     maxImageHeight: PropTypes.number,
//     displayProportionalImage: PropTypes.bool,
//     allowURL: PropTypes.bool,
//     instantUrlFetch: PropTypes.bool,
//     imageGallery: PropTypes.arrayOf(PropTypes.string),
//     galleryCols: PropTypes.number,
//     infoTip: PropTypes.string,
//     mainColor: PropTypes.object,

//     // Output mode props
//     displayModeTitle: PropTypes.string,
//     outputImage: PropTypes.string,
//     outputImageMimeType: PropTypes.oneOf([
//       "application/octet-stream",
//       "image/png",
//       "image/jpg",
//       "image/jpeg",
//       "image/gif",
//     ]),
//     outputImageName: PropTypes.string,
//     disableInputTab: PropTypes.bool,
//     disableOutputTab: PropTypes.bool,
//     disableComparisonTab: PropTypes.bool,
//     disableDownloadButton: PropTypes.bool,
//     overlayInputImage: PropTypes.bool,
//     inputTabTitle: PropTypes.string,
//     outputTabTitle: PropTypes.string,
//     comparisonTabTitle: PropTypes.string,
//   };
