import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import OutlinedDropDown from "../../common/OutlinedDropdown";
import OutlinedTextArea from "../../common/OutlinedTextArea";

import { Calculator } from "./example_service_pb_service";

const initialUserInput = {
  methodIndex: "0",
  methodNames: [
    {
      label: "Addition",
      content: "add",
      value: "0",
    },
    {
      label: "Subtraction",
      content: "sub",
      value: "1",
    },
    {
      label: "Multiplication",
      content: "mul",
      value: "2",
    },
    {
      label: "Division",
      content: "div",
      value: "3",
    }
  ],
  a: "0",
  b: "0",
};

export default class ExampleService extends React.Component {
  constructor(props) {
    super(props);
    this.submitAction = this.submitAction.bind(this);
    this.handleFormUpdate = this.handleFormUpdate.bind(this);
    this.state = { ...initialUserInput };
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
    const { methodIndex, methodNames } = this.state;
    const methodDescriptor = Calculator[methodNames[methodIndex].content];
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

  handleFocus = event => event.target.select();

  renderForm() {
    return (
      <React.Fragment>
        <Grid container direction="column" alignItems="center" justify="center">
          <Grid item xs={6} container style={{ textAlign: "center" }}>
            <OutlinedDropDown
              id="method"
              name="methodIndex"
              label="Method"
              fullWidth={true}
              list={this.state.methodNames}
              value={this.state.methodIndex}
              onChange={this.handleFormUpdate}
            />
          </Grid>

          <Grid item xs={6} container spacing={1}>
            <Grid item xs>
              <OutlinedTextArea
                id="number_a"
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

            <Grid item xs>
              <OutlinedTextArea
                id="number_b"
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
          </Grid>

          <Grid item xs={12} style={{ textAlign: "center" }}>
            <Button variant="contained" color="primary" onClick={this.submitAction}>
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
      <Grid item xs={12} container justify="center">
        <p style={{ fontSize: "20px" }}>Response from service: {response} </p>
      </Grid>
    );
  }

  render() {
    if (this.props.isComplete) return <div>{this.renderComplete()}</div>;
    else {
      return <div>{this.renderForm()}</div>;
    }
  }
}
