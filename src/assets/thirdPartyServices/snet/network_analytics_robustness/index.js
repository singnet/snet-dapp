import React from "react";
import DatasetUpload from "../analysis-helpers/DatasetUploaderHelper";
import ReactJson from "react-json-view";
import MethodNamesDropDown from "../../common/MethodNamesDropDown";
import { NetworkAnalyticsRobustness} from "./network_analytics_robustness_pb_service"
import {Graph,Edge}  from "./network_analytics_robustness_pb"
const InputView = { File: "File Upload", Text: "Textual Input" };
const SampleInputMinNodes = {
  graph: {
    nodes: ["1", "2", "3", "4", "5", "6"],
    edges: [
      { edge: ["1", "2"] },
      { edge: ["1", "4"] },
      { edge: ["2", "3"] },
      { edge: ["2", "5"] },
      { edge: ["3", "4"] },
      { edge: ["3", "6"] },
      { edge: ["4", "6"] },
    ],
  },
  source_node: "1",
  target_node: "6",
};
const SampleInputMostImportantNodes = {
  graph: {
    nodes: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
    edges: [
      { edge: ["1", "2"] },
      { edge: ["1", "4"] },
      { edge: ["2", "3"] },
      { edge: ["2", "5"] },
      { edge: ["3", "4"] },
      { edge: ["3", "6"] },
      { edge: ["2", "7"] },
      { edge: ["3", "8"] },
      { edge: ["7", "9"] },
      { edge: ["5", "9"] },
      { edge: ["9", "10"] },
      { edge: ["10", "6"] },
    ],
  },
  source_nodes: ["5", "7"],
  target_nodes: ["6"],
  directed: true,
};

export default class NetworkAnalysisRobustness extends React.Component {
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
      serviceName: "NetworkAnalyticsRobustness",
      methodName: "Select a method",
      datasetFile: null,
      dataset: null,
      enteredJSON: null,
      isValid: {
        datasetFile: false,
        validJSON: false,
      },
      fileAccept: ".json",
      internal_error: "",
      inputFormType: InputView.Text,
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
        event.target.value === "MinNodesToRemove"
          ? JSON.stringify(SampleInputMinNodes, undefined, 4)
          : JSON.stringify(SampleInputMostImportantNodes, undefined, 4);
      this.setValidationStatus("validJSON", false);
    }
    this.setState({
      internal_state: "",
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
    if (this.state.methodName === "MinNodesToRemove") {

      const { methodName, dataset } = this.state;
      const methodDescriptor = NetworkAnalyticsRobustness[methodName];
      const request = new methodDescriptor.requestType();

      let graph = new Graph()


      var edges=[]
      for (let i=0;i<dataset['graph']['edges'].length;i++){
        let e = new Edge()
        e.setEdgeList(dataset['graph']['edges'][i]["edge"])
        edges.push(e)
      }


      graph.setNodesList(dataset['graph']['nodes'])
      graph.setEdgesList(edges)
      graph.setWeightsList(dataset['graph']['weights'])

      request.setGraph(graph)
      request.setSourceNode(dataset['source_node'])
      request.setTargetNode(dataset['target_node'])
     
  
      const props = {
        request,
        onEnd: response => {
          const { message, status, statusMessage } = response;
          if (status !== 0) {
            throw new Error(statusMessage);
          }
          this.setState({
            response: { status: "success", message: message.getMessage(), nodes_output: message.getNodesOutputList(),edges_output:message.getEdgesOutputList() },
          });
        },
      };
  
      this.props.serviceClient.unary(methodDescriptor, props);

    }
    if (this.state.methodName === "MostImportantNodesEdgesSubset") {

      const { methodName, dataset } = this.state;
      const methodDescriptor = NetworkAnalyticsRobustness[methodName];
      const request = new methodDescriptor.requestType();

      let graph = new Graph()


      var edges=[]
      for (let i=0;i<dataset['graph']['edges'].length;i++){
        let e = new Edge()
        e.setEdgeList(dataset['graph']['edges'][i]["edge"])
        edges.push(e)
      }


      graph.setNodesList(dataset['graph']['nodes'])
      graph.setEdgesList(edges)
      graph.setWeightsList(dataset['graph']['weights'])

      request.setGraph(graph)
      request.setSourceNodesList(dataset['source_node'])
      request.setTargetNodesList(dataset['target_node']) 
      request.setType(dataset['type'])
      request.setNormalized(dataset['normalized'])
      request.setDirected(dataset['directed'])
  
      const props = {
        request,
        onEnd: response => {
          const { message, status, statusMessage } = response;
          if (status !== 0) {
            throw new Error(statusMessage);
          }
          this.setState({
            response: { status: "success", message: message.getMessage(), nodes_between_centrality: message.getNodeBetweennessCentrality(),edges_between_centrality:message.getEdgeBetweennessCentrality() },
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
    if (this.state.methodName === "MinNodesToRemove") {
      const sample_keys = Object.keys(SampleInputMinNodes);
      let found_keys = sample_keys.every(r => user_value_keys.indexOf(r) > -1);
      if (!found_keys) {
        this.setState({
          internal_error: "One or more of graphs, source_node or target_node is/are missing.",
        });
      } else {
        this.setState({
          dataset: user_value,
        });
        return true;
      }
      return false;
    }
    if (this.state.methodName === "MostImportantNodesEdgesSubset") {
      const sample_keys = Object.keys(SampleInputMostImportantNodes);
      let found_keys = sample_keys.every(r => user_value_keys.indexOf(r) > -1);
      if (!found_keys) {
        this.setState({
          internal_error: "One or more of graphs, source_nodes or target_nodes is/are missing.",
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
    const serviceNameOptions = ["Select a method", ...this.props.serviceClient.getMethodNames(NetworkAnalyticsRobustness)];
  
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
            Call Network Robustness Analysis
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
