import React, { useState } from "react";
import { storiesOf } from "@storybook/react";
import SNETImageUpload from "../assets/thirdPartyServices/standardComponents/SNETImageUpload";
import withPropsCombinations from "react-storybook-addon-props-combinations";
import { jsxDecorator } from "storybook-addon-jsx";
import withLiveEditScope from "storybook-addon-react-live-edit/dist/withLiveEditScope";

const setImagePath = data => data;

const WithReqdProps = props => <SNETImageUpload imageDataFunc={setImagePath} {...props} />;

const SNETOutputImage = props => {
  const [outputImage, setOutputImage] = useState();
  return <WithReqdProps imageDataFunc={data => setOutputImage(data)} outputImage={outputImage} {...props} />;
};

const styleGallery = [
  "https://raw.githubusercontent.com/dxyang/StyleTransfer/master/style_imgs/mosaic.jpg",
  "https://raw.githubusercontent.com/ShafeenTejani/fast-style-transfer/master/examples/dora-maar-picasso.jpg",
  "https://raw.githubusercontent.com/singnet/style-transfer-service/master/docs/assets/input/style/brushstrokes.jpg",
  "https://raw.githubusercontent.com/singnet/style-transfer-service/master/docs/assets/examples/impronte_d_artista_cropped.jpg",
  "https://raw.githubusercontent.com/singnet/style-transfer-service/master/docs/assets/examples/woman_with_hat_matisse_cropped.jpg",
  "https://raw.githubusercontent.com/singnet/style-transfer-service/master/docs/assets/examples/sketch_cropped.png",
  "https://raw.githubusercontent.com/singnet/style-transfer-service/master/docs/assets/examples/ashville_cropped.jpg",
  "https://raw.githubusercontent.com/singnet/style-transfer-service/master/docs/assets/examples/goeritz_cropped.jpg",
  "https://raw.githubusercontent.com/singnet/style-transfer-service/master/docs/assets/examples/en_campo_gris_cropped.jpg",
];

storiesOf("SNETImageUpload", module)
  .addParameters({
    props: {
      propTables: [SNETImageUpload],
    },
  })
  .addDecorator(jsxDecorator)
  .addDecorator(withLiveEditScope({ React, SNETImageUpload, setImagePath }))
  .addLiveSource("live source", `return <SNETImageUpload imageDataFunc={setImagePath} disableUploadTab />`)
  .add(
    "_default",
    withPropsCombinations(WithReqdProps, {
      disabledUrlTab: [false, true],
    })
  )

  .add("Disabled Upload Tab", () => <SNETImageUpload imageDataFunc={setImagePath} disableUploadTab />);
// .add("Disabled URL", () => <WithReqdProps disableUrlTab />)
// .add("Image Gallery", () => <WithReqdProps imageGallery={styleGallery} />)
// .add("Gallery Columns", () => <WithReqdProps imageGallery={styleGallery} galleryCols={5} />)
// .add("Disabled Reset Button", () => <WithReqdProps disableResetButton />)
// .add("Custom Image Tab Width", () => <WithReqdProps width="1000px" />)
// .add("Custom Image Tab height", () => <WithReqdProps tabHeight={1000} />)
// .add("Max Image Size(mb)", () => <WithReqdProps maxImageSize={1000000} />)
// .add("Max Image Width", () => <WithReqdProps maxImageWidth={10} />)
// .add("Max Image Height", () => <WithReqdProps maxImageHeight={10} />)
// .add("Display Proportional Image", () => <WithReqdProps maxImageHeight={100} />)
// .add("Output image", () => <SNETOutputImage outputImageName="Custom Output name" />)
// .add("Output Title", () => <SNETOutputImage outputImageName="Custom Output name" displayModeTitle="Custom Title" />)
// .add("Disable Input Tab", () => <SNETOutputImage outputImageName="Custom Output name" disableInputTab />)
// .add("Disable Output Tab", () => <SNETOutputImage outputImageName="Custom Output name" disableOutputTab />)
// .add("Disable Comparision Tab", () => <SNETOutputImage outputImageName="Custom Output name" disableComparisonTab />)
// .add("Disable download button", () => <SNETOutputImage outputImageName="Custom Output name" disableDownloadButton />)
// .add("Overlay Input Image", () => <SNETOutputImage outputImageName="Custom Output name" overlayInputImage />)
// .add("Custom Input Title", () => <SNETOutputImage outputImageName="Custom Output name" inputTabTitle="Custom" />)
// .add("Custom Output Title", () => <SNETOutputImage outputImageName="Custom Output name" outputTabTitle="Custom" />)
// .add("Custom Comparision Title", () => (
//   <SNETOutputImage outputImageName="Custom Output name" comparisonTabTitle="Custom" />
// ));
