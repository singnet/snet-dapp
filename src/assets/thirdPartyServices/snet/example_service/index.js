import React from "react";
import { withStyles } from "@material-ui/styles";

import { Calculator } from "./example_service_pb_service";
import { useStyles } from "./styles";

const initialUserInput = { methodName: "Select a method", a: 0, b: 0 };

class ExampleService extends React.Component {
  constructor(props) {
    super(props);
    this.submitAction = this.submitAction.bind(this);
    this.handleFormUpdate = this.handleFormUpdate.bind(this);

    this.state = { ...initialUserInput };
  }

  canBeInvoked() {
    return this.state.methodName !== "Select a method";
  }

  handleFormUpdate(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  onKeyPressvalidator(event) {
    const keyCode = event.keyCode || event.which;
    if (!(keyCode == 8 || keyCode == 46) && (keyCode < 48 || keyCode > 57)) {
      event.preventDefault();
    } else {
      let dots = event.target.value.split(".");
      if (dots.length > 1 && keyCode == 46) event.preventDefault();
    }
  }

  submitAction() {
      const methodDescriptor = Calculator[this.state.methodName];
      const request = new methodDescriptor.requestType();
      request.setA(this.state.a);
      request.setB(this.state.b);

      const props = {
        request,
        onEnd: ({ message }) => {
          this.setState({ ...initialUserInput, response: { value: message.getValue() } });
        },
      };
      this.props.serviceClient.unary(methodDescriptor, props);
  }

  renderServiceMethodNames(serviceMethodNames) {
    const serviceNameOptions = ["Select a method", ...serviceMethodNames];
    return serviceNameOptions.map((serviceMethodName, index) => {
      return <option key={index}>{serviceMethodName}</option>;
    });
  }

  renderForm() {
    const { classes } = this.props;
    const serviceMethodNames = this.props.serviceClient.getMethodNames(Calculator);
    return (
      <React.Fragment>
        <div className={classes.exampleServiceMainContainer}>
          <div className="row">
            <div className="col-md-3 col-lg-3" style={{ padding: "10px", fontSize: "13px", marginLeft: "10px" }}>
              Method Name:{" "}
            </div>
            <div className="col-md-3 col-lg-3">
              <select
                name="methodName"
                value={this.state.methodName}
                style={{ height: "30px", width: "250px", fontSize: "13px", marginBottom: "5px" }}
                onChange={this.handleFormUpdate}
              >
                {this.renderServiceMethodNames(serviceMethodNames)}
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col-md-3 col-lg-3" style={{ padding: "10px", fontSize: "13px", marginLeft: "10px" }}>
              Number 1:{" "}
            </div>
            <div className="col-md-3 col-lg-3">
              <input
                name="a"
                type="number"
                style={{ height: "30px", width: "250px", fontSize: "13px", marginBottom: "5px" }}
                value={this.state.a}
                onChange={this.handleFormUpdate}
                onKeyPress={e => this.onKeyPressvalidator(e)}
              ></input>
            </div>
          </div>
          <div className="row">
            <div className="col-md-3 col-lg-3" style={{ padding: "10px", fontSize: "13px", marginLeft: "10px" }}>
              Number 2:{" "}
            </div>
            <div className="col-md-3 col-lg-3">
              <input
                name="b"
                type="number"
                style={{ height: "30px", width: "250px", fontSize: "13px", marginBottom: "5px" }}
                value={this.state.b}
                onChange={this.handleFormUpdate}
                onKeyPress={e => this.onKeyPressvalidator(e)}
              ></input>
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
        </div>
      </React.Fragment>
    );
  }

  parseResponse() {
    const { response } = this.state;
    if (typeof response !== "undefined") {
      if (typeof response === "string") {
        return response;
      }
      return response.value;
    }
  }

  renderComplete() {
    const response = this.parseResponse();

    return (
      <div>
        <p style={{ fontSize: "13px" }}>Response from service is {response} </p>
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

export default withStyles(useStyles)(ExampleService);
