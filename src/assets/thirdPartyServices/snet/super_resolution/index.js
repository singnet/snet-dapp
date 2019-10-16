import React from "react";
import Button from "@material-ui/core/Button";
import SNETImageUpload from "../../standardComponents/SNETImageUpload";
import { Grid, IconButton, MuiThemeProvider, Tooltip } from "@material-ui/core";
import { blue } from "@material-ui/core/colors";
import SvgIcon from "@material-ui/core/SvgIcon";
import InfoIcon from "@material-ui/icons/Info";
import { createMuiTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import grey from "@material-ui/core/es/colors/grey";
import red from "@material-ui/core/es/colors/red";
import MenuItem from "@material-ui/core/MenuItem";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Select from "@material-ui/core/Select";
import ReactDOM from "react-dom";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import HoverIcon from "../../standardComponents/HoverIcon";

import { SuperResolution } from "./super_resolution_pb_service";

const initialUserInput = {
  // Actual inputs
  input: null,
  model: "",
  scale: "",
};


export default class SuperResolutionService extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ...initialUserInput,
      // From .proto file
      // Single option for both service and method names
      serviceName: "SuperResolution",
      methodName: "increase_image_resolution",
      // For the outlined select components
      modelLabelWidth: 0,
      scaleLabelWidth: 0,
    };

    this.mainFont = "Muli";
    this.mainFontSize = 14;

    this.users_guide = "https://singnet.github.io/super-resolution-service/";
    this.code_repo = "https://github.com/singnet/super-resolution-service";
    this.reference = "https://github.com/fperazzi/proSR";

    this.submitAction = this.submitAction.bind(this);
    this.canBeInvoked = this.canBeInvoked.bind(this);

    this.handleServiceName = this.handleServiceName.bind(this);
    this.handleFormUpdate = this.handleFormUpdate.bind(this);
    this.handleChange = this.handleChange.bind(this);
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
    // Can be invoked if all of the input parameters have been chosen
    return this.state.input !== null && this.state.model !== "" && this.state.scale !== "";
  }

  componentDidMount() {
    this.setState({
      modelLabelWidth: ReactDOM.findDOMNode(this.ModelLabelRef).offsetWidth,
      scaleLabelWidth: ReactDOM.findDOMNode(this.ScaleLabelRef).offsetWidth,
    });
  }

  submitAction() {
    const { methodName, input, model, scale } = this.state;
    const methodDescriptor = SuperResolution[methodName];
    const request = new methodDescriptor.requestType();

    request.setInput(input);
    request.setModel(model);
    request.setScale(scale);

    const props = {
      request,
      onEnd: response => {
        const { message, status, statusMessage } = response;
        if (status !== 0) {
          throw new Error(statusMessage);
        }
        this.setState({
          ...initialUserInput,
          response: { status: "success", data: message.getData() },
        });
      },
    };

    this.props.serviceClient.unary(methodDescriptor, props);
  }

  handleFormUpdate(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleServiceName(event) {
    let strService = event.target.value;
    this.setState({
      serviceName: strService,
    });
    console.log("Selected service is " + strService);
    let data = this.methodsForAllServices[strService];
    if (typeof data === "undefined") {
      data = [];
    }
    this.serviceMethods = data;
  }

  handleChange(event) {
    if (event.target.name === "model") {
      this.setState({
        [event.target.name]: event.target.value,
        scale: "",
      });
    } else {
      this.setState({ [event.target.name]: event.target.value });
    }
  }

  getImageData(data) {
    this.setState({ input: data });
  }

  renderForm() {
    return (
      <React.Fragment>
        <Grid item xs={12} container justify="space-around" style={{ paddingTop: 12 }}>
          <Grid item xs container justify="center" alignItems="center">
            <FormControl
              variant="outlined"
              style={{
                margin: 8,
                minWidth: 120,
              }}
            >
              <InputLabel
                ref={ref => {
                  this.ModelLabelRef = ref;
                }}
                htmlFor="outlined-model"
              >
                Model
              </InputLabel>
              <Select
                value={this.state.model}
                onChange={this.handleChange}
                input={<OutlinedInput labelWidth={this.state.modelLabelWidth} name="model" id="outlined-model" />}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="proSR">proSR</MenuItem>
                <MenuItem value="proSRGAN">proSRGAN</MenuItem>
              </Select>
            </FormControl>
            <Tooltip
              title={
                <Typography style={{ fontFamily: this.mainFont, fontSize: this.mainFontSize, color: "white" }}>
                  proSR: higher PSNR (Peak Signal to Noise Ratio)
                  <br />
                  proSRGAN: higher details.
                </Typography>
              }
            >
              <InfoIcon style={{ color: grey[500] }} />
            </Tooltip>
          </Grid>
          <Grid item xs container justify="center">
            <FormControl variant="outlined">
              <InputLabel
                ref={ref => {
                  this.ScaleLabelRef = ref;
                }}
                htmlFor="outlined-scale"
              >
                Scale
              </InputLabel>
              <Select
                value={this.state.scale}
                onChange={this.handleChange}
                input={<OutlinedInput labelWidth={this.state.scaleLabelWidth} name="scale" id="outlined-scale" />}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {this.state.model === "proSR" && <MenuItem value={2}>2</MenuItem>}
                <MenuItem value={4}>4</MenuItem>
                {/*<MenuItem value={8}>8</MenuItem>*/}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid item xs={12} container justify="center">
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

  parseResponse() {

    const { response} = this.state;
    const { isComplete } = this.props;
    
    if (isComplete) {
      if (typeof response !== "undefined") {
        if (typeof response === "string") {
          console.log("returning response");
          return response;
        }
        console.log("returning data");
        return response.data;
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  render() {
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
                    Super Resolution
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
              <Grid item xs={12} container justify="center">
                <SNETImageUpload
                  imageDataFunc={this.getImageData}
                  outputImage={this.parseResponse()}
                  width="90%"
                  infoTip="Warning 1: Due to high GPU memory usage the maximum input image size has been greatly limited. We're working to define more flexible file size limits.

                                            Warning 2: Due to the original implementation, PNG image transparency turns to black."
                  maxImageSize={300000}
                  disableUrlTab={true}
                  // instantUrlFetch={true}
                  // allowURL={true}
                />
              </Grid>
              {!this.props.isComplete && this.renderForm()}
            </Grid>
          </MuiThemeProvider>
        </Paper>
      </div>
    );
  }
}
