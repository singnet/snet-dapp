import React from "react";
import Button from "@material-ui/core/Button";
import SNETImageUpload from "./../../standardComponents/SNETImageUpload";
import { Grid, IconButton, MuiThemeProvider, Tooltip } from "@material-ui/core";
import { blue } from "@material-ui/core/colors";
import SvgIcon from "@material-ui/core/SvgIcon";
import InfoIcon from "@material-ui/icons/Info";
import { createMuiTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import grey from "@material-ui/core/es/colors/grey";
import red from "@material-ui/core/es/colors/red";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import HoverIcon from "../../standardComponents/HoverIcon";
import {SceneRecognition} from "./scene_recognition_pb_service"

export default class Places365SceneRecognition extends React.Component {
  constructor(props) {
    super(props);

    this.initialState = {
      // From .proto file
      // Single option for both service and method names
      serviceName: "SceneRecognition",
      methodName: "recognize_scene",
      // Actual inputs
      input_image: "",
      predict: "",
      isComplete: false,
    };

    this.state = this.initialState;

    this.mainFont = "Muli";
    this.mainFontSize = 16;
    this.itemFontSize = 14;
    this.titleStyle = { fontFamily: this.mainFont, fontSize: this.mainFontSize, fontWeight: "bold" };
    this.tableHeaderStyle = { fontFamily: this.mainFont, fontSize: this.itemFontSize + 1, fontWeight: "bold" };
    this.itemStyle = { fontFamily: this.mainFont, fontSize: this.itemFontSize };
    this.dividerStyle = {
      border: 0,
      clear: "both",
      display: "block",
      width: "96%",
      backgroundColor: grey[300],
      height: "1px",
    };

    this.users_guide = "https://singnet.github.io/dnn-model-services/users_guide/places365-scene-recognition.html";
    this.code_repo = "https://github.com/singnet/dnn-model-services/tree/master/services/places365-scene-recognition";
    this.reference = "https://github.com/CSAILVision/places365";

    this.submitAction = this.submitAction.bind(this);
    this.canBeInvoked = this.canBeInvoked.bind(this);

    this.getImageData = this.getImageData.bind(this);

    // Color Palette
    this.theme = createMuiTheme({
      palette: {
        primary: blue,
        secondary: grey,
      },
      typography: {
        useNextVariants: true,
      },
      overrides: {
        MuiIconButton: {
          // Name of the component ⚛️ / style sheet
          colorPrimary: blue[500],
          colorSecondary: grey[500],
        },
        MuiSvgIcon: {
          colorPrimary: red[500],
          colorSecondary: grey[500],
        },
      },
    });
  }

  canBeInvoked() {
    // Can be invoked if input image has been chosen
    return this.state.input_image;
  }

  submitAction() {
    const { methodName, input_image,predict } = this.state;
    const methodDescriptor = SceneRecognition[methodName];
    const request = new methodDescriptor.requestType();

    request.setInputImage(input_image)
    request.setPredict(predict)

    const props = {
      request,
      onEnd: response => {
        const { message, status, statusMessage } = response;
        if (status !== 0) {
          throw new Error(statusMessage);
        }
        this.setState({
         
          response: { status: "success", data: message.getData() },
        });
      },
    };

    this.props.serviceClient.unary(methodDescriptor, props);
  }

  getImageData(data) {
    this.setState({ input_image: data });
  }

  renderForm() {
    return (
      <React.Fragment>
        <Grid item container justify="center" style={{ paddingTop: 16 }}>
          <Grid item>
            <Button
              variant="contained"
              size="medium"
              color="primary"
              style={{ fontSize: "13px", marginLeft: "10px" }}
              onClick={this.submitAction}
              disabled={!this.canBeInvoked()}
            >
              Invoke
            </Button>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }

  renderComplete(response) {
    let categories = response.categories.split(",").slice(0, -1);

    console.log();
    return (
      <React.Fragment>
        <Grid item xs={12} container justify="center">
          <Typography style={this.titleStyle}>Predicted Scenes</Typography>
        </Grid>
        <Grid item xs={12} container justify="center">
          <Table style={{ width: "60%" }}>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography style={this.tableHeaderStyle}>Scene</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography style={this.tableHeaderStyle}>Probability</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories.map(category => {
                let [prob, cat] = category.split(" -> ");
                return (
                  <TableRow key={cat}>
                    <TableCell component="th" scope="row">
                      <Typography style={this.itemStyle}>{cat}</Typography>
                    </TableCell>
                    <TableCell component="th" scope="row" align="center">
                      <Typography style={this.itemStyle}>{prob}</Typography>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Grid>
        <Grid item xs={12} container justify="center">
          <hr style={this.dividerStyle} />
          <Typography style={this.titleStyle}>Environment Type</Typography>
        </Grid>
        <Grid item xs={12} container justify="center">
          <Typography style={this.itemStyle}>{response.io}</Typography>
        </Grid>
        <Grid item xs={12} container justify="center">
          <hr style={this.dividerStyle} />
          <Typography style={this.titleStyle}>Scene Attributes</Typography>
        </Grid>
        <Grid item xs={12} container justify="center">
          <Typography style={this.itemStyle}>{response.attributes}</Typography>
        </Grid>
        <Grid item xs={12} container justify="center">
          <hr style={this.dividerStyle} />
          <Typography style={this.titleStyle}>Class Activation Mapping</Typography>
        </Grid>
      </React.Fragment>
    );
  }

  parseResponse() {
    const { response } = this.state;
    const { isComplete } = this.props;

    if (isComplete) {
      if (typeof response !== "undefined") {
        if (typeof response === "string") {
          return response;
        }
        return JSON.parse(response.data);
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  render() {
    let response;
    this.parseResponse() && (response = this.parseResponse());

    return (
      <div style={{ flexGrow: 1 }}>
        <Paper
          style={{
            padding: 8 * 2,
            margin: "auto",
            width: "100%",
            maxWidth: 550,
          }}
        >
          <MuiThemeProvider theme={this.theme}>
            <Grid container spacing={8} justify="center" alignItems="center">
              <Grid item xs={12} container alignItems="center" justify="space-between">
                <Grid item>
                  <Typography
                    style={{
                      fontFamily: this.mainFont,
                      fontSize: (this.mainFontSize * 4) / 3,
                    }}
                  >
                    Scene Recognition
                  </Typography>
                </Grid>
                <Grid item xs container justify="flex-end">
                  <Grid item>
                    <HoverIcon text="View code on Github" href={this.code_repo}>
                      <SvgIcon>
                        <path // Github Icon
                          d="M12.007 0C6.12 0 1.1 4.27.157 10.08c-.944 5.813 2.468 11.45 8.054 13.312.19.064.397.033.555-.084.16-.117.25-.304.244-.5v-2.042c-3.33.735-4.037-1.56-4.037-1.56-.22-.726-.694-1.35-1.334-1.756-1.096-.75.074-.735.074-.735.773.103 1.454.557 1.846 1.23.694 1.21 2.23 1.638 3.45.96.056-.61.327-1.178.766-1.605-2.67-.3-5.462-1.335-5.462-6.002-.02-1.193.42-2.35 1.23-3.226-.327-1.015-.27-2.116.166-3.09 0 0 1.006-.33 3.3 1.23 1.966-.538 4.04-.538 6.003 0 2.295-1.5 3.3-1.23 3.3-1.23.445 1.006.49 2.144.12 3.18.81.877 1.25 2.033 1.23 3.226 0 4.607-2.805 5.627-5.476 5.927.578.583.88 1.386.825 2.206v3.29c-.005.2.092.393.26.507.164.115.377.14.565.063 5.568-1.88 8.956-7.514 8.007-13.313C22.892 4.267 17.884.007 12.008 0z"
                        />
                      </SvgIcon>
                    </HoverIcon>
                  </Grid>
                  <Grid item>
                    <HoverIcon text="User's guide" href={this.users_guide}>
                      <InfoIcon />
                    </HoverIcon>
                  </Grid>
                  <Grid item>
                    <HoverIcon text="View original project" href={this.reference}>
                      <SvgIcon>
                        <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 11.701c0 2.857-1.869 4.779-4.5 5.299l-.498-1.063c1.219-.459 2.001-1.822 2.001-2.929h-2.003v-5.008h5v3.701zm6 0c0 2.857-1.869 4.779-4.5 5.299l-.498-1.063c1.219-.459 2.001-1.822 2.001-2.929h-2.003v-5.008h5v3.701z" />
                      </SvgIcon>
                    </HoverIcon>
                  </Grid>
                </Grid>
              </Grid>
              {this.props.isComplete && this.renderComplete(response)}
              <Grid item xs={12} container justify="center">
                <SNETImageUpload
                  style={{ align: "center" }}
                  maxImageSize={3000000}
                  imageDataFunc={this.getImageData}
                  imageName="Input"
                  outputImage={response && response.cam}
                  outputTabTitle="CAM"
                  outputImageName="class_activation_mapping"
                  width="90%"
                  instantUrlFetch={true}
                  allowURL={true}
                />
              </Grid>
              {!this.state.isComplete && this.renderForm()}
            </Grid>
          </MuiThemeProvider>
        </Paper>
      </div>
    );
  }
}