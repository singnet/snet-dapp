import React from "react";
import { hasOwnDefinedProperty } from "../../../../utility/JSHelper";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import {Forecast} from "./time_series_forecast_pb_service"

const initialUserInput = {
  window_len: 1,
  word_len: 1,
  alphabet_size: 1,

  source_type: "csv",
  source: "",
  contract: "",

  start_date: "2010-01-01",
  end_date: "2019-02-11",
};


export default class CNTKLSTMForecast extends React.Component {
  constructor(props) {
    super(props);
    this.submitAction = this.submitAction.bind(this);
    this.handleFormUpdate = this.handleFormUpdate.bind(this);

    this.state = {
      ...initialUserInput,
      users_guide:
        "https://github.com/singnet/time-series-analysis/blob/master/docs/users_guide/generic/cntk-lstm-forecast.md",
      code_repo: "https://github.com/singnet/time-series-analysis/blob/master/generic/cntk-lstm-forecast",
      reference: "https://cntk.ai/pythondocs/CNTK_106B_LSTM_Timeseries_with_IOT_Data.html",

      serviceName: "Forecast",
      methodName: "forecast",
      response: undefined,
    };
    this.sourceTypes = ["csv", "financial"];
    this.isComplete = false;
    this.serviceMethods = [];
    this.allServices = [];
    this.methodsForAllServices = [];

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

  
 submitAction() {
    const { methodName, window_len, word_len, alphabet_size, source_type, source, contract, start_date, end_date} = this.state;
    const methodDescriptor = Forecast[methodName];
    const request = new methodDescriptor.requestType();
  
    request.setWindowLen(window_len);
    request.setWordLen(word_len);
    request.setAlphabetSize(alphabet_size);
    request.setSourceType(source_type);
    request.setSource(source);
    request.setContract(contract);
    request.setStartDate(start_date);
    request.setEndDate(end_date);
  
    const props = {
      request,
      onEnd: ({message}) => {
        this.setState({
          ...initialUserInput,
          response: { status: "success", last_sax_word: message.getLastSaxWord(), forecast_sax_letter: message.getForecastSaxLetter(), position_in_sax_interval: message.getPositionInSaxInterval() },
        });
      },
    };
    
    this.props.serviceClient.unary(methodDescriptor, props);
 
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
        
      <div style={{background:"#F8F8F8", padding: "24px"}}>
        <h4> Results</h4>
        <div style={{ padding: "10px 10px 0 10px", fontSize: "14px", color:"#9b9b9b" }}>
          <div style={{ padding: "10px 0",borderBottom: "1px solid #eee" }}>Status: <span style={{color:"#212121"}}>{status}</span></div>
          <div style={{ padding: "10px 0",borderBottom: "1px solid #eee" }}>Word (SAX) : <span style={{color:"#212121"}}>{last_sax_word}</span></div>
          <div style={{ padding: "10px 0",borderBottom: "1px solid #eee" }}>Forecast Letter (SAX) : <span style={{color:"#212121"}}>{forecast_sax_letter}</span></div>
          <div style={{ padding: "10px 0",borderBottom: "1px solid #eee" }}>Position in Interval (SAX) : <span style={{color:"#212121"}}>{position_in_sax_interval}</span></div>         
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
