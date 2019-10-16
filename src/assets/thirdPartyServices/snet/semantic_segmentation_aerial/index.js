import React from "react";
import Button from "@material-ui/core/Button";
import { Grid, IconButton, MuiThemeProvider, Tooltip } from "@material-ui/core";
import { blue } from "@material-ui/core/colors";
import SvgIcon from "@material-ui/core/SvgIcon";
import InfoIcon from "@material-ui/icons/Info";
import { createMuiTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import grey from "@material-ui/core/es/colors/grey";
import red from "@material-ui/core/es/colors/red";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import ReactDOM from "react-dom";
import SNETImageUpload from "../../standardComponents/SNETImageUpload";
import HoverIcon from "../../standardComponents/HoverIcon";

export default class SemanticSegmentationAerial extends React.Component {
  constructor(props) {
    super(props);

    this.initialState = {
      // From .proto file
      // Single option for both service and method names
      serviceName: "SemanticSegmentationAerial",
      methodName: "segment_aerial_image",
      searchText: "",

      // Actual inputs
      input: "",
      window_size: 256,
      stride: 256,
      // Output
      response: null,

      // For the outlined select components
      swsLabelWidth: 0,
      strideLabelWidth: 0,
    };

    this.state = this.initialState;

    this.mainFont = "Muli";
    this.mainFontSize = 14;

    this.users_guide = "https://singnet.github.io/semantic-segmentation-aerial/";
    this.code_repo = "https://github.com/singnet/semantic-segmentation-aerial";
    this.reference = "https://github.com/nshaud/DeepNetsForEO";

    this.submitAction = this.submitAction.bind(this);
    this.handleChange = this.handleChange.bind(this);

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

  componentDidMount() {
    this.setState({
      swsLabelWidth: ReactDOM.findDOMNode(this.SWSLabelRef).offsetWidth,
      strideLabelWidth: ReactDOM.findDOMNode(this.StrideLabelRef).offsetWidth,
    });
  }

  submitAction() {
    this.props.callApiCallback(this.state.serviceName, this.state.methodName, {
      input: this.state.input,
      window_size: this.state.window_size,
      stride: this.state.stride,
    });
  }

  searchTextUpdate(event) {
    let url_pattern = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?(\.tif|\.tiff)/;

    this.setState({
      searchText: event.target.value,
      input: "",
    });

    if (event.target.value.match(url_pattern) != null) {
      this.setState({ input: event.target.value });
    }
  }

  handleChange(event) {
    if (event.target.name === "window_size") {
      this.setState({
        [event.target.name]: event.target.value,
        stride: event.target.value,
      });
    } else {
      this.setState({ [event.target.name]: event.target.value });
    }
  }

  renderForm() {
    return (
      <React.Fragment>
        <Grid item container xs={12} direction="row" justify="center" alignItems="center">
          <MuiThemeProvider theme={this.theme}>
            <TextField
              style={{
                width: "80%",
                primary: blue,
                textAlign: "left",
              }}
              variant="outlined"
              type="text"
              label={<span style={{ fontWeight: "normal", fontSize: 12 }}>TIFF Image URL</span>}
              onChange={this.searchTextUpdate.bind(this)}
            />
          </MuiThemeProvider>
        </Grid>
        <div style={{ width: "80%", paddingTop: 10 }}>
          <Grid item xs={12} container alignItems="center" justify="space-around">
            <Grid item xs container justify="flex-start" alignItems="center">
              <FormControl variant="outlined">
                <InputLabel
                  ref={ref => {
                    this.SWSLabelRef = ref;
                  }}
                  htmlFor="outlined-sws"
                >
                  Sliding Window Size
                </InputLabel>
                <Select
                  value={this.state.window_size}
                  onChange={this.handleChange}
                  input={<OutlinedInput labelWidth={this.state.swsLabelWidth} name="window_size" id="outlined-sws" />}
                >
                  <MenuItem value="512">512</MenuItem>
                  <MenuItem value="256">256</MenuItem>
                  <MenuItem value="128">128</MenuItem>
                  <MenuItem value="64">64</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs container justify="flex-end" alignItems="center">
              <FormControl variant="outlined">
                <InputLabel
                  ref={ref => {
                    this.StrideLabelRef = ref;
                  }}
                  htmlFor="outlined-stride"
                >
                  Stride
                </InputLabel>
                <Select
                  value={this.state.stride}
                  onChange={this.handleChange}
                  input={<OutlinedInput labelWidth={this.state.strideLabelWidth} name="stride" id="outlined-stride" />}
                >
                  <MenuItem value={this.state.window_size}>{this.state.window_size.toString()}</MenuItem>
                  <MenuItem value={this.state.window_size / 2}>{(this.state.window_size / 2).toString()}</MenuItem>
                  <MenuItem value={this.state.window_size / 4}>{(this.state.window_size / 4).toString()}</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </div>
        <Grid item container justify="center" style={{ paddingTop: 16 }}>
          <Grid item>
            <Tooltip
              title={
                <Typography
                  style={{
                    fontFamily: this.mainFont,
                    fontSize: this.mainFontSize,
                    color: "white",
                  }}
                >
                  Please input a valid URL for a TIFF image under http(s) or ftp.
                </Typography>
              }
            >
              <div>
                <Button
                  variant="contained"
                  size="medium"
                  color="primary"
                  style={{ fontSize: "13px", marginLeft: "10px" }}
                  onClick={this.submitAction}
                  disabled={!this.state.input}
                >
                  Invoke
                </Button>
              </div>
            </Tooltip>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }

  renderComplete() {
    if (this.props.response) {
      if (this.props.response.data.length < 300) {
        return (
          <Grid item xs={12} container justify="center">
            <Typography
              style={{
                fontFamily: this.mainFont,
                fontSize: this.mainFontSize,
                color: "red",
              }}
            >
              Error: {this.props.response.data}
            </Typography>
          </Grid>
        );
      } else {
        return (
          <Grid item xs={12} container justify="center">
            <SNETImageUpload
              imageDataFunc={function() {
                return 0;
              }}
              outputImage={this.props.response.data}
              outputImageName="segmented_image"
              width="90%"
              disableComparisonTab={true}
              disableInputTab={true}
            />
          </Grid>
        );
      }
    }
  }

  render() {
    return (
      <div style={{ flexGrow: 1 }}>
        <Paper
          style={{
            padding: 8 * 2,
            margin: "auto",
            width: "85%",
            maxWidth: 550,
          }}
        >
          <MuiThemeProvider theme={this.theme}>
            <Grid container spacing={8} justify="center" alignItems="center">
              <Grid item xs={12} container alignItems="center" justify="center">
                <Grid item>
                  <Typography
                    style={{
                      fontFamily: this.mainFont,
                      fontSize: 19,
                    }}
                  >
                    Semantic Segmentation for Aerial Images
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid container spacing={8} justify="center" alignItems="center">
              <Grid item xs={12} container alignItems="center" justify="flex-end">
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
              {this.props.isComplete ? this.renderComplete() : this.renderForm()}
            </Grid>
          </MuiThemeProvider>
        </Paper>
      </div>
    );
  }
}
