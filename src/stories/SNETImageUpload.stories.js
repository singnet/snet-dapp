import React, { useState } from "react";
import { storiesOf } from "@storybook/react";
import SNETImageUpload from "../assets/thirdPartyServices/standardComponents/SNETImageUpload";

const setImagePath = data => data;

const WithReqdProps = props => <SNETImageUpload imageDataFunc={setImagePath} {...props} />;

const SNETOutputImage = props => {
  const [outputImage, setOutputImage] = useState();
  return <WithReqdProps imageDataFunc={data => setOutputImage(data)} outputImage={outputImage} {...props} />;
};

storiesOf("SNETImageUpload")
  .add("_default", () => <WithReqdProps />)
  .add("Disabled Upload Tab", () => <WithReqdProps disableUploadTab />)
  .add("Disabled URL", () => <WithReqdProps disableUrlTab />)
  .add("Disabled Reset Button", () => <WithReqdProps disableResetButton />)
  .add("Custom Image Tab Width", () => <WithReqdProps width="1000px" />)
  .add("Custom Image Tab height", () => <WithReqdProps tabHeight={1000} />)
  .add("Max Image Size(mb)", () => <WithReqdProps maxImageSize={1000000} />)
  .add("Max Image Width", () => <WithReqdProps maxImageWidth={10} />)
  .add("Max Image Height", () => <WithReqdProps maxImageHeight={10} />)
  .add("Display Proportional Image", () => <WithReqdProps maxImageHeight={100} />)
  .add("Output image", () => <SNETOutputImage outputImageName="Custom Output name" />)
  .add("Output Title", () => <SNETOutputImage outputImageName="Custom Output name" displayModeTitle="Custom Title" />)
  .add("Disable Input Tab", () => <SNETOutputImage outputImageName="Custom Output name" disableInputTab />)
  .add("Disable Output Tab", () => <SNETOutputImage outputImageName="Custom Output name" disableOutputTab />)
  .add("Disable Comparision Tab", () => <SNETOutputImage outputImageName="Custom Output name" disableComparisonTab />)
  .add("Disable download button", () => <SNETOutputImage outputImageName="Custom Output name" disableDownloadButton />)
  .add("Overlay Input Image", () => <SNETOutputImage outputImageName="Custom Output name" overlayInputImage />)
  .add("Custom Input Title", () => <SNETOutputImage outputImageName="Custom Output name" inputTabTitle="Custom" />)
  .add("Custom Output Title", () => <SNETOutputImage outputImageName="Custom Output name" outputTabTitle="Custom" />)
  .add("Custom Comparision Title", () => (
    <SNETOutputImage outputImageName="Custom Output name" comparisonTabTitle="Custom" />
  ));
