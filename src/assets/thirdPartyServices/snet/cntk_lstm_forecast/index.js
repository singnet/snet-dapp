import React from "react";
import { hasOwnDefinedProperty } from "../../../../utility/JSHelper";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

export default class CNTKLSTMForecast extends React.Component {
  constructor(props) {
    super(props);
    this.submitAction = this.submitAction.bind(this);
    this.handleServiceName = this.handleServiceName.bind(this);
    this.handleFormUpdate = this.handleFormUpdate.bind(this);
    this.getServiceMethods = this.getServiceMethods.bind(this);

    this.state = {
      users_guide:
        "https://github.com/singnet/time-series-analysis/blob/master/docs/users_guide/generic/cntk-lstm-forecast.md",
      code_repo: "https://github.com/singnet/time-series-analysis/blob/master/generic/cntk-lstm-forecast",
      reference: "https://cntk.ai/pythondocs/CNTK_106B_LSTM_Timeseries_with_IOT_Data.html",

      serviceName: "Forecast",
      methodName: "forecast",

      window_len: 1,
      word_len: 1,
      alphabet_size: 1,

      source_type: "csv",
      source: "",
      contract: "",

      start_date: "2010-01-01",
      end_date: "2019-02-11",

      response: undefined,
    };
    this.sourceTypes = ["csv", "financial"];
    this.isComplete = false;
    this.serviceMethods = [];
    this.allServices = [];
    this.methodsForAllServices = [];
    this.parseProps(props);
  }

  parseProps(nextProps) {
    this.isComplete = nextProps.isComplete;
    if (!this.isComplete) {
      this.parseServiceSpec(nextProps.serviceSpec);
    } else {
      console.log(nextProps.response);
      if (typeof nextProps.response !== "undefined") {
        this.state.response = nextProps.response;
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.isComplete !== nextProps.isComplete) {
      this.parseProps(nextProps);
    }
  }

  parseServiceSpec(serviceSpec) {
    const packageName = Object.keys(serviceSpec.nested).find(
      key => typeof serviceSpec.nested[key] === "object" && hasOwnDefinedProperty(serviceSpec.nested[key], "nested")
    );

    var objects = undefined;
    var items = undefined;
    if (typeof packageName !== "undefined") {
      items = serviceSpec.lookup(packageName);
      objects = Object.keys(items);
    } else {
      items = serviceSpec.nested;
      objects = Object.keys(serviceSpec.nested);
    }

    this.methodsForAllServices = [];
    objects.map(rr => {
      if (typeof items[rr] === "object" && items[rr] !== null && items[rr].hasOwnProperty("methods")) {
        this.allServices.push(rr);
        this.methodsForAllServices.push(rr);
        this.methodsForAllServices[rr] = Object.keys(items[rr]["methods"]);
      }
    });
    this.getServiceMethods(this.allServices[0]);
  }

  getServiceMethods(strService) {
    this.setState({
      serviceName: strService,
    });
    var data = this.methodsForAllServices[strService];
    if (typeof data === "undefined") {
      data = [];
    }
    this.serviceMethods = data;
  }

  isValidCSVURL(str) {
    return (str.startsWith("http://") || str.startsWith("https://")) && str.endsWith(".csv");
  }

  canBeInvoked() {
    if (this.state.source_type === "csv") {
      if (this.isValidCSVURL(this.state.source)) {
        return this.state.start_date < this.state.end_date;
      }
      return false;
    }
    return this.state.source && this.state.contract && this.state.start_date < this.state.end_date;
  }

  handleFormUpdate(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleServiceName(event) {
    var strService = event.target.value;
    this.setState({
      serviceName: strService,
    });
    console.log("Selected service is " + strService);
    var data = this.methodsForAllServices[strService];
    if (typeof data === "undefined") {
      data = [];
    }
    this.serviceMethods = data;
  }

  submitAction() {
    this.props.callApiCallback(this.state.serviceName, this.state.methodName, {
      window_len: this.state.window_len,
      word_len: this.state.word_len,
      alphabet_size: this.state.alphabet_size,
      source_type: this.state.source_type,
      source: this.state.source,
      contract: this.state.contract,
      start_date: this.state.start_date,
      end_date: this.state.end_date,
    });
  }

  renderForm() {
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-md-3 col-lg-3" style={{ padding: "10px", fontSize: "13px", marginLeft: "10px" }}>
            Source Type:{" "}
          </div>
          <div className="col-md-3 col-lg-3">
            <select
              name="source_type"
              style={{ height: "30px", width: "250px", fontSize: "13px", marginBottom: "5px" }}
              onChange={this.handleFormUpdate}
            >
              {this.sourceTypes.map((row, index) => (
                <option key={index}>{row}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="row">
          <div className="col-md-3 col-lg-3" style={{ padding: "10px", fontSize: "13px", marginLeft: "10px" }}>
            Source:{" "}
          </div>
          <div className="col-md-3 col-lg-3">
            <input
              name="source"
              type="text"
              style={{ height: "30px", width: "250px", fontSize: "13px", marginBottom: "5px" }}
              placeholder={"URL (csv) or yahoo (financial)"}
              value={this.state.source}
              onChange={this.handleFormUpdate}
            ></input>
          </div>
        </div>
        <div className="row">
          <div className="col-md-3 col-lg-3" style={{ padding: "10px", fontSize: "13px", marginLeft: "10px" }}>
            Contract:{" "}
          </div>
          <div className="col-md-3 col-lg-3">
            <input
              name="contract"
              type="text"
              style={{ height: "30px", width: "250px", fontSize: "13px", marginBottom: "5px" }}
              placeholder={"eg: SPY (financial)"}
              value={this.state.contract}
              onChange={this.handleFormUpdate}
            ></input>
          </div>
        </div>
        <div className="row">
          <div className="col-md-3 col-lg-3" style={{ padding: "10px", fontSize: "13px", marginLeft: "10px" }}>
            SAX Window Length:{" "}
          </div>
          <div className="col-md-3 col-lg-3">
            <input
              name="window_len"
              type="number"
              min="1"
              style={{ height: "30px", width: "250px", fontSize: "13px", marginBottom: "5px" }}
              value={this.state.window_len}
              onChange={this.handleFormUpdate}
            ></input>
          </div>
        </div>
        <div className="row">
          <div className="col-md-3 col-lg-3" style={{ padding: "10px", fontSize: "13px", marginLeft: "10px" }}>
            SAX Word Length:{" "}
          </div>
          <div className="col-md-3 col-lg-3">
            <input
              name="word_len"
              type="number"
              min="1"
              style={{ height: "30px", width: "250px", fontSize: "13px", marginBottom: "5px" }}
              value={this.state.word_len}
              onChange={this.handleFormUpdate}
            ></input>
          </div>
        </div>
        <div className="row">
          <div className="col-md-3 col-lg-3" style={{ padding: "10px", fontSize: "13px", marginLeft: "10px" }}>
            SAX Alphabet Size:{" "}
          </div>
          <div className="col-md-3 col-lg-3">
            <input
              name="alphabet_size"
              type="number"
              min="1"
              style={{ height: "30px", width: "250px", fontSize: "13px", marginBottom: "5px" }}
              value={this.state.alphabet_size}
              onChange={this.handleFormUpdate}
            ></input>
          </div>
        </div>
        <div className="row">
          <div className="col-md-3 col-lg-3" style={{ padding: "10px", fontSize: "13px", marginLeft: "10px" }}>
            Start Date:{" "}
          </div>
          <div className="col-md-3 col-lg-3" style={{ width: "280px" }}>
            <TextField
              name="start_date"
              id="start_date"
              type="date"
              style={{ width: "100%" }}
              InputLabelProps={{
                shrink: true,
              }}
              value={this.state.start_date}
              onChange={this.handleFormUpdate}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-3 col-lg-3" style={{ padding: "10px", fontSize: "13px", marginLeft: "10px" }}>
            End Date:{" "}
          </div>
          <div className="col-md-3 col-lg-3" style={{ width: "280px" }}>
            <TextField
              name="end_date"
              id="end_date"
              type="date"
              style={{ width: "100%" }}
              InputLabelProps={{
                shrink: true,
              }}
              value={this.state.end_date}
              onChange={this.handleFormUpdate}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-3 col-lg-3" style={{ padding: "10px", fontSize: "13px", marginLeft: "10px" }}>
            About:{" "}
          </div>
          <div className="col-xs-3 col-xs-2">
            <Button target="_blank" href={this.state.users_guide} style={{ fontSize: "13px", marginLeft: "10px" }}>
              Guide
            </Button>
          </div>
          <div className="col-xs-3 col-xs-2">
            <Button target="_blank" href={this.state.code_repo} style={{ fontSize: "13px", marginLeft: "10px" }}>
              Code
            </Button>
          </div>
          <div className="col-xs-3 col-xs-2">
            <Button target="_blank" href={this.state.reference} style={{ fontSize: "13px", marginLeft: "10px" }}>
              Reference
            </Button>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 col-lg-6" style={{ textAlign: "right" }}>
            <button
              type="button"
              className="btn btn-primary"
              onClick={this.submitAction}
              disabled={!this.canBeInvoked()}
            >
              Invoke
            </button>
          </div>
        </div>
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
      <div>
        <p style={{ fontSize: "13px" }}>Response from service is: </p>
        <pre>
          Status : {status}
          Word (SAX) : {last_sax_word}
          Forecast Letter (SAX) : {forecast_sax_letter}
          Position in Interval (SAX): {position_in_sax_interval}
        </pre>
      </div>
    );
  }

  render() {
    if (this.isComplete) return <div>{this.renderComplete()}</div>;
    else {
      return <div>{this.renderForm()}</div>;
    }
  }
}
