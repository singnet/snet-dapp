# SingularityNET Standard UI Components

This is the documentation for the official [Material UI](https://material-ui.com/) based standard components for SingularityNET services:

Summary:
- [Hover Icon](#hover-icon);
- [Image Upload Component](#image-upload-component);

___

## Hover Icon

> Maintainer: Ramon Durães | http://github.com/ramongduraes | ramon@singularitynet.io

### Functionality

This component is a wrapper for Material UI's icons that turns them into hyperlink buttons. They will change color and display an optional tooltip (`text`) when hovered upon and open the referenced URL (`href`) on another tab upon clicking. The suggested use is to wrap this component around an icon of choice and set its `href` and `text` properties. Other optional parameters are described and an example usage is given in the Parameters and Example Usage sections below, respectively.

### Parameters

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| href | string | - | The URL to which the user will be redirected upon clicking the button. |
| text | string | `null` | Tooltip text shown when the icon is focused. Will not render a Tooltip if not given. |
| textColor | string | "white" | Tooltip text color. |
| fontFamily | string | "Muli" | Tooltip text font family. |
| fontSize | number | "14" | Tooltip text font size. |
| onColor | string | blue[500] | Icon's active color (onHover). |
| offColor | string | grey[600] | Icon's inactive color. |

### Example Usage

Below are two example usages of the component, one using Material UI's custom SvgIcon and another using its standard Info icon.
 
```javascript
import React from 'react';
import HoverIcon from "./standardComponents/HoverIcon";
import SvgIcon from "@material-ui/core/SvgIcon";
import InfoIcon from "@material-ui/icons/Info";

export default class App extends Component {    
    render() {
        return (
            <div>
                <HoverIcon text="View code on Github" href="https://github.com/singnet/snet-dapp/blob/master/src/components/service/standardComponents/HoverIcon.js">
                    <SvgIcon>
                        <path // Github Icon
                            d="M12.007 0C6.12 0 1.1 4.27.157 10.08c-.944 5.813 2.468 11.45 8.054 13.312.19.064.397.033.555-.084.16-.117.25-.304.244-.5v-2.042c-3.33.735-4.037-1.56-4.037-1.56-.22-.726-.694-1.35-1.334-1.756-1.096-.75.074-.735.074-.735.773.103 1.454.557 1.846 1.23.694 1.21 2.23 1.638 3.45.96.056-.61.327-1.178.766-1.605-2.67-.3-5.462-1.335-5.462-6.002-.02-1.193.42-2.35 1.23-3.226-.327-1.015-.27-2.116.166-3.09 0 0 1.006-.33 3.3 1.23 1.966-.538 4.04-.538 6.003 0 2.295-1.5 3.3-1.23 3.3-1.23.445 1.006.49 2.144.12 3.18.81.877 1.25 2.033 1.23 3.226 0 4.607-2.805 5.627-5.476 5.927.578.583.88 1.386.825 2.206v3.29c-.005.2.092.393.26.507.164.115.377.14.565.063 5.568-1.88 8.956-7.514 8.007-13.313C22.892 4.267 17.884.007 12.008 0z"/>
                    </SvgIcon>
                </HoverIcon>
                <HoverIcon text="Material UI" href="https://material-ui.com/">
                    <InfoIcon/>
                </HoverIcon>
            </div>
        );
    }
}
```
___

## Image Upload Component

> Maintainer: Ramon Durães | http://github.com/ramongduraes | ramon@singularitynet.io

### General Functionality

#### Upload Mode

This component is composed of a tool bar (at the top) and a main tab below it. The top bar consists of:
 
- The image name (that can be set by "imageName" parameter);
- A tab chooser composed of:
    - Upload: a dropzone that allows the user to upload an image from their computer by clicking or dragging and dropping a file. Will display an error message if the user tries to drop a file that exceeds "maxImageSize", "maxImageWidth", "maxImageHeight" or an image type that is not listed under "allowedInputTypes";
    - URL: allows users to select images using their URL;
    - Gallery: an optional tab that can be used if the service provider would like to suggest example images. Will be rendered if the "imageGallery" parameter (a list of image URLs) is provided. 
- An optional info tip that will be rendered if the "infoTip" parameter is not empty. It is an "Info" icon that displays a tooltip with the specified string when hovered upon.
- A reset button that is rendered after the user uploads an image that allows them to choose another image.

The service provider may choose to any combination of the three main tabs (Upload, Url and Gallery) by combining the parameters `disableUploadTab`, `disableUrlTab` and `imageGallery`. 

After the user chooses an image file or its URL, a loading state will be displayed as a "CircularProgress" component in the center of the main tab while the image data is being downloaded or generated.

Once that is complete, the chosen image will be displayed on the main tab and the parent component will be provided its `base64` or `Uint8Array` encoded version via the provided function (`imageDataFunc`) parameter.

If the user types an invalid image URL or if the chosen image server blocks the request due to CORS policy, and error message is displayed at the bottom of the component. It can be dismissed by simply clicking away or waiting 5 seconds.

#### Display Mode

If the service returns an image, the `outputImage` parameter can be set to change the component to the "display mode", in which the top bar changes to:

- The `displayModeTitle` (default: "Result");
- A tab chooser composed of:
    - Input: displays the user-uploaded input image;
    - Output: displays the service output;
    - Comparison: overlays both images and lets the user drag a divider that crops the top image, showing parts of each side-by-side for comparison;
- A download button for the output image.

As in the "upload mode", the service provider may choose to disable any combination of these tabs and the download button through the respective parameters. Their names may also be changed.

### Parameters

#### Upload Mode

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| **imageDataFunc** | function, required |  - | Callback function! For specifications, read the [returns](#returns) section.|
| width | string | "400px" | Component width to be set in number of pixels or percentage width of parent div (e.g.: "500px", "60%"). Minimum: "400px". |
| tabHeight | number (no units) | 300 | Component's tab height (does not include top bar) to be set as a number (e.g.: 300). Minimum: 160. |
| imageName | string | "Input Image" | Image name that will be displayed on top of the component.|
| disableUploadTab | bool | false | If `true`, does not render *Upload* tab. |
| disableUrlTab | bool | false | If `true`, does not render *Url* tab. |
| disableResetButton | bool | false | If `true`, does not render the image reset button. Prevents user from re-uploading an image, use to display the input image after the service is complete.|
| returnByteArray | bool | `false` | If `true` returns Uint8Array encoded image data to `imageDataFunc()` instead of base64. |
| outputFormat | string | "image/png" | Sets the output format for images chosen via URL or Gallery modes. Accepts "image/png", "image/jpg" or "image/jpeg". |
| allowedInputTypes | string or array | ["image/png","image/jpeg", "image/jpg"] | Specifies allowed file types. Accepts a file type-string or an array of types (e.g.: "image/jpeg", \["image/jpg", "image/jpeg"]). Note: this parameter should allow the file type defined by `outputFormat` (which defaults to `image/png`) otherwise images chosen via URL / Gallery will be rejected (since they are converted to `outputFormat`).|
| maxImageSize | number | 10000000 | Maximum image file size in bytes. Default: 10mb. |
| maxImageWidth | number | `null` | Maximum image width in pixels. |
| maxImageHeight | number | `null`| Maximum image height in pixels. |
| displayProportionalImage | bool | `true` | Whether to keep uploaded image proportions when displaying it or to ajust to it to tab's height and width. |
| imageGallery | list | - | Optional list of image URLs that will be rendered in a Gallery tab. This should be used if the service provider would like to suggest images for the user. If this argument is empty, the Gallery tab will not be rendered. |
| instantUrlFetch | bool | `false` | If `true`, any string pasted or typed on the "URL" tab's TextField will instantly be treated as the complete image URL (i.e.: actual fetch happens "onChange" instead of when clicking the button). |
| allowURL | bool | `false` | Allows sending image URLs for "URL" and "Gallery" tabs. Mainly used to avoid CORS error. Note: setting this parameter to `true` bypasses all file size, height, width and type checks because it will simply render the chosen image and send its URL to the service. |
| galleryCols | number | 3 | Number of image columns to be displayed in gallery mode. |
| infoTip | string | "" | An optional string to provide a tip or explanation for the service user. If not empty, will render an "Info" icon in the top bar that will display a tooltip when hovered upon. |
| mainColor | object | blue | A material ui color object that will be the main color of the component.|

#### Display Mode

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| **outputImage** | string (base64) | - | The base64-encoded output image data. The component will listen to changes on this parameter in order to update to display mode. Headers for the `<img/>` tag should not be included as they're composed using the information on `outputImageMimeType`. |
| outputImageMimeType | string | "application/octet-stream" | The MIME type of the output image. It tells the component what's the output file format for proper rendering and download. If not specified, the component should be able to figure it out using the base64-encoded data for "image/png", "image/jpg" and "image/gif" types. For other image types, the default MIME type is "application/octet-stream" and images will be downloaded without an extension. |
| outputImageName | string | "service-output" | The name of the output image shown when the user hovers the mouse over it. Also the image file name when it's downloaded. |
| displayModeTitle | string | "Result" | Title shown at the top left of the component on display mode (equivalent to "imageName"). |
| disableInputTab | bool | false | If `true`, does not render *Input* tab. |
| disableOutputTab | bool | false | If `true`, does not render *Output* tab. |
| disableComparisonTab | bool | false | If `true`, does not render *Comparison* tab. |
| disableDownloadButton | bool | false | If `true`, does not render the output image download button. |
| overlayInputImage | bool | true | If `false`, renders the input and output images using their original height and width (proportionally) on the *Comparison* tab. If `true`, the output image will be rendered using the input image's dimensions, overlaying it. |
| inputTabTitle | string | "Input" | The title of the *Input* tab (which displays the input image). |
| outputTabTitle | string | "Output" | The title of the *Output* tab (which displays the output image). |
| comparisonTabTitle | string | "Comparison" | The title of the *Comparison* tab (which displays both images for comparison). |

### Returns

The component will return all the image data via its callback function `imageDataFunc`. It takes 4 arguments:

| Argument | Type | Description |
| --- | --- | --- |
| imageData | string (base64), Uint8Array or string(url) | The actual image data. Might be a `base64`, a `byteArray`-encoded image or an image `url`, depending on the parameters `returnByteArray` and `allowURL`. The base64 header (e.g.:"data:image/jpeg;base64,") is not included! |
| mimeType | string | The MIME type of the image. Will return the input MIME type for image uploads, the output MIME type (defined by `outputFormat`; default: "image/png") for images from the "URL" and "Gallery" tabs or `null` for image URLs (when `allowURL={true}`). E.g.: "image/jpeg".|
| encoding | string | The encoding for the image data: "base64", "byteArray" or "url", depending on the parameters `returnByteArray` and `allowURL`. |
| filename | string | Image file name. Note that the image extension in this field, when present, shouldn't be trusted due to internal image conversions (to `outputFormat`). Also note that the filename extracted from used-inputted base64 image urls (in the URL tab) will usually not make sense, but that does not affect the functioning of the component.|

### Example Usage


#### Upload Mode

This is an example of the most basic usage of the component. The only required parameter is "imageDataFunc" so that the parent component receives the encoded image data.
 
```javascript
import SNETImageUpload from "./standardComponents/SNETImageUpload";

export default class App extends Component {
    
    getData(imageData, mimeType, encoding, filename){
        console.log(imageData);
        console.log(mimeType);
        console.log(encoding);
        console.log(filename);
    }
    
    render() {
        return (
            <div>
                <SNETImageUpload imageDataFunc={this.getData} />
            </div>
        );
    }
}
```

For a service that takes only image URLs, for example, the service provider could set the parameters `disableUploadTab={true}` and `allowURL={true}`. That way the users could upload their images and see them rendered on the screen but the service would only receive its URL.

Taking only user uploaded, byte-array encoded image files would mean setting `disableUrlTab={true}` and `returnByteArray={true}`.

The "Gallery" tab will be rendered when the parameter `imageGallery` is a list of image URLs, e.g.:
```javascript
const imageGallery = [
    "http://cdn01.cdn.justjared.com/wp-content/uploads/headlines/2018/02/skyscraper-trailer-social.jpg",
    "https://static2.yan.vn/EYanNews/201807/the-tallest-building-in-vietnam-and-southeast-asia-is-almost-finished-e0926100.jpg",
    "https://raw.githubusercontent.com/dxyang/StyleTransfer/master/style_imgs/mosaic.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/1280px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg",
    "https://raw.githubusercontent.com/ShafeenTejani/fast-style-transfer/master/examples/dora-maar-picasso.jpg",
];
```
Make sure your suggested images are not blocked by CORS policy, otherwise their miniature will be shown but clicking on them will result in an error (unless `allowURL` is set to `true`).

#### Display Mode

To enable the "display mode", simply add the `outputImage` parameter to the component (i.e.: `<SNETImageUpload imageDataFunc={this.getData} outputImage={this.state.response.outputImageBase64}/>`). The component will update as soon as it becomes a [truthy](https://developer.mozilla.org/en-US/docs/Glossary/Truthy) value (i.e.: something other than null, undefined, "", ...).

If the output image cannot be properly rendered, an error message will be shown and nothing will be displayed. In case of possible errors, make sure to check that the value of `outputImage` is a proper base64-encoded image before using it.

### Known Issues

- Component's heights need more attention;

### Future Improvements

- Set minimum width according to what components will be rendered in the top tab

___