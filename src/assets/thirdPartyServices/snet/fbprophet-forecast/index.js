import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import SvgIcon from "@material-ui/core/SvgIcon";
import InfoIcon from "@material-ui/icons/Info";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Chart } from "react-google-charts";

import HoverIcon from "../../standardComponents/HoverIcon";
import OutlinedDropDown from "../../common/OutlinedDropdown";
import OutlinedTextArea from "../../common/OutlinedTextArea";
import FileUploader from "../../common/FileUploader";

import { Forecast } from "./fbprophet_forecast_pb_service";

const initialUserInput = {
  sampleIndex: "0",
  samples: [
    {
      label: "From CSV File (must have 'ds' and 'y' columns headers)",
      content: undefined,
      value: "0",
    },
    {
        label: "From URL",
        content: undefined,
        value: "1",
      },
    {
      label: "Daily page views for the Wikipedia page for Peyton Manning",
      content: "https://bh.singularitynet.io:7000/Resources/example_wp_log_peyton_manning.csv",
      value: "2",
    },
    {
        label: "Albury (AUS) daily minimum temepratures (JAN 2009 - AUG 2014)",
        content: "https://bh.singularitynet.io:7000/Resources/example_albury_min_temps.csv",
        value: "3",
      },
  ],
  url: "",
  period: 5,
  points: 365,
  uploadedFile: undefined,
  isValid: {
    validCSV: false,
  },
};

export default class FBProphetForecastService extends React.Component {
  constructor(props) {
    super(props);
    this.submitAction = this.submitAction.bind(this);
    this.handleFileUpload = this.handleFileUpload.bind(this);
    this.handleFormUpdate = this.handleFormUpdate.bind(this);

    this.state = {
      ...initialUserInput,
      users_guide: "https://singnet.github.io/time-series-analysis/users_guide/generic/fbprophet-forecast.html",
      code_repo: "https://github.com/singnet/time-series-analysis/tree/master/generic/fbprophet-forecast",
      reference: "https://github.com/facebook/prophet",
      response: undefined,
    };
  }

  createChartData(response) {
    const { observed, forecast, forecast_ds, forecast_lower, forecast_upper } = response;
    var columns = [
        { type: "string", label: "Date" },
        { type: "number", label: "Data" },
        { type: "number", label: "Data" },
        { id: 'i0', type: 'number', role: 'interval' },
        { id: 'i1', type: 'number', role: 'interval' }
      ];
    let chart_data = [];
    for (let i = 0; i < forecast.length; i = i + 1) {
        if (i < observed.length) chart_data.push([forecast_ds[i], observed[i], undefined, undefined, undefined]);
        else chart_data.push([forecast_ds[i], undefined, forecast[i], forecast_lower[i], forecast_upper[i]]);
    }
    return [columns, ...chart_data];
  }

  createCSV(response) {
    const {
        observed,
        trend,
        seasonal,
        forecast,
        forecast_ds,
        forecast_lower,
        forecast_upper
    } = response;

    // Date, Series, Trend, Seasonal, Forecast, Lower, Upper
    let csv_rows = [["Date", "Series", "Trend", "Seasonal", "Forecast", "Lower", "Upper"]];
    for (let i = 0; i < forecast.length; i++) {
        if (i < observed.length) csv_rows.push([forecast_ds[i],
                                                observed[i],
                                                trend[i],
                                                seasonal[i],
                                                forecast[i],
                                                forecast_lower[i],
                                                forecast_upper[i]]);
        else csv_rows.push([forecast_ds[i],
                            undefined,
                            undefined,
                            undefined,
                            forecast[i],
                            forecast_lower[i],
                            forecast_upper[i]]);
    }

    let csvContent = "";
    csv_rows.forEach(function(rowArray) {
        let row = rowArray.join(",");
        csvContent += row + "\r\n";
    });
    var blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    return URL.createObjectURL(blob);
  }

  handleFileUpload(files) {
    this.setState({ url: "" });
    if (files.length) {
        const reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = () => {
            let content = reader.result.replace(/^data:(.*;base64,)?/, "");
            if (reader.result) this.setState({ url: content, uploadedFile: files[0] });
        };
    }
  }

  canBeInvoked() { return this.state.url !== ""; }

  handleFormUpdate(event) {
    if (event.target.name === "sampleIndex") {
        let _url = this.state.samples[event.target.value].content;
        if (parseInt(event.target.value) > 1) {
            this.setState({ [event.target.name]: event.target.value, url: _url, uploadedFile: undefined });
        } else {
            this.setState({ [event.target.name]: event.target.value, url: "", uploadedFile: undefined });
        }
    }
    else this.setState({ [event.target.name]: event.target.value });
  }

  submitAction() {
    const { url, period, points } = this.state;
    const methodDescriptor = Forecast["forecast"];
    const request = new methodDescriptor.requestType();

    request.setUrl(url);
    request.setPeriod(period);
    request.setPoints(points);

    const props = {
      request,
      onEnd: response => {
        const { message, status, statusMessage } = response;
        if (status !== 0) {
          throw new Error(statusMessage);
        }
        this.setState({
          ...initialUserInput,
          response: {
            status: "success",
            observed: message.getObservedList(),
            trend: message.getTrendList(),
            seasonal: message.getSeasonalList(),
            forecast: message.getForecastList(),
            forecast_ds: message.getForecastDsList(),
            forecast_lower: message.getForecastLowerList(),
            forecast_upper: message.getForecastUpperList(),
          },
        });
      },
    };

    this.props.serviceClient.unary(methodDescriptor, props);
  }

  setValidationStatus(key, valid) {
    this.state.isValid[key] = valid;
  }

  render() {
    return (
      <React.Fragment>
        <Grid container direction="column" justify="center" spacing={2}>
          {!this.props.isComplete && (
            <Grid item xs={12} container justify="center" style={{ textAlign: "center" }}>
              <OutlinedDropDown
                id="sample"
                name="sampleIndex"
                label="Samples"
                fullWidth={true}
                list={this.state.samples}
                value={this.state.sampleIndex}
                onChange={this.handleFormUpdate}
              />
            </Grid>
          )}
          {!this.props.isComplete && this.state.sampleIndex === "0" && (
            <Grid item xs={12} container justify="center" style={{ textAlign: "center" }}>
                <FileUploader
                    name="csv"
                    type="file"
                    uploadedFiles={this.state.uploadedFile}
                    handleFileUpload={this.handleFileUpload}
                    setValidationStatus={valid => this.setValidationStatus("validCSV", valid)}
                    fileAccept=".csv"
                />
            </Grid>
          )}
          {!this.props.isComplete && this.state.sampleIndex !== "0" && (
            <Grid item xs={12} container justify="center" style={{ textAlign: "center" }}>
                <OutlinedTextArea
                    id="url"
                    name="url"
                    label="CSV File URL"
                    fullWidth={true}
                    value={this.state.url}
                    onChange={this.handleFormUpdate}
                />
            </Grid>
          )}
          {!this.props.isComplete && (
            <Grid item xs={12} container justify="center" spacing={2} style={{ textAlign: "center" }}>
                <Grid item xs={4} container justify="center" style={{ textAlign: "center" }}>
                    <OutlinedTextArea
                        id="period"
                        name="period"
                        label="Period (STL)"
                        type="number"
                        min={1}
                        max={300}
                        value={this.state.period}
                        onChange={this.handleFormUpdate}
                    />
                </Grid>
                <Grid item xs={4} container justify="center" style={{ textAlign: "center" }}>
                    <OutlinedTextArea
                        id="points"
                        name="points"
                        label="Points to Forecast"
                        type="number"
                        min={30}
                        max={500}
                        value={this.state.points}
                        onChange={this.handleFormUpdate}
                    />
                </Grid>
            </Grid>
          )}

          {this.props.isComplete && (
            <Grid item xs={12} style={{ textAlign: "center" }}>
                <Chart
                    width={"100%"}
                    height={"400px"}
                    chartType="ComboChart"
                    loader={<div className="spin-wrapper">
                                <CircularProgress
                                    color="primary"
                                    size={24}
                                    style={{ marginRight: 15 }}
                                /> Loading Chart ...
                            </div>}
                    data={this.createChartData(this.state.response)}
                    options={{
                        legend: { position: "none" },
                        colors: ['#000000'],
                        pointSize: 1,
                        explorer: {
                            actions: ["dragToZoom", "rightClickToReset"],
                            axis: "horizontal",
                            keepInBounds: true,
                            maxZoomIn: 4.0,
                        },
                        seriesType: 'scatter',
                        series: { 1: { type: 'line', color: '#0000FF' } },
                        intervals: { style: 'line' },
                        interval: {
                            i0: { style: 'line', color: '#87CEEB', lineWidth: 1 },
                            i1: { style: 'line', color: '#87CEEB', lineWidth: 1 }
                        },
                    }}
                    legendToggle
                />
            </Grid>
          )}
          {this.props.isComplete && (
            <Grid item xs={12} style={{ textAlign: "center" }}>
                <a href={this.createCSV(this.state.response)} download="fbprophet_forecast.csv">
                    Download CSV
                </a>
            </Grid>
          )}

          <Grid item xs container justify="flex-end">
            <Grid item>
              <HoverIcon text="View code on Github" href={this.state.code_repo}>
                <SvgIcon>
                  <path // Github Icon
                    d="M12.007 0C6.12 0 1.1 4.27.157 10.08c-.944 5.813 2.468 11.45 8.054 13.312.19.064.397.033.555-.084.16-.117.25-.304.244-.5v-2.042c-3.33.735-4.037-1.56-4.037-1.56-.22-.726-.694-1.35-1.334-1.756-1.096-.75.074-.735.074-.735.773.103 1.454.557 1.846 1.23.694 1.21 2.23 1.638 3.45.96.056-.61.327-1.178.766-1.605-2.67-.3-5.462-1.335-5.462-6.002-.02-1.193.42-2.35 1.23-3.226-.327-1.015-.27-2.116.166-3.09 0 0 1.006-.33 3.3 1.23 1.966-.538 4.04-.538 6.003 0 2.295-1.5 3.3-1.23 3.3-1.23.445 1.006.49 2.144.12 3.18.81.877 1.25 2.033 1.23 3.226 0 4.607-2.805 5.627-5.476 5.927.578.583.88 1.386.825 2.206v3.29c-.005.2.092.393.26.507.164.115.377.14.565.063 5.568-1.88 8.956-7.514 8.007-13.313C22.892 4.267 17.884.007 12.008 0z"
                  />
                </SvgIcon>
              </HoverIcon>
            </Grid>
            <Grid item>
              <HoverIcon text="User's guide" href={this.state.users_guide}>
                <InfoIcon />
              </HoverIcon>
            </Grid>
            <Grid item>
              <HoverIcon text="View original project" href={this.state.reference}>
                <SvgIcon>
                  <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 11.701c0 2.857-1.869 4.779-4.5 5.299l-.498-1.063c1.219-.459 2.001-1.822 2.001-2.929h-2.003v-5.008h5v3.701zm6 0c0 2.857-1.869 4.779-4.5 5.299l-.498-1.063c1.219-.459 2.001-1.822 2.001-2.929h-2.003v-5.008h5v3.701z" />
                </SvgIcon>
              </HoverIcon>
            </Grid>
          </Grid>

          {!this.props.isComplete && (
            <Grid item xs={12} style={{ textAlign: "center" }}>
              <Button variant="contained" color="primary" onClick={this.submitAction} disabled={!this.canBeInvoked()}>
                Invoke
              </Button>
            </Grid>
          )}
        </Grid>
      </React.Fragment>
    );
  }
}
