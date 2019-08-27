import React from "react";
import DatasetUpload from "../analysis-helpers/DatasetUploaderHelper";
import ReactJson from "react-json-view";
import MethodNamesDropDown from "../../common/MethodNamesDropDown";

import {NetworkAnalyticsBipartite} from "./network_analytics_bipartite_pb_service"
import {BipartiteNodes,Edge, BipartiteGraph} from "./network_analytics_bipartite_pb"


const InputView = { File: "File Upload", Text: "Textual Input" };
const SampleInputBipartiteGraph = {
  nodes: {
    bipartite_0: ["8", "7"],
    bipartite_1: ["3", "4"],
  },
  edges: [{ edge: ["3", "8"] }, { edge: ["4", "7"] }],
};

const SampleInputProjectedGraph = {
  graph: {
    bipartite_0: ["Pam", "Goeff", "Philip", "Sam", "Fred", "Jane", "Sue", "Charlie"],
    bipartite_1: [
      "American Diner",
      "Sushi",
      "Italian",
      "Indian",
      "Chinese",
      "Tapas",
      "Thai",
      "French",
      "Hungarian",
      "Lebanese",
      "Greek",
    ],
    edges: [
      { edge: ["Pam", "French"] },
      { edge: ["Pam", "Hungarian"] },
      { edge: ["Pam", "Sushi"] },
      { edge: ["Goeff", "American Diner"] },
      { edge: ["Goeff", "Indian"] },
      { edge: ["Goeff", "Chinese"] },
      { edge: ["Philip", "Lebanese"] },
      { edge: ["Philip", "Italian"] },
      { edge: ["Philip", "Tapas"] },
      { edge: ["Sam", "American Diner"] },
      { edge: ["Sam", "Sushi"] },
      { edge: ["Sam", "Italian"] },
      { edge: ["Fred", "Italian"] },
      { edge: ["Fred", "Tapas"] },
      { edge: ["Fred", "Thai"] },
      { edge: ["Jane", "French"] },
      { edge: ["Jane", "Hungarian"] },
      { edge: ["Jane", "Sushi"] },
      { edge: ["Sue", "Greek"] },
      { edge: ["Sue", "Tapas"] },
      { edge: ["Sue", "Thai"] },
      { edge: ["Charlie", "American Diner"] },
      { edge: ["Charlie", "Indian"] },
      { edge: ["Charlie", "Chinese"] },
    ],
  },
  nodes: ["Pam", "Charlie", "Goeff", "Fred", "Sam", "Sue", "Philip", "Jane"],
  weight: "Newman",
};

export default class NetworkAnalysisBipartite extends React.Component {
  constructor(props) {
    super(props);
    this.download = this.download.bind(this);
    this.handleFileUpload = this.handleFileUpload.bind(this);
    this.handleFormUpdate = this.handleFormUpdate.bind(this);
    this.handleInputUpdate = this.handleInputUpdate.bind(this);
    this.submitAction = this.submitAction.bind(this);
    this.handleValidateRequest = this.handleValidateRequest.bind(this);
    this.resetInternalState = this.resetInternalState.bind(this);
    this.state = this.getInitialState();
  }

  getInitialState() {
    return {
      serviceName: "NetworkAnalyticsBipartite",
      methodName: "BipartiteGraph",
      datasetFile: null,
      dataset: null,
      enteredJSON: null,
      directed: false,
      isValid: {
        datasetFile: false,
        validJSON: false,
      },
      fileAccept: ".json",
      internal_error: "",
      inputFormType: InputView.Text,
      isComplete :false,

    };
  }

  setValidationStatus(key, valid) {
    if (this.state.isValid[key] !== valid) {
      this.setState(state => {
        const isValid = Object.assign({}, state.isValid);
        isValid[key] = valid;

        return { isValid: isValid };
      });
    }
  }

  resetInternalState() {
    this.setState(this.getInitialState());
  }

  canBeInvoked() {
    return this.state.methodName !== "Select a method" && this.state.isValid["validJSON"];
  }

  handleInputUpdate(event) {
    this.setValidationStatus("validJSON", false);
    event.preventDefault();
  }

  handleFileUpload(file) {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      let encoded = fileReader.result.replace(/^data:(.*;base64,)?/, "");
      encoded.length % 4 > 0 && (encoded += "=".repeat(4 - (encoded.length % 4)));
      let user_value = this.validateJSON(atob(encoded));
      let condition = this.validateValues(user_value);
      this.setValidationStatus("validJSON", condition);
      this.setState({ datasetFile: file });
    };
  }

  handleFormUpdate(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
    if (event.target.name === "methodName" && this.state.inputFormType === InputView.Text) {
      let default_val = document.getElementById("string_area");
      default_val.value =
        event.target.value === "BipartiteGraph"
          ? JSON.stringify(SampleInputBipartiteGraph, undefined, 4)
          : JSON.stringify(SampleInputProjectedGraph, undefined, 4);
      this.setValidationStatus("validJSON", false);
    }
    this.setState({
      internal_error: "",
    });
  }

  renderServiceMethodNames(serviceMethodNames) {
    const serviceNameOptions = ["Select a method", ...serviceMethodNames];
    return serviceNameOptions.map((serviceMethodName, index) => {
      return <option key={index}>{serviceMethodName}</option>;
    });
  }

  renderFormInput() {
    const inputOptions = ["File Upload", "Textual Input"];
    return inputOptions.map((inputOption, index) => {
      return <option key={index}>{inputOption}</option>;
    });
  }

  submitAction() {
      if (this.state.methodName === "BipartiteGraph") {


        const { methodName, dataset } = this.state;
        const methodDescriptor = NetworkAnalyticsBipartite[methodName];
        const request = new methodDescriptor.requestType();
  
        let nodes = new BipartiteNodes()
        nodes.setBipartite0List(dataset['nodes']['bipartite_0'])
        nodes.setBipartite1List(dataset['nodes']['bipartite_1'])
  
        var edges=[]
        for (let i=0;i<dataset['edges'].length;i++){
          let e = new Edge()
          e.setEdgeList(dataset['edges'][i]["edge"])
          edges.push(e)
        }
  
        request.setNodes(nodes)
        request.setEdgesList(edges)
       
    
        const props = {
          request,
          onEnd: ({message}) => {
            this.setState({
              response: { status: "success", message: message.getMessage(), output: message.getOutput() },
            });
          },
        };
    
        this.props.serviceClient.unary(methodDescriptor, props);
  
  
      }
      if (this.state.methodName === "ProjectedGraph") {
       
        
        const { methodName, dataset } = this.state;
        const methodDescriptor = NetworkAnalyticsBipartite[methodName];
        const request = new methodDescriptor.requestType();
  
  
        let graph =new BipartiteGraph();
        let edges=[]
        for (let i=0;i<dataset['graph']['edges'].length;i++){
          let e = new Edge()
          e.setEdgeList(dataset['graph']['edges'][i]["edge"])
          edges.push(e)
        }
  
        graph.setBipartite1List(dataset['graph']['bipartite_1'])
        graph.setBipartite0List(dataset['graph']['bipartite_0'])
        
  
  
        graph.setEdgesList(edges)
        graph.setWeightsList(dataset['graph']['weights'])
  
  
        request.setGraph(graph)
        request.setNodesList(dataset['nodes'])
        request.setWeight(dataset['weight'])
  
  
  
        const props = {
          request,
          onEnd: ({message}) => {
            this.setState({
              response: { status: "success", message: message.getMessage(), output: message.getOutput() },
            });
          },
        };
    
        this.props.serviceClient.unary(methodDescriptor, props);
      }
  }

  download() {
    const link = document.createElement("a");
    link.setAttribute("type", "hidden");
    link.setAttribute("href", "data:text/json," + JSON.stringify(this.state.response));
    link.setAttribute("download", "result.json");
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  validateJSON(value) {
    let user_value;
    try {
      user_value = JSON.parse(value);
    } catch (error) {
      this.setState({
        internal_error: error.toString(),
      });
    }
    return user_value;
  }

  validateValues(user_value) {
    const user_value_keys = Object.keys(user_value);
    if (this.state.methodName === "BipartiteGraph") {
      const sample_keys = Object.keys(SampleInputBipartiteGraph);
      let found_keys = sample_keys.every(r => user_value_keys.indexOf(r) > -1);
      if (!found_keys) {
        this.setState({
          internal_error: "One or both of nodes and/or edges is/are missing.",
        });
      } else {
        this.setState({
          dataset: user_value,
        });
        return true;
      }
      return false;
    }
    if (this.state.methodName === "ProjectedGraph") {
      const sample_keys = Object.keys(SampleInputProjectedGraph);
      let found_keys = sample_keys.every(r => user_value_keys.indexOf(r) > -1);
      if (!found_keys) {
        this.setState({
          internal_error: "One or more of graph, nodes or weight is/are missing.",
        });
      } else {
        this.setState({
          dataset: user_value,
        });
        return true;
      }
      return false;
    }
  }

  handleValidateRequest(event) {
    let string_area = document.getElementById("string_area");
    let value = string_area.value;

    // Now in this section, we take the function and assert the values
    let user_value = this.validateJSON(value);
    if (user_value === undefined) return;
    let condition = this.validateValues(user_value);
    if (condition) {
      string_area.value = JSON.stringify(user_value, undefined, 4);
      this.setState({
        internal_error: "",
      });
    }
    this.setValidationStatus("validJSON", condition);
    event.preventDefault();
  }

  renderForm() {
    const serviceNameOptions = ["Select a method", ...this.props.serviceClient.getMethodNames(NetworkAnalyticsBipartite)];
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-md-3 col-lg-3" style={{ padding: "10px", fontSize: "13px", marginLeft: "10px" }}>
            Method Name:
          </div>
          <div className="col-md-3 col-lg-3">
          <MethodNamesDropDown
              list={serviceNameOptions}
              value={this.state.methodName}
              onChange={this.handleFormUpdate}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-3 col-lg-3" style={{ padding: "10px", fontSize: "13px", marginLeft: "10px" }}>
            Input Form:
          </div>
          <div className="col-md-3 col-lg-3">
            <select
              name="inputFormType"
              value={this.state.inputFormType}
              style={{ height: "30px", width: "250px", fontSize: "13px", marginBottom: "5px" }}
              onChange={this.handleFormUpdate}
            >
              {this.renderFormInput()}
            </select>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 col-lg-12">
            {this.state.inputFormType === InputView.File && (
              <div>
                <DatasetUpload
                  uploadedFile={this.state.datasetFile}
                  handleFileUpload={this.handleFileUpload}
                  fileAccept={this.state.fileAccept}
                  setValidationStatus={valid => this.setValidationStatus("datasetFile", valid)}
                />
                <div>
                  <p>
                    <span style={{ color: "red", fontSize: "13px" }}>{this.state.internal_error}</span>
                  </p>
                </div>
              </div>
            )}
            {this.state.inputFormType === InputView.Text && (
              <div className="form-group">
                <div>
                  <label style={{ marginRight: "10px" }}>Text input for {this.state.methodName}</label>
                </div>
                <textarea
                  id="string_area"
                  onChange={this.handleInputUpdate}
                  style={{
                    height: "200px",
                    width: this.props.sliderWidth,
                    fontSize: "12px",
                  }}
                />
                <div align="center">
                  <button type="button" className="btn btn-primary" onClick={this.handleValidateRequest}>
                    Format/Validate Graph
                  </button>
                  <button type="button" className="btn btn-primary" onClick={this.resetInternalState}>
                    Reset Internal State
                  </button>
                </div>
                <div>
                  <p>
                    <span style={{ color: "red", fontSize: "13px" }}>{this.state.internal_error}</span>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="row" align=" center">
          <button
            type=" button"
            className="btn btn-primary"
            disabled={!this.canBeInvoked()}
            onClick={this.submitAction}
          >
            Call Network Graph Analysis
          </button>
        </div>
      </React.Fragment>
    );
  }

  renderComplete() {
    return (
      <React.Fragment>
        <ReactJson src={this.state.response} theme="apathy:inverted" />
        <div className="row" align="center">
          <button type="button" className="btn btn-primary" onClick={this.download}>
            Download Results JSON file
          </button>
        </div>
      </React.Fragment>
    );
  }

  render() {
    if (this.props.isComplete) return <div>{this.renderComplete()}</div>;
    else {
      return <div>{this.renderForm()}</div>;
    }
  }
}
