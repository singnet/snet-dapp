/*============================================
Author: Ramon Duraes
Email: ramon@singularitynet.io
Github: https://github.com/ramongduraes
Date: 02 February 2019
==============================================*/

import React from "react";
import PropTypes from "prop-types";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";

import IconButton from "@material-ui/core/IconButton";
import RefreshIcon from "@material-ui/icons/Refresh";
import InfoIcon from "@material-ui/icons/Info";
import ErrorIcon from "@material-ui/icons/Error";
import { CloudUpload } from "@material-ui/icons";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import UnfoldMoreIcon from "@material-ui/icons/UnfoldMore";

import CircularProgress from "@material-ui/core/CircularProgress";

import Fade from "@material-ui/core/Fade";
import Grow from "@material-ui/core/Grow";
import Slide from "@material-ui/core/Slide";

import { grey, red, blue } from "@material-ui/core/colors";

import SwipeableViews from "react-swipeable-views";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import { Tooltip } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

import FileDrop from "react-file-drop";

import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";

import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar"; // for image uploaded state

import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

// Color Palette
const snetGreyError = grey[700];
const snetGrey = grey[500];
const dropzoneBackgroundGrey = grey[200];
const snetBackgroundGrey = grey[100];
const snetRed = red[500];
const snetBackgroundRed = red[100];

// Definitions
const spacingUnit = 8;
const snetFont = "Muli";
const minimumWidth = "400px";
const minimumTabHeight = 160;

export default class SNETImageUpload extends React.Component {
  static getBase64ImageType(base64img) {
    // Extracts base64-encoded image's mime type
    let mimeType;

    if (base64img.charAt(0) === "/") {
      mimeType = "image/jpeg";
    } else if (base64img.charAt(0) === "R") {
      mimeType = "image/gif";
    } else if (base64img.charAt(0) === "i") {
      mimeType = "image/png";
    } else {
      mimeType = "application/octet-stream";
    }

    return mimeType;
  }

  static addBase64Header(mimeType, rawBase64) {
    //Adds headers to raw base64 encoded images so they can be displayed in an img tag
    return "data:" + mimeType + ";base64," + rawBase64;
  }

  static prepareBase64Image(base64img) {
    // Extracts image type and adds headers
    let mimeType = SNETImageUpload.getBase64ImageType(base64img);
    return SNETImageUpload.addBase64Header(mimeType, base64img);
  }

  constructor(props) {
    super(props);
    // It is the same thing, only difference is Component where we do the binding.
    // Component is lower in the tree, and now button has the logic how to open the screen.

    // Setting minimum tab height
    this.tabHeight = Math.max(minimumTabHeight, this.props.tabHeight);
    this.dropzoneHeightOffset = 14;

    this.state = {
      // Component's flow of execution
      mainState: this.props.outputImage ? "display" : "initial", // initial, loading, uploaded, display
      value: this.props.outputImage
        ? this.props.disableOutputTab
          ? this.props.disableComparisonTab
            ? 3
            : 5
          : 4
        : this.props.disableUploadTab // Logic for defining the initial tab depending on which are available
        ? this.props.disableUploadTab + this.props.disableUrlTab
        : 0,
      searchText: null,
      errorMessage: null,
      displayError: false,
      displayImageName: false,
      // Selected image data (sent via callback function)
      inputImageData: null, // encoded image data. NOT ALWAYS THE SAME DATA SENT VIA CALLBACK
      mimeType: null, // "jpeg", "png", etc
      encoding: null, // "byteArray", "base64", "url"
      filename: null, // image filename
      // Image data readers
      base64Reader: undefined,
      byteReader: undefined,

      // Output display mode
      imageXPosition: undefined, // arbitrary, will be set properly
      dividerXPosition: this.props.width / 2,
      displayModeTitle: this.props.displayModeTitle,
      outputImage: this.props.outputImage && SNETImageUpload.prepareBase64Image(this.props.outputImage),
      outputImageName: this.props.outputImageName,
    };

    this.tabStyle = {
      position: "relative",
      overflow: "hidden",
      height: this.tabHeight + "px",
    };

    this.tabLabelStyle = {
      fontFamily: snetFont,
      fontVariantCaps: "normal",
      textTransform: "initial",
      fontSize: 14,
    };

    // Color Palette
    this.mainColor = this.props.mainColor[500];
    this.theme = createMuiTheme({
      palette: {
        primary: this.props.mainColor,
        error: red,
      },
      typography: { useNextVariants: true },
    });

    // Error Messages
    this.urlErrorMessage = "Incorrect URL or permission denied by server.";
    this.fileSizeError = "File size exceeds limits (" + this.props.maxImageSize / 1000000 + "mb).";
    this.fileTypeError = "File type not accepted. Allowed: " + this.props.allowedInputTypes + ".";
    this.inputImageErrorMessage = "Content image could not be rendered.";
    this.outputImageErrorMessage = "Output image could not be rendered.";

    // Refs
    this.imageDiv = React.createRef();
    this.inputImage = React.createRef();
    this.outputImage = React.createRef();

    // Function binding
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    this.handleTabChange = this.handleTabChange.bind(this);
    this.sendData = this.sendData.bind(this);
    this.setInputImageDimensions = this.setInputImageDimensions.bind(this);
    this.setInitialImageXPosition = this.setInitialImageXPosition.bind(this);
    this.setLoadingState = this.setLoadingState.bind(this);
    this.verifyAndUpload = this.verifyAndUpload.bind(this);
    this.toDataUrl = this.toDataUrl.bind(this);
    this.searchTextUpdate = this.searchTextUpdate.bind(this);
    this.displayErrorMessage = this.displayErrorMessage.bind(this);
    this.setUploadedState = this.setUploadedState.bind(this);
  }

  // When props.outputImage changes, the component changes to the display mode.
  componentWillReceiveProps(nextProps, nextContent) {
    let mimeType;

    //"data:" + this.state.outputImageMimeType + ";base64," +
    if (nextProps.outputImage) {
      if (nextProps.outputImage !== this.props.outputImage) {
        if (nextProps.outputImageMimeType === undefined) {
          mimeType = SNETImageUpload.getBase64ImageType(nextProps.outputImage);
        } else {
          mimeType = nextProps.outputImageMimeType;
        }

        this.setState({
          displayModeTitle: nextProps.displayModeTitle,
          outputImage: SNETImageUpload.addBase64Header(mimeType, nextProps.outputImage),
          outputImageMimeType: mimeType,
          outputImageName: nextProps.outputImageName,
          mainState: "display",
          value: nextProps.disableOutputTab ? (nextProps.disableComparisonTab ? 3 : 5) : 4,
        });
      }
    } else {
      // Resets component if outputImage is empty again
      if (this.props.outputImage) {
        this.setState(
          {
            // Component's flow of execution
            mainState: "initial", // initial, loading, uploaded, display
            value: this.props.disableUploadTab // Logic for defining the initial tab depending on which are available
              ? this.props.disableUploadTab + this.props.disableUrlTab
              : 0,
            searchText: null,
            errorMessage: null,
            displayError: false,
            displayImageName: false,
            // Selected image data (sent via callback function)
            inputImageData: null, // encoded image data. NOT ALWAYS THE SAME DATA SENT VIA CALLBACK
            mimeType: null, // "jpeg", "png", etc
            encoding: null, // "byteArray", "base64", "url"
            filename: null, // image filename
            // Image data readers
            base64Reader: undefined,
            byteReader: undefined,
            // Output display mode
            imageXPosition: undefined, // arbitrary, will be set properly
            dividerXPosition: this.props.width / 2,
            displayModeTitle: this.props.displayModeTitle,
            outputImage: this.props.outputImage,
            outputImageName: this.props.outputImageName,
          },
          () => this.sendData(this.state.inputImageData)
        );
      }
    }

    // Resets the component if disableResetButton is false:
    this.props.disableResetButton &&
      !nextProps.disableResetButton &&
      this.setState(
        {
          // Component's flow of execution
          mainState: "initial", // initial, loading, uploaded, display
          value: this.props.disableUploadTab // Logic for defining the initial tab depending on which are available
            ? this.props.disableUploadTab + this.props.disableUrlTab
            : 0,
          searchText: null,
          errorMessage: null,
          displayError: false,
          displayImageName: false,
          // Selected image data (sent via callback function)
          inputImageData: null, // encoded image data. NOT ALWAYS THE SAME DATA SENT VIA CALLBACK
          mimeType: null, // "jpeg", "png", etc
          encoding: null, // "byteArray", "base64", "url"
          filename: null, // image filename
          // Image data readers
          base64Reader: undefined,
          byteReader: undefined,

          // Output display mode
          imageXPosition: undefined, // arbitrary, will be set properly
          dividerXPosition: this.props.width / 2,
          displayModeTitle: this.props.displayModeTitle,
          outputImage: this.props.outputImage,
          outputImageName: this.props.outputImageName,
        },
        () => this.sendData(this.state.inputImageData)
      );
  }

  setLoadingState() {
    this.setState({
      mainState: "loading",
    });
  }

  sendData(
    data = this.state.inputImageData,
    mimeType = this.state.mimeType,
    encoding = this.state.encoding,
    filename = this.state.filename
  ) {
    this.props.imageDataFunc(data, mimeType, encoding, filename);
    console.log(
      "Sent: \nMIME type: " + mimeType + "\nEncoding: " + encoding + "\nFilename: " + filename + "\nImage data: " + data
    );
  }

  setUploadedState(imageData, sendData, encoding, mimeType, filename) {
    // If the image follows the specifications, sets state to uploaded
    this.setState(
      {
        mainState: "uploaded", // initial, loading, uploaded
        searchText: null,
        inputImageData: imageData,
        mimeType: mimeType,
        encoding: encoding,
        filename: filename,
        displayError: false,
        errorMessage: null,
      },
      () => {
        this.sendData(sendData);
      }
    );
  }

  verifyAndUpload(imageData, sendData, encoding, mimeType, filename) {
    // imageData: base64 encoded image
    // sendData: might be base64, bytes or url
    // Verifies image data against allowed types, max size, width and height and uploads the image if its within the
    // specifications.

    if (encoding === "url") {
      this.setUploadedState(imageData, sendData, encoding, mimeType, filename);
    } else {
      // Checks file size
      const byteLength = imageData.replace(/=/g, "").length * 0.75;
      if (byteLength > this.props.maxImageSize) {
        this.displayErrorMessage(this.fileSizeError);
        return;
      }

      // Checks file type
      if (this.props.allowedInputTypes.includes("image/*")) {
        // if we accept all image types
        if (mimeType.indexOf("image") === -1) {
          // if received file is not an image
          this.displayErrorMessage(this.fileTypeError + "Got: " + mimeType + ".");
          return;
        }
      } else {
        // verifies input type against each allowed input type
        if (!this.props.allowedInputTypes.includes(mimeType)) {
          this.displayErrorMessage(this.fileTypeError + "Got: " + mimeType + ".");
          return;
        }
      }

      // Checks image dimensions if they have been defined
      if (this.props.maxImageHeight || this.props.maxImageWidth) {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.setUploadedState = this.setUploadedState;
        img.displayErrorMessage = this.displayErrorMessage;
        img.imageData = imageData;
        img.sendData = sendData;
        img.encoding = encoding;
        img.mimeType = mimeType;
        img.filename = filename;
        img.maxImageWidth = this.props.maxImageWidth;
        img.maxImageHeight = this.props.maxImageHeight;
        img.onload = function() {
          if (this.maxImageHeight) {
            if (this.naturalHeight > this.maxImageHeight) {
              this.displayErrorMessage(
                "Maximum image height (" + this.maxImageHeight + "px) exceeded.  Got: " + this.naturalHeight + "px."
              );
              return;
            }
          }
          if (this.maxImageWidth) {
            if (this.naturalWidth > this.maxImageWidth) {
              this.displayErrorMessage(
                "Maximum image width (" + this.maxImageWidth + "px) exceeded.  Got: " + this.naturalWidth + "px."
              );
              return;
            }
          }
          this.setUploadedState(this.imageData, this.sendData, this.encoding, this.mimeType, this.filename);
        };
        img.src = imageData;
      } else {
        // Goes to uploaded state.
        this.setUploadedState(imageData, sendData, encoding, mimeType, filename);
      }
    }
  }

  displayErrorMessage(errorMessage, state = "initial") {
    this.setState({
      mainState: state,
      searchText: null,
      inputImageData: null,
      mimeType: null,
      encoding: null,
      filename: null,
      errorMessage: errorMessage,
      displayError: true,
    });
  }

  /* ----------------
       - IMAGE UPLOAD -
    *  ----------------*/

  byteReaderOnLoadEnd(file) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function() {
      this.verifyAndUpload(
        reader.result,
        new Uint8Array(this.state.byteReader.result),
        "byteArray",
        file.type,
        file.name
      );
    }.bind(this);
  }

  handleImageUpload(files, event) {
    event.preventDefault();
    event.stopPropagation();
    this.setLoadingState();

    const file = files[0];

    // Is always used
    let reader = new FileReader();
    reader.onloadend = function() {
      this.setState(
        {
          base64Reader: reader,
        },
        () => {
          this.verifyAndUpload(
            this.state.base64Reader.result,
            this.state.base64Reader.result.split(",")[1],
            "base64",
            file.type,
            file.name
          );
        }
      );
    }.bind(this);

    let byteReader = new FileReader();
    byteReader.onloadend = function() {
      this.setState({
        byteReader: byteReader,
      });
      this.byteReaderOnLoadEnd(file);
    }.bind(this);

    if (this.props.returnByteArray) {
      byteReader.readAsArrayBuffer(file);
    } else {
      reader.readAsDataURL(file);
    }
  }

  renderUploadTab() {
    return (
      <Grid item xs={12}>
        <FileDrop onDrop={(files, event) => this.handleImageUpload(files, event)}>
          <input
            id="myInput"
            type="file"
            style={{ display: "none" }}
            accept={this.props.allowedInputTypes}
            onChange={e => this.handleImageUpload(e.target.files, e)}
            ref={input => (this.inputElement = input)}
          />
          <div
            onClick={() => this.inputElement.click()}
            style={{
              borderWidth: 1,
              borderColor: '#d6d6d6',
              borderStyle: "dashed",
              borderRadius: 4,
              cursor: "pointer",
              overflow: "hidden",
              height: this.tabHeight - this.dropzoneHeightOffset + 10 + "px",
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
              style={{
                flexGrow: 1,
                height: this.tabHeight + "px",
              }}
              spacing={spacingUnit}
            >
              <Grid item style={{ padding: '0 40px'}}>
                <CloudUpload style={{ fontSize: 48, color: this.mainColor }} />
              </Grid>
              <Grid item style={{ padding: '0 40px'}}>
                <Typography
                  style={{
                    fontFamily: snetFont,
                    fontVariantCaps: "normal",
                    textTransform: "initial",
                    fontSize: 16,
                    color: snetGrey,
                  }}
                >
                  Drag and drop image here or
                  <span style={{ color: this.mainColor }}> click</span>
                </Typography>
              </Grid>
              <Grid item style={{ padding: '20px 40px'}}>
                <Typography
                  style={{
                    width: '58%',
                    margin: '0 auto',
                    fontFamily: snetFont,
                    fontVariantCaps: "normal",
                    textTransform: "initial",
                    fontSize: 12,
                    color: '#9b9b9b',
                    textAlign: "center",
                    padding: spacingUnit,
                  }}
                >
                  (Image must be under {this.props.maxImageSize / 1000000}mb. Source images are not saved on
                  the servers after the job is processed.)
                </Typography>
              </Grid>
            </Grid>
          </div>
        </FileDrop>
      </Grid>
    );
  }

  /* --------------------
       - URL IMAGE SEARCH -
    *  --------------------*/

  toDataUrl(src, outputFormat) {
    const filename = src.substring(src.lastIndexOf("/") + 1);
    const img = new Image();
    const callback = this.verifyAndUpload;
    let dataURL;

    // Only triggered if returnByteArray === true
    let byteReader = new FileReader();
    byteReader.onloadend = function() {
      this.setState({ byteReader: byteReader });
      this.verifyAndUpload(
        dataURL,
        new Uint8Array(this.state.byteReader.result),
        "byteArray",
        this.props.outputFormat,
        filename
      );
    }.bind(this);

    img.crossOrigin = "anonymous";
    img.onerror = function() {
      this.displayErrorMessage(this.urlErrorMessage);
    }.bind(this);

    if (this.props.returnByteArray) {
      img.outputFormat = this.props.outputFormat; // intentionally added prop to img tag to access it later
      img.onload = function() {
        const canvas = document.createElement("canvas"),
          context = canvas.getContext("2d");

        canvas.height = this.naturalHeight;
        canvas.width = this.naturalWidth;
        context.drawImage(this, 0, 0);
        dataURL = canvas.toDataURL(this.outputFormat);
        canvas.toBlob(blob => {
          byteReader.readAsArrayBuffer(blob);
        }, this.outputFormat);
      };
    } else {
      img.onload = function() {
        const canvas = document.createElement("canvas"),
          context = canvas.getContext("2d");
        let dataURL;
        canvas.height = this.naturalHeight;
        canvas.width = this.naturalWidth;
        context.drawImage(this, 0, 0);
        dataURL = canvas.toDataURL(this.outputFormat);
        callback(dataURL, dataURL.split(",")[1], "base64", this.outputFormat, filename);
      };
    }
    img.src = src;
  }

  searchTextUpdate(event) {
    this.setState(
      {
        searchText: event.target.value,
      },
      this.props.instantUrlFetch ? this.handleSearchSubmit : null
    );
  }

  handleSearchSubmit(image = null) {
    this.setLoadingState();

    let url;
    if (image) {
      // Gallery mode
      url = image.url;
    } else {
      // URL mode
      if (this.state.searchText !== null) {
        url = this.state.searchText;
      } else {
        return;
      }
    }
    // Directly sends data URL if allowed. Else, tries to convert image to base64
    this.props.allowURL
      ? this.verifyAndUpload(url, url, "url", null, url.substring(url.lastIndexOf("/") + 1))
      : this.toDataUrl(url, this.props.outputFormat);
  }

  renderUrlTab() {
    return (
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        style={{
          height: this.tabHeight + "px",
          borderWidth: 1,
          borderColor: '#d6d6d6',
          borderStyle: "dashed",
          borderRadius: 4,
          cursor: "pointer",
          overflow: "hidden",
        }}
      >
        <Grid
          item
          xs={12}
          style={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <MuiThemeProvider theme={this.theme}>
            <TextField
              style={{
                width: "80%",
                primary: this.mainColor,
                textAlign: "left",
              }}
              variant="outlined"
              type="text"
              label={<span style={{ fontWeight: "normal", fontSize: 12 }}>Image URL</span>}
              onChange={this.searchTextUpdate}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      style={{
                        marginRight: 0,
                        padding: 0,
                        color: this.mainColor,
                      }}
                      onClick={this.state.searchText !== null ? () => this.handleSearchSubmit(null) : undefined}
                    >
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </MuiThemeProvider>
        </Grid>
      </Grid>
    );
  }

  /* -----------------
       - IMAGE GALLERY -
    *  -----------------*/

  renderGalleryTab() {
    return (
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
          overflow: "hidden",
        }}
      >
        <GridList
          cols={this.props.galleryCols}
          spacing={spacingUnit}
          style={{
            width: "100%",
            height: this.tabHeight + "px",
          }}
        >
          {this.props.imageGallery.map((url, i) => (
            <Grow in={this.state.value === 2} style={{ transformOrigin: "0 0 0" }} timeout={i * 500} key={i}>
              <GridListTile key={i}>
                <img src={url} alt={"Gallery Image " + i} onClick={() => this.handleSearchSubmit({ url })} />
              </GridListTile>
            </Grow>
          ))}
        </GridList>
      </div>
    );
  }

  /* -----------------
       - LOADING STATE -
    *  -----------------*/

  renderLoadingState() {
    return (
      <div style={this.tabStyle}>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          style={{
            flexGrow: 1,
            height: this.tabHeight + "px",
          }}
        >
          <Grid
            item
            xs={12}
            style={{
              flexGrow: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Fade in={this.state.mainState === "loading"} unmountOnExit>
              <CircularProgress
                style={{
                  color: this.mainColor,
                  margin: 10,
                }}
              />
            </Fade>
          </Grid>
        </Grid>
      </div>
    );
  }

  /* ------------------
       - UPLOADED STATE -
    *  ------------------*/

  handleImageReset() {
    this.setState(
      {
        mainState: "initial", // initial, search, gallery, loading, uploaded, error
        searchText: null,
        inputImageData: null,
        mimeType: null,
        encoding: null,
        filename: null,
        displayError: false,
        errorMessage: null,
        displayImageName: false,
      },
      () => this.sendData(this.state.inputImageData)
    );
  }

  renderUploadedState() {
    return (
      <Fade in={this.state.mainState === "uploaded"}>
        <div
          style={{
            position: "relative",
            overflow: "hidden",
            padding: spacingUnit,
            height: this.tabHeight + "px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
          }}
          onMouseOver={() => this.setState({ displayImageName: true })}
          onMouseLeave={() => this.setState({ displayImageName: false })}
        >
          <img
            alt="Service input"
            src={this.state.inputImageData}
            onError={() => this.displayErrorMessage(this.urlErrorMessage)}
            id="loadedImage"
            // crossOrigin="anonymous"
            style={
              this.props.displayProportionalImage
                ? {
                    maxHeight: this.tabHeight + "px",
                    maxWidth: "100%",
                  }
                : {
                    height: this.tabHeight + "px",
                    width: "100%",
                  }
            }
          />
          <Fade in={this.state.displayImageName}>
            <GridListTileBar
              title={
                <Typography
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    fontFamily: snetFont,
                    fontVariantCaps: "normal",
                    textTransform: "initial",
                    color: snetBackgroundGrey,
                    fontSize: 14,
                  }}
                >
                  {" "}
                  {this.state.filename}{" "}
                </Typography>
              }
            />
          </Fade>
        </div>
      </Fade>
    );
  }

  /* -----------------
       - INITIAL STATE -
    *  -----------------*/

  handleTabChange(event, value) {
    this.setState({
      value: value,
    });
  }

  renderTabs() {
    return (
      <div style={this.tabStyle}>
        <SwipeableViews axis="x" index={this.state.value}>
          <div>{this.renderUploadTab()}</div>
          <div>{this.renderUrlTab()}</div>
          <div>{this.renderGalleryTab()}</div>
          <div>{this.state.mainState === "display" && !this.props.disableInputTab && this.renderInputImage()}</div>
          <div>{this.state.mainState === "display" && !this.props.disableOutputTab && this.renderOutputImage()}</div>
          <div>{this.state.mainState === "display" && !this.props.disableComparisonTab && this.renderComparison()}</div>
        </SwipeableViews>
        <ClickAwayListener onClickAway={() => this.setState({ displayError: false })}>
          <Snackbar
            style={{
              position: "absolute",
              width: "100%",
            }}
            open={this.state.displayError}
            autoHideDuration={5000}
            TransitionComponent={Slide}
            transitionDuration={300}
            onClose={() => this.setState({ displayError: false })}
          >
            <SnackbarContent
              style={{
                backgroundColor: snetBackgroundRed,
                margin: "2px",
                border: "2px solid",
                borderColor: snetRed,
                borderRadius: "4px",
                padding: "2px",
                display: "flex",
                justifyContent: "space-around",
                flexGrow: 1,
                width: "100%",
              }}
              aria-describedby="client-snackbar"
              message={
                <span
                  style={{
                    color: snetGreyError,
                    display: "flex",
                    alignItems: "center",
                    align: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <ErrorIcon
                    style={{
                      fontSize: 16,
                      opacity: 0.9,
                      marginRight: spacingUnit,
                    }}
                  />
                  <Typography
                    style={{
                      fontFamily: snetFont,
                      fontVariantCaps: "normal",
                      textTransform: "initial",
                      color: snetGrey,
                      fontSize: 14,
                    }}
                  >
                    {this.state.errorMessage}
                  </Typography>
                </span>
              }
            />
          </Snackbar>
        </ClickAwayListener>
      </div>
    );
  }

  /* -----------------
       - DISPLAY STATE -
    *  -----------------*/

  renderInputImage() {
    return (
      <Fade in={this.state.mainState === "display"}>
        <div
          style={{
            position: "relative",
            overflow: "hidden",
            padding: spacingUnit,
            height: this.tabHeight + "px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
          }}
          onMouseOver={() => this.setState({ displayImageName: true })}
          onMouseLeave={() => this.setState({ displayImageName: false })}
        >
          <img
            alt="Service input"
            src={this.state.inputImageData}
            onError={() => this.displayErrorMessage(this.inputImageErrorMessage, "display")}
            id="loadedImage"
            // crossOrigin="anonymous"
            style={
              this.props.displayProportionalImage
                ? {
                    maxHeight: this.tabHeight + "px",
                    maxWidth: "100%",
                  }
                : {
                    height: this.tabHeight + "px",
                    width: "100%",
                  }
            }
          />
          <Fade in={this.state.displayImageName}>
            <GridListTileBar
              style={{}}
              title={
                <Typography
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignText: "center",
                    fontFamily: snetFont,
                    fontVariantCaps: "normal",
                    textTransform: "initial",
                    color: snetBackgroundGrey,
                    fontSize: 14,
                  }}
                >
                  {" "}
                  {this.state.filename}{" "}
                </Typography>
              }
            />
          </Fade>
        </div>
      </Fade>
    );
  }

  renderOutputImage() {
    return (
      <Fade in={this.state.mainState === "display"}>
        <div
          style={{
            position: "relative",
            overflow: "hidden",
            padding: spacingUnit,
            height: this.tabHeight + "px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
          }}
          onMouseOver={() => this.setState({ displayImageName: true })}
          onMouseLeave={() => this.setState({ displayImageName: false })}
        >
          <img
            alt="Service output"
            src={this.state.outputImage}
            onError={() => this.displayErrorMessage(this.outputImageErrorMessage, "display")}
            id="loadedImage"
            // crossOrigin="anonymous"
            style={
              this.props.displayProportionalImage
                ? {
                    maxHeight: this.tabHeight + "px",
                    maxWidth: "100%",
                  }
                : {
                    height: this.tabHeight + "px",
                    width: "100%",
                  }
            }
          />
          {this.state.outputImageName !== null ? (
            <Fade in={this.state.displayImageName}>
              <GridListTileBar
                style={{}}
                title={
                  <Typography
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignText: "center",
                      fontFamily: snetFont,
                      fontVariantCaps: "normal",
                      textTransform: "initial",
                      color: snetBackgroundGrey,
                      fontSize: 14,
                    }}
                  >
                    {" "}
                    {this.state.outputImageName}{" "}
                  </Typography>
                }
              />
            </Fade>
          ) : (
            <React.Fragment />
          )}
        </div>
      </Fade>
    );
  }

  handleMouseMove(event) {
    let offsetLeft = this.imageDiv.current.getBoundingClientRect().left;
    let offsetImageLeft = this.outputImage.current.getBoundingClientRect().left;
    this.setState({
      imageXPosition: event.clientX - offsetImageLeft,
      dividerXPosition: event.clientX - offsetLeft,
    });
  }

  setInputImageDimensions() {
    this.setState({
      inputImageHeight: this.inputImage.current.clientHeight,
      inputImageWidth: this.inputImage.current.clientWidth,
    });
  }

  setInitialImageXPosition() {
    this.setState({
      imageXPosition: this.outputImage.current.clientWidth / 2,
    });
  }

  renderComparison() {
    return (
      <Fade in={this.state.mainState === "display"}>
        <div
          ref={this.imageDiv}
          id="imageDiv"
          style={{
            position: "relative",
            overflow: "hidden",
            padding: spacingUnit,
            width: "100%",
            height: this.tabHeight + "px",  
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "ew-resize",
          }}
          onMouseMove={this.handleMouseMove}
        >
          <img
            ref={this.inputImage}
            style={
              this.props.displayProportionalImage
                ? {
                    maxHeight: this.tabHeight + "px",
                    maxWidth: "100%",
                    align: "center",
                    position: "relative",
                  }
                : {
                    height: this.tabHeight + "px",
                    width: "100%",
                    align: "center",
                    position: "relative",
                  }
            }
            alt="Service response..."
            src={this.state.inputImageData}
            onLoad={this.setInputImageDimensions}
          />
          <img
            ref={this.outputImage}
            style={
              this.props.displayProportionalImage
                ? {
                    maxHeight: this.tabHeight + "px",
                    maxWidth: "100%",
                    align: "center",
                    position: "absolute",
                    clip: "rect(0px," + this.state.imageXPosition + "px,10000px,0px)",
                  }
                : {
                    height: this.tabHeight + "px",
                    width: "100%",
                    align: "center",
                    position: "absolute",
                    clip: "rect(0px," + this.state.imageXPosition + "px,10000px,0px)",
                  }
            }
            onLoad={this.setInitialImageXPosition}
            height={this.props.overlayInputImage && this.state.inputImageHeight}
            width={this.props.overlayInputImage && this.state.inputImageWidth}
            alt="Service response..."
            src={this.state.outputImage}
          />
          <div
            style={{
              position: "absolute",
              left: this.state.dividerXPosition - 1.5 + "px",
              borderLeft: "3px solid white",
              height: this.tabHeight,
            }}
          ></div>
          <div
            style={{
              position: "absolute",
              left: this.state.dividerXPosition - 15 + "px",
              top: this.tabHeight / 2 - 15 + "px",
              width: "30px",
              height: "30px",
              borderRadius: "15px",
              backgroundColor: "white",
            }}
          ></div>
          <UnfoldMoreIcon
            style={{
              color: this.mainColor,
              width: "30px",
              height: "30px",
              position: "absolute",
              left: this.state.dividerXPosition - 15 + "px",
              top: this.tabHeight / 2 - 15 + "px",
              transform: "rotate(90deg)",
            }}
          />
        </div>
      </Fade>
    );
  }

  render() {
    return (
      <div
        style={{
          width: this.props.width,
          minHeight: "264px",
          minWidth: minimumWidth,
          position: "relative",
        }}
      >
        <Grid container direction="row" justify="flex-start" alignItems="center" style={{ color: "black",
            backgroundColor: "white" }} spacing={0} >
          <Grid item xs={12}>
            <Grid container direction="row" alignItems="flex-end" justify="space-around" style={{ paddingBottom: 5 }}>
              <Grid item xs={4}>
                <Typography color="inherit" noWrap variant="h6" style={{ fontSize: 18, fontFamily: snetFont,
                    padding: spacingUnit / 2}}>
                  {this.state.mainState === "display" ? this.props.displayModeTitle : this.props.imageName}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <MuiThemeProvider theme={this.theme}>
                  <Tabs
                    value={this.state.value}
                    onChange={this.handleTabChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                    style={{
                      color: snetGrey,
                    }}
                    TabIndicatorProps={{style:{ 
                      bottom: 8,
                      backgroundColor: '#4086ff'
                    }}}
                  >
                    {this.state.mainState !== "uploaded" &&
                      !(this.state.mainState === "display") &&
                      !this.props.disableUploadTab && (
                        <Tab
                          style={{ marginRight: "0", minWidth: 'fit-content',
                            paddingBottom: 0, flexGrow: 0, flexBasis: 0,  paddingLeft: 10 }} 
                          value={0} label={<span style={this.tabLabelStyle}>Upload</span>}                          
                        />
                      )}
                    {this.state.mainState !== "uploaded" &&
                      !(this.state.mainState === "display") &&
                      !this.props.disableUrlTab && (
                        <Tab 
                          style={{ marginRight: "0", minWidth: 'fit-content',
                            paddingBottom: 0, flexGrow: 0, flexBasis: 0,  paddingLeft: 10 }} 
                          value={1} label={<span style={this.tabLabelStyle}>URL</span>} />
                      )}
                    {this.state.mainState !== "uploaded" &&
                      !(this.state.mainState === "display") &&
                      this.props.imageGallery.length > 0 && (
                        <Tab
                          style={{ marginRight: "0", minWidth: 'fit-content',
                          paddingBottom: 0, flexGrow: 0, flexBasis: 0, paddingLeft: 10  }}
                          value={2}
                          label={<span style={this.tabLabelStyle}>Gallery</span>}
                        />
                      )}
                    {this.state.mainState === "display" && !this.props.disableInputTab && (
                      <Tab
                        style={{ marginRight: "0", minWidth: 'fit-content',
                          paddingBottom: 0, flexGrow: 0, flexBasis: 0 }}
                        value={3}
                        label={<span style={this.tabLabelStyle}>{this.props.inputTabTitle}</span>}
                      />
                    )}
                    {this.state.mainState === "display" && !this.props.disableOutputTab && (
                      <Tab
                        style={{ minWidth: "5%" }}
                        value={4}
                        label={<span style={this.tabLabelStyle}>{this.props.outputTabTitle}</span>}
                      />
                    )}
                    {this.state.mainState === "display" && !this.props.disableComparisonTab && (
                      <Tab
                        style={{ minWidth: "5%" }}
                        value={5}
                        label={<span style={this.tabLabelStyle}>{this.props.comparisonTabTitle}</span>}
                      />
                    )}
                  </Tabs>
                </MuiThemeProvider>
              </Grid>
              <Grid
                item
                xs={1}
                style={{
                  flexGrow: 1,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {this.props.infoTip.length > 0 && (
                  <Tooltip
                    title={
                      <Typography style={{ fontFamily: snetFont, fontSize: 12, color: "white" }}>
                        {this.props.infoTip}
                      </Typography>
                    }
                  >
                    <InfoIcon
                      style={{
                        fontSize: 20,
                        color: snetGrey,
                      }}
                    />
                  </Tooltip>
                )}
              </Grid>
              <Grid item xs={1} style={{ flexGrow: 1, display: "flex", justifyContent: "center", alignItems: "center", }}
              >
                {this.state.mainState === "uploaded" && !this.props.disableResetButton && (
                  <Fade in={this.state.mainState === "uploaded"}>
                    <Tooltip
                      title={
                        <Typography style={{ fontFamily: snetFont, fontSize: 12, color: "white" }}>
                          Click to reset!
                        </Typography>
                      }
                    >
                      <IconButton onClick={this.handleImageReset.bind(this)}>
                        <RefreshIcon
                          style={{
                            fontSize: 20,
                            color: this.mainColor,
                          }}
                        />
                      </IconButton>
                    </Tooltip>
                  </Fade>
                )}
                {this.state.mainState === "display" && !this.props.disableDownloadButton && (
                  <Fade in={this.state.mainState === "display"}>
                    <Tooltip
                      title={
                        <Typography style={{ fontFamily: snetFont, fontSize: 12, color: "white" }}>
                          Download output image
                        </Typography>
                      }
                    >
                      <a href={this.state.outputImage} download={this.state.outputImageName}>
                        <IconButton>
                          <CloudDownloadIcon
                            style={{
                              fontSize: 20,
                              color: this.mainColor,
                            }}
                          />
                        </IconButton>
                      </a>
                    </Tooltip>
                  </Fade>
                )}
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} style={{ backgroundColor: snetBackgroundGrey }}>
            {((this.state.mainState === "initial" || this.state.mainState === "display") && this.renderTabs()) ||
              (this.state.mainState === "loading" && this.renderLoadingState()) ||
              (this.state.mainState === "uploaded" && this.renderUploadedState())}
          </Grid>
        </Grid>
      </div>
    );
  }
}

SNETImageUpload.propTypes = {
  width: PropTypes.string, // e.g.: "500px", "50%" (of parent component width)
  tabHeight: PropTypes.number, // a number without units
  imageDataFunc: PropTypes.func.isRequired,
  imageName: PropTypes.string,
  disableUploadTab: PropTypes.bool, // If true disables upload tab
  disableUrlTab: PropTypes.bool, // If true disables url tab
  disableResetButton: PropTypes.bool, // If true disables image reset button
  returnByteArray: PropTypes.bool, // whether to return base64 or byteArray image data
  outputFormat: PropTypes.oneOf(["image/png", "image/jpg", "image/jpeg"]),
  allowedInputTypes: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  maxImageSize: PropTypes.number, // 10 mb
  maxImageWidth: PropTypes.number,
  maxImageHeight: PropTypes.number,
  displayProportionalImage: PropTypes.bool,
  allowURL: PropTypes.bool,
  instantUrlFetch: PropTypes.bool,
  imageGallery: PropTypes.arrayOf(PropTypes.string),
  galleryCols: PropTypes.number,
  infoTip: PropTypes.string,
  mainColor: PropTypes.object,

  // Output mode props
  displayModeTitle: PropTypes.string,
  outputImage: PropTypes.string,
  outputImageMimeType: PropTypes.oneOf([
    "application/octet-stream",
    "image/png",
    "image/jpg",
    "image/jpeg",
    "image/gif",
  ]),
  outputImageName: PropTypes.string,
  disableInputTab: PropTypes.bool,
  disableOutputTab: PropTypes.bool,
  disableComparisonTab: PropTypes.bool,
  disableDownloadButton: PropTypes.bool,
  overlayInputImage: PropTypes.bool,
  inputTabTitle: PropTypes.string,
  outputTabTitle: PropTypes.string,
  comparisonTabTitle: PropTypes.string,
};

SNETImageUpload.defaultProps = {
  width: "500px",
  tabHeight: 300,
  imageName: "Content Image",
  disableUploadTab: false, // If true disables upload tab
  disableUrlTab: false, // If true disables url tab
  disableResetButton: false,
  returnByteArray: false,
  outputFormat: "image/png",
  allowedInputTypes: ["image/png", "image/jpeg", "image/jpg"],
  maxImageSize: 10000000, // 10 mb
  maxImageWidth: null,
  maxImageHeight: null,
  displayProportionalImage: true, // if true, keeps uploaded image proportions. Else stretches it
  allowURL: false, // sends image URL instead of image data for both URL and Gallery modes. Might still send base64 if the user uploads an image
  instantUrlFetch: false,
  imageGallery: [],
  galleryCols: 3,
  infoTip: "",
  mainColor: blue,

  // Output mode props
  displayModeTitle: "Result",
  outputImage: "",
  outputImageMimeType: undefined,
  outputImageName: "service-output",
  disableInputTab: false,
  disableOutputTab: false,
  disableComparisonTab: false,
  disableDownloadButton: false,
  overlayInputImage: true,
  inputTabTitle: "Input",
  outputTabTitle: "Output",
  comparisonTabTitle: "Comparison",
};
