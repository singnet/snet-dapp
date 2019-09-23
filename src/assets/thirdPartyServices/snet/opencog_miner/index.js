import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

import {OpencogServices} from "./opencog_pb_service"
import { TextField } from "material-ui";

const initialUserInput = {
  methodName: "Execute",
  dataset: undefined,
  minsup: undefined,
  maximum_iterations: undefined,
  conjunction_expansion: undefined,
  max_conjuncts: undefined,
  max_variables: undefined,
  surprisingness: undefined,
};

export default class OpenCogMiner extends React.Component {
  constructor(props) {
    super(props);
    this.handleFormUpdate = this.handleFormUpdate.bind(this);
    this.submitAction = this.submitAction.bind(this);
    this.handleInputUpdate = this.handleInputUpdate.bind(this);

    this.state = {
      ...initialUserInput,
      serviceName: "OpencogServices",
      response: undefined,
    };
  }

  canBeInvoked() {
    // When the image isn't uploaded yet and when function name isn't yet given.
    return this.state.methodName !== "Select a method" && 
           this.state.dataset !== "" && 
           this.state.minsup !== "" &&
           this.state.maximum_iterations !== "" && 
           this.state.conjunction_expansion !== "" &&  
           this.state.max_conjuncts !== "" && 
           this.state.max_variables !== "" && 
           this.state.surprisingness !== "";
  }

  handleFormUpdate(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  submitAction() {
    const { methodName,
            dataset,
            minsup,
            maximum_iterations,
            conjunction_expansion,
            max_conjuncts,
            max_variables,
            surprisingness} = this.state;

    const methodDescriptor = OpencogServices[methodName];
    const request = new methodDescriptor.requestType();
    
    const cmd = ["sync",
                 "Miner",
                 dataset,
                 minsup,
                 maximum_iterations,
                 conjunction_expansion,
                 max_conjuncts,
                 max_variables,
                 surprisingness];

    request.setInput(cmd);

    const props = {
      request,
      onEnd: response => {
        const { message, status, statusMessage } = response;
        if (status !== 0) {
          throw new Error(statusMessage);
        }
        this.setState({
          response: { status: "success", mined: message.toObject() },
        });
      },
    };

    this.props.serviceClient.unary(methodDescriptor, props);
  }

  handleInputUpdate(event) {
    this.setState({ sentence: event.target.value });
  }

  renderForm() {

    return (
      <React.Fragment>
        <div className="row" align=" center">
            <TextField
              id="standard-multiline-static"
              label="Dataset"
              style={{ width: "100%" }}
              InputProps={{
                style: { fontSize: 15 },
              }}
              InputLabelProps={{
                style: { fontSize: 15 },
              }}
              value={this.state.dataset}
              name="dataset"
              onChange={this.handleFormUpdate}
              rows="6"
              defaultValue=""
              margin="normal"
            />
        </div>
        
        <div className="row" align=" center">
            <TextField
              id="standard-multiline-static"
              label="Minsup"
              style={{ width: "100%" }}
              InputProps={{
                style: { fontSize: 15 },
              }}
              InputLabelProps={{
                style: { fontSize: 15 },
              }}
              value={this.state.minsup}
              name="minsup"
              onChange={this.handleFormUpdate}
              rows="6"
              defaultValue=""
              margin="normal"
            />
        </div>

        <div className="row" align=" center">
            <TextField
              id="standard-multiline-static"
              label="Maximum Iterations"
              style={{ width: "100%" }}
              InputProps={{
                style: { fontSize: 15 },
              }}
              InputLabelProps={{
                style: { fontSize: 15 },
              }}
              value={this.state.maximum_iterations}
              name="maximum_iterations"
              onChange={this.handleFormUpdate}
              rows="6"
              defaultValue=""
              margin="normal"
            />  
        </div>

        <div className="row" align=" center">
            <TextField
              id="standard-multiline-static"
              label="Conjunction Expansion"
              style={{ width: "100%" }}
              InputProps={{
                style: { fontSize: 15 },
              }}
              InputLabelProps={{
                style: { fontSize: 15 },
              }}
              value={this.state.conjunction_expansion}
              name="conjunction_expansion"
              onChange={this.handleFormUpdate}
              rows="6"
              defaultValue=""
              margin="normal"
            />
        </div>

        <div className="row" align=" center">
            <TextField
              id="standard-multiline-static"
              label="Max Conjunctions"
              style={{ width: "100%" }}
              InputProps={{
                style: { fontSize: 15 },
              }}
              InputLabelProps={{
                style: { fontSize: 15 },
              }}
              value={this.state.max_conjuncts}
              name="max_conjuncts"
              onChange={this.handleFormUpdate}
              rows="6"
              defaultValue=""
              margin="normal"
            />
        </div>

        <div className="row" align=" center">
            <TextField
              id="standard-multiline-static"
              label="Max Variables"
              style={{ width: "100%" }}
              InputProps={{
                style: { fontSize: 15 },
              }}
              InputLabelProps={{
                style: { fontSize: 15 },
              }}
              value={this.state.max_variables}
              name="max_variables"
              onChange={this.handleFormUpdate}
              rows="6"
              defaultValue=""
              margin="normal"
            />
        </div>

        <div className="row" align=" center">
            <TextField
              id="standard-multiline-static"
              label="Surprisingness"
              style={{ width: "100%" }}
              InputProps={{
                style: { fontSize: 15 },
              }}
              InputLabelProps={{
                style: { fontSize: 15 },
              }}
              value={this.state.surprisingness}
              name="surprisingness"
              onChange={this.handleFormUpdate}
              rows="6"
              defaultValue=""
              margin="normal"
            />
        </div>

        <div className="row" align=" center">
          <button
            type=" button"
            className=" btn btn-primary"
            disabled={!this.canBeInvoked()}
            onClick={this.submitAction}
          >
            Call OpenCog Patter Miner
          </button>
        </div>
      </React.Fragment>
    );
  }

  renderComplete() {
    const { response } = this.state;

    return (
      <div style={{ background: "#F8F8F8", padding: "24px" }}>
        <h4> Results</h4>
        <div style={{ padding: "10px 10px 0 10px", fontSize: "14px", color: "#9b9b9b" }}>
          <div style={{ padding: "10px 0" }}>
            {response.mined}
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
