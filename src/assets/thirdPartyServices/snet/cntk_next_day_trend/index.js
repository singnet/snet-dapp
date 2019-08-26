import React from "react";
import { hasOwnDefinedProperty } from "../../../../utility/JSHelper";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import {NextDayTrend} from "./next_day_trend_pb_service"

const initialUserInput = {
  source: "",
  contract: "",
  start: "2010-01-01",
  end: "2018-02-11",
  target_date: "2019-02-11",
};


export default class CNTKNextDayTrend extends React.Component {
  constructor(props) {
    super(props);
    this.submitAction = this.submitAction.bind(this);
    this.handleFormUpdate = this.handleFormUpdate.bind(this);

    this.state = {
      ...initialUserInput,
      users_guide:
        "https://github.com/singnet/time-series-analysis/blob/master/docs/users_guide/finance/cntk-next-day-trend.md",
      code_repo: "https://github.com/singnet/time-series-analysis/blob/master/finance/cntk-next-day-trend",
      reference: "https://cntk.ai/pythondocs/CNTK_104_Finance_Timeseries_Basic_with_Pandas_Numpy.html",

      serviceName: "NextDayTrend",
      methodName: "trend",
      response: undefined,
    };
    this.isComplete = false;
    this.serviceMethods = [];
    this.allServices = [];
    this.methodsForAllServices = [];
    
  }

  canBeInvoked() {
    return this.state.source && this.state.contract && this.state.start < this.state.end;
  }

  handleFormUpdate(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  submitAction() {
    const { methodName, source, contract, start, end, target_date } = this.state;
    const methodDescriptor = NextDayTrend[methodName];
    const request = new methodDescriptor.requestType();


    request.setSource(source);
    request.setContract(contract);
    request.setStart(start);
    request.setEnd(end);
    request.setTargetDate(target_date);

    const props = {
      request,
      onEnd: ({message}) => {
        this.setState({
          ...initialUserInput,
          response: { status: "success", response: message.getResponse() },
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
            Source:{" "}
          </div>
          <div className="col-md-3 col-lg-3">
            <input
              name="source"
              type="text"
              style={{ height: "30px", width: "250px", fontSize: "13px", marginBottom: "5px" }}
              placeholder={"eg: yahoo"}
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
              placeholder={"eg: SPY"}
              value={this.state.contract}
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
              name="start"
              id="start"
              type="date"
              style={{ width: "100%" }}
              InputLabelProps={{
                shrink: true,
              }}
              value={this.state.start}
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
              name="end"
              id="end"
              type="date"
              style={{ width: "100%" }}
              InputLabelProps={{
                shrink: true,
              }}
              value={this.state.end}
              onChange={this.handleFormUpdate}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-3 col-lg-3" style={{ padding: "10px", fontSize: "13px", marginLeft: "10px" }}>
            Target Date:{" "}
          </div>
          <div className="col-md-3 col-lg-3" style={{ width: "280px" }}>
            <TextField
              name="target_date"
              id="target_date"
              type="date"
              style={{ width: "100%" }}
              InputLabelProps={{
                shrink: true,
              }}
              value={this.state.target_date}
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
    let trend = "\n";

    if (typeof this.state.response === "object") {
      trend = this.state.response.response;
    } else {
      status = this.state.response + "\n";
    }
    return (
        
      <div style={{background:"#F8F8F8", padding: "24px"}}>
        <h4> Results</h4>
        <div style={{ padding: "10px 10px 0 10px", fontSize: "14px", color:"#9b9b9b" }}>
          <div style={{ padding: "10px 0",borderBottom: "1px solid #eee" }}>Status: <span style={{color:"#212121"}}>{status}</span></div>
          <div style={{ padding: "10px 0" }}>Trend: <span style={{color:"#212121"}}>{trend}</span></div>       
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
