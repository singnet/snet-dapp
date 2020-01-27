import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import OutlinedDropDown from "../../common/OutlinedDropdown";
import OutlinedTextArea from "../../common/OutlinedTextArea";

import { Calculator } from "./example_service_pb_service";

const initialUserInput = {
  methodIndex: 0,
  methodName: {
    0: "Select a method",
    1: "add",
    2: "sub",
    3: "mul",
    4: "div",
  },
  a: 0,
  b: 0,
};

export default class ExampleService extends React.Component {
  constructor(props) {
    super(props);
    this.submitAction = this.submitAction.bind(this);
    this.handleFormUpdate = this.handleFormUpdate.bind(this);

    this.textInput = React.createRef();

    this.state = { ...initialUserInput };
  }

  canBeInvoked() {
    return this.state.methodIndex !== 0;
  }

  handleFormUpdate(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  onKeyPressvalidator(event) {
    const keyCode = event.keyCode || event.which;
    if (!(keyCode === 8 || keyCode === 46) && (keyCode < 48 || keyCode > 57)) {
      event.preventDefault();
    } else {
      let dots = event.target.value.split(".");
      if (dots.length > 1 && keyCode === 46) event.preventDefault();
    }
  }

  submitAction() {
    const methodDescriptor = Calculator[this.state.methodName[this.state.methodIndex]];
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
    const serviceMap = {
      "Select a method": "Select a method",
      add: "Addition",
      sub: "Subtraction",
      mul: "Multiplication",
      div: "Division",
    };
    return serviceNameOptions.map((serviceMethodName, index) => {
      return {
        label: serviceMap[serviceMethodName],
        content: serviceMap[serviceMethodName],
        value: index,
      };
    });
  }

  handleFocus = event => event.target.select();

  renderForm() {
    const serviceMethodNames = this.props.serviceClient.getMethodNames(Calculator);
    const methodNamesList = this.renderServiceMethodNames(serviceMethodNames);
    return (
      <React.Fragment>
        <Grid container direction="column" justify="center">
          <Grid item xs={4} style={{ textAlign: "left" }}>
            <OutlinedDropDown
              id="method"
              name="methodIndex"
              label="Method"
              fullWidth={true}
              list={methodNamesList}
              value={this.state.methodIndex}
              onChange={this.handleFormUpdate}
            />
          </Grid>

          <Grid item xs={4} style={{ textAlign: "left" }}>
            <OutlinedTextArea
              id="number_a"
              ref={this.textInput}
              name="a"
              label="Number 1"
              type="number"
              fullWidth={false}
              value={this.state.a}
              rows={1}
              onChange={this.handleFormUpdate}
              onKeyPress={e => this.onKeyPressvalidator(e)}
              onFocus={this.handleFocus}
            />
          </Grid>

          <Grid item xs={4} style={{ textAlign: "left" }}>
            <OutlinedTextArea
              id="number_b"
              ref={this.textInput}
              name="b"
              label="Number 2"
              type="number"
              fullWidth={false}
              value={this.state.b}
              rows={1}
              onChange={this.handleFormUpdate}
              onKeyPress={e => this.onKeyPressvalidator(e)}
              onFocus={this.handleFocus}
            />
          </Grid>

          <Grid item xs={12} style={{ textAlign: "center" }}>
            <Button variant="contained" color="primary" onClick={this.submitAction} disabled={!this.canBeInvoked()}>
              Invoke
            </Button>
          </Grid>
        </Grid>
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
