import React from "react";

import { OpencogServices } from "./opencog_pb_service"
import TextField from "@material-ui/core/TextField"
import { makeStyles } from '@material-ui/core/styles'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'

const initialUserInput = {
  methodName: "Execute",
  dataset: "https://raw.githubusercontent.com/singnet/miner/master/examples/miner/ugly-male-soda-drinker/kb.scm",
  minfreq: 0,
  minsup: 5,
  maximum_iterations: 100,
  max_conjuncts: 3,
  max_variables: 2,
  example_radial_value: "ugly-male-soda-drinker",
};

export default class OpenCogMiner extends React.Component {
  constructor(props) {
    super(props);
    this.handleFormUpdate = this.handleFormUpdate.bind(this);
    this.submitAction = this.submitAction.bind(this);
    this.handleInputUpdate = this.handleInputUpdate.bind(this);
    this.handleRadialButtonUpdate = this.handleRadialButtonUpdate.bind(this);

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
           this.state.minfreq !== "" &&
           this.state.minsup !== "" &&
           this.state.maximum_iterations !== "" && 
           this.state.max_conjuncts !== "" && 
           this.state.max_variables !== ""
  }

  handleFormUpdate(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  submitAction() {
    const { methodName,
            dataset,
            minfreq,
            minsup,
            maximum_iterations,
            max_conjuncts,
            max_variables} = this.state;

    const methodDescriptor = OpencogServices[methodName];
    const request = new methodDescriptor.requestType();
    
    const cmd = ["Miner",
                 dataset,
                 minfreq,
                 minsup,
                 maximum_iterations,
                 max_conjuncts,
                 max_variables];

    request.setInputList(cmd);

    const props = {
      request,
      onEnd: response => {
        const { message, status, statusMessage } = response;
        if (status !== 0) {
          throw new Error(statusMessage);
        }
        this.setState({
          response: { status: "success", mined: message.getOutput() },
        });
      },
    };

    this.props.serviceClient.unary(methodDescriptor, props);
  }

  handleInputUpdate(event) {
    this.setState({ sentence: event.target.value });
  }

  handleRadialButtonUpdate(event) {
    if (event.target.value == "ugly-male-soda-drinker") {
        this.state.dataset = "https://raw.githubusercontent.com/singnet/miner/master/examples/miner/ugly-male-soda-drinker/kb.scm";
        this.state.minfreq = 0;
        this.state.minsup = 5;
        this.state.maximum_iterations = 100;
        this.state.max_conjuncts = 3;
        this.state.max_variables = 2;
    }

    if (event.target.value == "mozi-ai") {
      this.state.dataset = "https://raw.githubusercontent.com/Ophien/opencog-pattern-miner-examples/master/mozi-ai-sample.scm";
      this.state.minfreq = 0.001;
      this.state.minsup = 0;
      this.state.maximum_iterations = 1000;
      this.state.max_conjuncts = 3;
      this.state.max_variables = 2;
    }

    if (event.target.value == "custom") {
      this.state.dataset = "";
      this.state.minfreq = "";
      this.state.minsup = "";
      this.state.maximum_iterations = "";
      this.state.max_conjuncts = "";
      this.state.max_variables = "";
    }

    this.setState({ sentence: event.target.value });
  }

  renderForm() {

    return (
      <React.Fragment>
        
        <FormControl component="fieldset">
          <FormLabel component="legend">Default Inputs and Examples</FormLabel>
          <RadioGroup 
            aria-label="gender" n
            ame="gender2" 
            defaultValue="ugly-male-soda-drinker" 
            value={this.example_radial_value} 
            onChange={this.handleRadialButtonUpdate}>

            <FormControlLabel
              value="ugly-male-soda-drinker"
              control={<Radio color="primary" />}
              label="Ugly Male Soda Drinker"
              labelPlacement="start"
            />
            <FormControlLabel
              value="mozi-ai"
              control={<Radio color="primary" />}
              label="Mozi AI"
              labelPlacement="start"
            />
            <FormControlLabel
              value="custom"
              control={<Radio color="primary" />}
              label="Custom"
              labelPlacement="start"
            />
          </RadioGroup>
        </FormControl>

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
              label="Minimun Frequency"
              style={{ width: "100%" }}
              InputProps={{
                style: { fontSize: 15 },
              }}
              InputLabelProps={{
                style: { fontSize: 15 },
              }}
              value={this.state.minfreq}
              name="minfreq"
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
