import React from "react";
import { storiesOf } from "@storybook/react";
import SNETImageUpload from "../assets/thirdPartyServices/standardComponents/SNETImageUpload";
import withLiveEditScope from "storybook-addon-react-live-edit/dist/withLiveEditScope";

const setImagePath = data => data;

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
  .addParameters({ props: { propTables: [SNETImageUpload] } })
  .addDecorator(withLiveEditScope({ React, SNETImageUpload, setImagePath, styleGallery }))
  .addLiveSource(
    "live source",
    `const galleryImagesSample = styleGallery; return <SNETImageUpload imageDataFunc={setImagePath} disableUploadTab />`
  );
