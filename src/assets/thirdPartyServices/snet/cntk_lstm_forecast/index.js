import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import SvgIcon from "@material-ui/core/SvgIcon";
import InfoIcon from "@material-ui/icons/Info";

import HoverIcon from "../../standardComponents/HoverIcon";
import OutlinedDropDown from "../../common/OutlinedDropdown";
import OutlinedTextArea from "../../common/OutlinedTextArea";

import { Forecast } from "./time_series_forecast_pb_service";

const initialUserInput = {
  sourceIndex: "0",
  sourceTypes: [
    {
      label: "Financial",
      content: "financial",
      value: "0",
    },
    {
      label: "CSV File",
      content: "csv",
      value: "1",
    },
  ],

  window_len: "20",
  word_len: "8",
  alphabet_size: "5",

  source: "",
  contract: "",

  start_date: "2010-01-01",
  end_date: "2020-02-21",
};

export default class CNTKLSTMForecast extends React.Component {
  constructor(props) {
    super(props);
    this.submitAction = this.submitAction.bind(this);
    this.handleFormUpdate = this.handleFormUpdate.bind(this);

    this.state = {
      ...initialUserInput,
      users_guide: "https://singnet.github.io/time-series-analysis/users_guide/generic/cntk-lstm-forecast.html",
      code_repo: "https://github.com/singnet/time-series-analysis/blob/master/generic/cntk-lstm-forecast",
      reference: "https://cntk.ai/pythondocs/CNTK_106B_LSTM_Timeseries_with_IOT_Data.html",
      response: undefined,
    };
  }

  isValidCSVURL(str) {
    return (str.startsWith("http://") || str.startsWith("https://")) && str.endsWith(".csv");
  }

  canBeInvoked() {
    const { sourceIndex, sourceTypes } = this.state;
    const source_type = sourceTypes[sourceIndex].content;
    if (source_type === "csv") {
      if (this.isValidCSVURL(this.state.source)) {
        return this.state.start_date < this.state.end_date;
      }
      return false;
    }
    return this.state.contract && this.state.start_date < this.state.end_date;
  }

  handleFormUpdate(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  submitAction() {
    const {
      sourceIndex,
      sourceTypes,
      window_len,
      word_len,
      alphabet_size,
      source,
      contract,
      start_date,
      end_date,
    } = this.state;
    const methodDescriptor = Forecast["forecast"];
    const request = new methodDescriptor.requestType();

    const source_type = sourceTypes[sourceIndex].content;

    request.setWindowLen(window_len);
    request.setWordLen(word_len);
    request.setAlphabetSize(alphabet_size);
    request.setSourceType(source_type);
    if (source_type === "financial") request.setSource("yahoo");
    else request.setSource(source);
    request.setContract(contract);
    request.setStartDate(start_date);
    request.setEndDate(end_date);

    const props = {
      request,
      onEnd: ({ message }) => {
        this.setState({
          ...initialUserInput,
          response: {
            status: "success",
            last_sax_word: message.getLastSaxWord(),
            forecast_sax_letter: message.getForecastSaxLetter(),
            position_in_sax_interval: message.getPositionInSaxInterval(),
          },
        });
      },
    };

    this.props.serviceClient.unary(methodDescriptor, props);
  }

  renderForm() {
    return (
      <React.Fragment>
        <Grid container direction="column" alignItems="center" justify="center">
          <Grid item xs={8} container style={{ textAlign: "center" }}>
            <OutlinedDropDown
              id="source_type"
              name="sourceIndex"
              label="Source Type"
              fullWidth={true}
              list={this.state.sourceTypes}
              value={this.state.sourceIndex}
              onChange={this.handleFormUpdate}
            />
          </Grid>

          <Grid item xs={8} container style={{ textAlign: "center" }}>
            <OutlinedTextArea
              id="source"
              name="source"
              label="CSV File URL"
              type="text"
              fullWidth={true}
              value={this.state.source}
              rows={1}
              onChange={this.handleFormUpdate}
            />
          </Grid>

          <Grid item xs={8} container style={{ textAlign: "center" }}>
            <OutlinedTextArea
              id="contract"
              name="contract"
              label="Contract (Financial)"
              type="text"
              fullWidth={true}
              value={this.state.contract}
              rows={1}
              onChange={this.handleFormUpdate}
            />
          </Grid>

          <Grid item xs={8} container spacing={1}>
            <Grid item xs>
              <OutlinedTextArea
                id="window_len"
                name="window_len"
                type="number"
                label="SAX Window Length"
                value={this.state.window_len}
                min={1}
                fullWidth={true}
                onChange={this.handleFormUpdate}
              />
            </Grid>
            <Grid item xs>
              <OutlinedTextArea
                id="word_len"
                name="word_len"
                type="number"
                label="SAX Word Length"
                value={this.state.word_len}
                min={1}
                fullWidth={true}
                onChange={this.handleFormUpdate}
              />
            </Grid>
            <Grid item xs>
              <OutlinedTextArea
                id="alphabet_size"
                name="alphabet_size"
                type="number"
                label="SAX Alphabet Size"
                value={this.state.alphabet_size}
                min={1}
                fullWidth={true}
                onChange={this.handleFormUpdate}
              />
            </Grid>
          </Grid>

          <Grid item xs={8} container spacing={1}>
            <Grid item xs>
              <OutlinedTextArea
                id="start_date"
                name="start_date"
                label="Start Date"
                type="date"
                value={this.state.start_date}
                rows={1}
                fullWidth={true}
                onChange={this.handleFormUpdate}
              />
            </Grid>

            <Grid item xs>
              <OutlinedTextArea
                id="end_date"
                name="end_date"
                label="End Date"
                type="date"
                value={this.state.end_date}
                rows={1}
                fullWidth={true}
                onChange={this.handleFormUpdate}
              />
            </Grid>
          </Grid>

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

          <Grid item xs={12} container justify="center" style={{ textAlign: "center" }}>
            <Button variant="contained" color="primary" onClick={this.submitAction} disabled={!this.canBeInvoked()}>
              Invoke
            </Button>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }

  renderComplete() {
    let status = "Ok\n";
    let last_sax_word = "\n";
    let forecast_sax_letter = "\n";
    let position_in_sax_interval = "\n";

    if (typeof this.state.response === "object") {
      last_sax_word = this.state.response.last_sax_word + "\n";
      forecast_sax_letter = this.state.response.forecast_sax_letter + "\n";
      position_in_sax_interval = this.state.response.position_in_sax_interval;
    } else {
      status = this.state.response + "\n";
    }
    return (
      <div style={{ background: "#F8F8F8", padding: "24px" }}>
        <h4> Results</h4>
        <div style={{ padding: "10px 10px 0 10px", fontSize: "14px", color: "#9b9b9b" }}>
          <div style={{ padding: "10px 0", borderBottom: "1px solid #eee" }}>
            Status: <span style={{ color: "#212121" }}>{status}</span>
          </div>
          <div style={{ padding: "10px 0", borderBottom: "1px solid #eee" }}>
            Word (SAX) : <span style={{ color: "#212121" }}>{last_sax_word}</span>
          </div>
          <div style={{ padding: "10px 0", borderBottom: "1px solid #eee" }}>
            Forecast Letter (SAX) : <span style={{ color: "#212121" }}>{forecast_sax_letter}</span>
          </div>
          <div style={{ padding: "10px 0", borderBottom: "1px solid #eee" }}>
            Position in Interval (SAX) : <span style={{ color: "#212121" }}>{position_in_sax_interval}</span>
          </div>
        </div>
      </div>
    );
  }

  render() {
    if (this.props.isComplete) return <div>{this.renderComplete()}</div>;
    else {
      return <div>{this.renderForm()}</div>;
    }
  }
}
