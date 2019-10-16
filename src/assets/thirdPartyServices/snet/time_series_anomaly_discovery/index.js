import React from "react";
import { hasOwnDefinedProperty } from "../../../../utility/JSHelper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import Typography from "@material-ui/core/Typography";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import Slider from "@material-ui/lab/Slider";
import { Chart } from "react-google-charts";
import Tooltip from "@material-ui/core/Tooltip";

import { EfficientRuleDensityBasedAnomalyDetection } from "./timeSeriesAnomalyDetection_pb_service";

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class TimeSeriesChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.shouldUpdate === true || nextProps.forceRender === true || this.props.maxMinButtonEvent === true) {
      // reset father state to avoid rerendering
      nextProps.parent.state.should_render_time_series_chart_sing_net = false;

      // reset father state to avoid rerendering
      // (TODO:remove next state from events list after max min window event)
      nextProps.parent.state.max_min_window_event_series_chart = false;

      return true;
    } else {
      return false;
    }
  }

  render() {
    return (
      <Chart
        width={"100%"}
        height={"400px"}
        chartType="LineChart"
        loader={<div>Loading Chart</div>}
        data={this.props.data}
        options={{
          legend: { position: "none" },
          color: "red",
          explorer: {
            actions: ["dragToZoom", "rightClickToReset"],
            axis: "horizontal",
            keepInBounds: true,
            maxZoomIn: 4.0,
          },
        }}
        legendToggle
      />
    );
  }
}

class AnomaliesChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.shouldUpdate === true || nextProps.forceRender === true || this.props.maxMinButtonEvent === true) {
      // reset father state to avoid rerendering
      nextProps.parent.state.should_render_anomalies_chart_sing_net = false;

      // reset father state to avoid rerendering
      // (TODO:remove next state from events list after max min window event)
      nextProps.parent.state.max_min_window_event_anomalies_chart = false;

      return true;
    } else {
      return false;
    }
  }

  render() {
    return (
      <Chart
        width={"100%"}
        height={"400px"}
        chartType="AreaChart"
        loader={<div>Loading Chart</div>}
        data={this.props.data}
        options={{
          legend: { position: "none" },
          series: {
            1: {
              // set the area opacity of the first data series to 0
              areaOpacity: 0.0,
            },
          },
          vAxis: {
            viewWindowMode: "explicit",
            viewWindow: {
              max: 1.0,
              min: 0.0,
            },
          },
        }}
        legendToggle
      />
    );
  }
}

export default class TimeSeriesAnomalyDiscoveryService extends React.Component {
  constructor(props) {
    super(props);

    this.submitAction = this.submitAction.bind(this);

    this.handleChangeUrl = this.handleChangeUrl.bind(this);
    this.handleChangeSlidingWindow = this.handleChangeSlidingWindow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.UrlExists = this.UrlExists.bind(this);
    this.thresholdChange = this.thresholdChange.bind(this);
    this.updateRenderTimeSeries = this.updateRenderTimeSeries.bind(this);
    this.resetFirstRender = this.resetFirstRender.bind(this);
    this.updateParentExansion = this.updateParentExansion.bind(this);
    this.getThreshold = this.getThreshold.bind(this);
    this.minMaxWindowEvent = this.minMaxWindowEvent.bind(this);

    this.state = {
      timeseries:
        "https://raw.githubusercontent.com/singnet/time-series-anomaly-discovery/master/resources/time_series/ecg0606_1.csv",
      serviceName: "EfficientRuleDensityBasedAnomalyDetection",
      methodName: "detectAnomalies",
      slidingwindowsize: "100",
      alphabet: "5",
      paasize: "10",
      debugflag: "0",
      threshold: 70,
      norm_threshold: 0.7,
      should_render_time_series_chart_sing_net: false,
      should_render_anomalies_chart_sing_net: false,
      max_min_window_event_anomalies_chart: false,
      max_min_window_event_series_chart: false,
      input_dialog: false,
      min_event_set: false,
      max_event_set: false,
      first_render: true,
      response: undefined,
      timeSeriesJson: undefined,
      invertedDensityCurveJson: undefined,

      styles: {
        details: {
          fontSize: 14,
          alignItems: "left",
        },
        defaultFontSize: {
          fontSize: 15,
        },
      },
    };

    this.serviceMethods = [];
    this.allServices = [];
    this.methodsForAllServices = [];
    this.isComplete = false;
    this.to_render_time_series = undefined;
    this.to_render_anomalies = undefined;

  }

  thresholdChange(event, value) {
    this.setState({ threshold: value });
  }

  handleClose() {
    this.setState({ input_dialog: false });
  }

  handleChangeUrl(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleChangeSlidingWindow(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  resetFirstRender() {
    this.state.norm_threshold = 0.7;
    this.state.threshold = 70;
    this.state.first_render = true;
  }

  UrlExists(url) {
    var http = new XMLHttpRequest();
    http.open("HEAD", url, false);
    http.send();
    return http.status != 404;
  }

  getThreshold() {
    var cur = parseFloat(this.state.threshold).toFixed(2);
    if (cur != NaN) return cur;
    else return "";
  }

  minMaxWindowEvent() {
    this.state.max_min_window_event_anomalies_chart = true;
    this.state.max_min_window_event_series_chart = true;

    this.setState({ update: true });
  }

  updateParentExansion() {
    // assign function to onclick of dap buttons for better bahavior
    var expand_button = document.getElementsByClassName("fas fa-window-maximize mini-maxi-close");
    var minimize_button = document.getElementsByClassName("fas fa-window-minimize mini-maxi-close");

    if (expand_button[0] != undefined && this.state.max_event_set === false) {
      expand_button[0].addEventListener("click", this.minMaxWindowEvent, false);
      this.state.max_event_set = true;
    }
    if (minimize_button[0] != undefined && this.state.min_event_set === false) {
      minimize_button[0].addEventListener("click", this.minMaxWindowEvent, false);
      this.state.min_event_set = true;
    }
  }

  updateRenderTimeSeries(event, value) {
    var columns = [
      { type: "number", label: "x" },
      { type: "number", label: "value" },
      { type: "number", label: "value" },
    ];

    var time_series_rows = [];
    var densities_series_rows = [];

    this.state.norm_threshold = this.state.threshold / 100.0;
    //var window_size = (this.state.invertedDensityCurveJson.length - 1) / 500;
    for (var i = 1; i < this.state.invertedDensityCurveJson.length; i = i + 1) {
      if (this.state.invertedDensityCurveJson[i][1] > this.state.norm_threshold) {
        var pos_to_render_series = [i, this.state.timeSeriesJson[i][1], this.state.timeSeriesJson[i][1]];
        time_series_rows.push(pos_to_render_series);
      } else {
        var pos_to_render_series = [i, this.state.timeSeriesJson[i][1], null];
        time_series_rows.push(pos_to_render_series);
      }

      var pos_to_render_densities = [i, this.state.invertedDensityCurveJson[i][1], this.state.norm_threshold];
      densities_series_rows.push(pos_to_render_densities);
    }

    this.to_render_time_series = [columns, ...time_series_rows];
    this.to_render_anomalies = [columns, ...densities_series_rows];

    this.state.should_render_anomalies_chart_sing_net = true;
    this.state.should_render_time_series_chart_sing_net = true;

    // force render
    this.setState({ update: true });
  }

  submitAction() {
    const { methodName, timeseries, slidingwindowsize, alphabet, paasize, debugflag } = this.state;
    const methodDescriptor = EfficientRuleDensityBasedAnomalyDetection[methodName];
    const request = new methodDescriptor.requestType();

    request.setTimeseries(timeseries);
    request.setAlphabet(alphabet);
    request.setSlidingwindowsize(slidingwindowsize);
    request.setPaasize(paasize);
    request.setDebugflag(debugflag);

    const props = {
      request,
      onEnd: response => {
        const { message, status, statusMessage } = response;
        if (status !== 0) {
          throw new Error(statusMessage);
        }
        this.setState({
          response: { status: "success", timeseries: message.getTimeseries(), density: message.getDensity(), normalized: message.getNormalized(), inverted: message.getInverted()},
        });

        this.state.timeSeriesJson = JSON.parse(this.state.response.timeseries);
        this.state.invertedDensityCurveJson = JSON.parse(this.state.response.inverted);

      },
    };

    this.props.serviceClient.unary(methodDescriptor, props);
  }



  renderForm() {
    return (
      <React.Fragment>
        <Grid item xs={12}>
          <h5 style={{ marginBottom: "10px" }}>
            This service{" "}
            <a href="https://github.com/singnet/time-series-anomaly-discovery/blob/master/docs/usersguide.md">
              user's guide
            </a>{" "}
            may help to understand how this service works, its expected parameters, and how to interpret and use its
            output.
          </h5>
          <Tooltip
            title={
              <React.Fragment>
                <Typography color="inherit" style={{ fontSize: 15 }}>
                  A valid CSV file may contain one number per line and no header.
                </Typography>
              </React.Fragment>
            }
            placement="left-start"
          >
            <TextField
              id="standard-multiline-static"
              label="Time Series CSV file URL"
              style={{ width: "100%" }}
              InputProps={{
                style: { fontSize: 15 },
              }}
              InputLabelProps={{
                style: { fontSize: 15 },
              }}
              value={this.state.timeseries}
              name="timeseries"
              onChange={this.handleChangeUrl}
              rows="6"
              defaultValue=""
              margin="normal"
            />
          </Tooltip>
        </Grid>
        <Grid item xs={12} style={{ textAlign: "center", marginTop: "10px", marginBottom: "10px" }}>
          <Tooltip
            title={
              <React.Fragment>
                <Typography color="inherit" style={{ fontSize: 15 }}>
                  Hit this button to call this service with the specified time series csv file URL.
                </Typography>
              </React.Fragment>
            }
            placement="left-start"
          >
            <Button
              style={{ fontSize: 15 }}
              size="large"
              variant="contained"
              color="primary"
              onClick={this.submitAction}
            >
              Invoke
            </Button>
          </Tooltip>
        </Grid>
      </React.Fragment>
    );
  }

  renderComplete() {

    return (
      // this.props.response.output
      <React.Fragment>
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item xs={12} style={{ textAlign: "center" }}>
            <h3>Input Time Series</h3>
            <p style={{ color: "red", fontStyle: "italic", fontSize: 13 }}>Red regions are detected anomalies.</p>
          </Grid>
          <Grid item xs={11}>
            <TimeSeriesChart
              data={this.to_render_time_series}
              shouldUpdate={this.state.should_render_time_series_chart_sing_net}
              maxMinButtonEvent={this.state.max_min_window_event_series_chart}
              parent={this}
              forceRender={this.state.first_render}
            />
          </Grid>
          <Grid item xs={1}></Grid>
          <Grid item xs={12} style={{ textAlign: "center" }}>
            <h3>Anomalies</h3>
            <p style={{ color: "grey", fontStyle: "italic", fontSize: 13 }}>
              Higher values mean that it is more likely <br />
              for that sample to be an anomaly.
            </p>
          </Grid>
          <Grid item xs={11}>
            <AnomaliesChart
              data={this.to_render_anomalies}
              shouldUpdate={this.state.should_render_anomalies_chart_sing_net}
              maxMinButtonEvent={this.state.max_min_window_event_anomalies_chart}
              parent={this}
              forceRender={this.state.first_render}
            />
          </Grid>
          <Grid item xs={1}>
            <Tooltip
              title={
                <React.Fragment>
                  <Typography color="inherit" style={{ fontSize: 15 }}>
                    Threshold {this.getThreshold()}
                  </Typography>
                </React.Fragment>
              }
              placement="left-start"
            >
              <div style={{ display: "flex", height: "247px" }}>
                <Slider
                  style={{ padding: "0px 50%" }}
                  value={this.state.threshold}
                  step={0.01}
                  onChange={this.thresholdChange}
                  onDragEnd={this.updateRenderTimeSeries}
                  vertical
                ></Slider>
              </div>
            </Tooltip>
          </Grid>
          <Grid item xs={12}>
            <p style={{ textAlign: "center", color: "grey", fontStyle: "italic", fontSize: 15 }}>
              Read this{" "}
              <a href="https://github.com/singnet/time-series-anomaly-discovery/blob/master/docs/usersguide.md">
                user's guide
              </a>{" "}
              to better know the meaning of the output charts <br />
              and how to interact with them.
            </p>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }

  render() {
    // allow to get the expand event
    this.updateParentExansion();

    if (this.props.isComplete) {

      if (this.state.first_render === true) {
        this.state.first_render = false;
        this.updateRenderTimeSeries();
      }

      return (
        <React.Fragment>
          <div style={{ flexGrow: 1 }}>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              style={{ marginTop: 15, marginBottom: 15 }}
            >
              {this.renderComplete()}
            </Grid>
          </div>
        </React.Fragment>
      );
    } else {
      return (
        <div style={{ flexGrow: 1 }}>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            style={{ marginTop: 15, marginBottom: 15 }}
          >
            {this.renderForm()}
          </Grid>

          <Dialog
            open={this.state.input_dialog}
            TransitionComponent={Transition}
            keepMounted
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle id="alert-dialog-slide-title" style={{ fontSize: 15 }}>
              {"Usage"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description" style={{ fontSize: 15 }}>
                Please insert a valid URL and parameters.
                <br />
                <li>
                  <b>Sliding Window Size:</b> Must be greater or equals 20 and less than the time series size.
                </li>
                <br />
                See example parameters below...
                <br />
                <br />
                <strong>Time Series:</strong>{" "}
                https://raw.githubusercontent.com/singnet/time-series-anomaly-discovery/master/resources/time_series/ecg0606_1.csv
                <br />
                <strong>Sliding Window size:</strong> 100
              </DialogContentText>
            </DialogContent>
          </Dialog>
        </div>
      );
    }
  }
}
