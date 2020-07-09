import React from "react";
import ReactJson from "react-json-view";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import SvgIcon from "@material-ui/core/SvgIcon";
import InfoIcon from "@material-ui/icons/Info";

import HoverIcon from "../../standardComponents/HoverIcon";
import FileUploader from "../../common/FileUploader";
import OutlinedDropDown from "../../common/OutlinedDropdown";
import OutlinedTextArea from "../../common/OutlinedTextArea";

import { NetworkAnalyticsBipartite } from "./network_analytics_bipartite_pb_service";
import { BipartiteNodes, Edge, BipartiteGraph } from "./network_analytics_bipartite_pb";

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

const initialUserInput = {
  methodIndex: "0",
  methodNames: [
    {
      label: "BipartiteGraph",
      content: "BipartiteGraph",
      value: "0",
    },
    {
      label: "ProjectedGraph",
      content: "ProjectedGraph",
      value: "1",
    },
  ],
  inputIndex: "Text",
  inputNames: [
    {
      label: "Textual Input",
      value: "Text",
    },
    {
      label: "File Upload",
      value: "File",
    },
  ],
  string_area: "",
};

export default class NetworkAnalysisBipartite extends React.Component {
  constructor(props) {
    super(props);
    this.download = this.download.bind(this);
    this.handleFileUpload = this.handleFileUpload.bind(this);
    this.handleFormUpdate = this.handleFormUpdate.bind(this);
    this.submitAction = this.submitAction.bind(this);
    this.handleValidateRequest = this.handleValidateRequest.bind(this);
    this.resetInternalState = this.resetInternalState.bind(this);
    this.state = this.getInitialState();
  }

  getInitialState() {
    return {
      ...initialUserInput,
      users_guide:
        "https://github.com/singnet/network-analytics-services/blob/master/services/bipartite/docs/USERGUIDE.md",
      code_repo: "https://github.com/singnet/network-analytics-services",
      reference:
        "https://github.com/singnet/network-analytics-services/blob/master/services/bipartite/docs/USERGUIDE.md",
      datasetFile: null,
      dataset: null,
      isValid: {
        datasetFile: false,
        validJSON: false,
      },
      fileAccept: ".json",
      internal_error: "",
    };
  }

  setValidationStatus(key, valid) {
    if (this.state.isValid[key] !== valid) {
      this.setState(state => {
        const isValid = Object.assign({}, state.isValid);
        isValid[key] = valid;
        return { isValid };
      });
    }
  }

  resetInternalState() {
    this.setState(this.getInitialState());
  }

  canBeInvoked() {
    return this.state.isValid["validJSON"];
  }

  handleFileUpload(files) {
    this.setState({ datasetFile: null });
    if (files.length) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(files[0]);
      fileReader.onload = () => {
        let encoded = fileReader.result.replace(/^data:(.*;base64,)?/, "");
        encoded.length % 4 > 0 && (encoded += "=".repeat(4 - (encoded.length % 4)));
        let user_value = this.validateJSON(atob(encoded));
        let condition = this.validateValues(user_value);
        this.setValidationStatus("validJSON", condition);
        this.setState({ datasetFile: files[0] });
      };
    }
  }

  handleFormUpdate(event) {
    this.setState({ [event.target.name]: event.target.value });
    this.setValidationStatus("validJSON", false);
    const { methodNames, inputIndex } = this.state;
    if (event.target.name === "methodIndex" && inputIndex === "Text") {
      const method = methodNames[event.target.value].content;
      this.setState({
        string_area:
          method === "BipartiteGraph"
            ? JSON.stringify(SampleInputBipartiteGraph, undefined, 4)
            : JSON.stringify(SampleInputProjectedGraph, undefined, 4),
      });
    }
    this.setState({ internal_error: "" });
  }

  submitAction() {
    const { methodIndex, methodNames, dataset } = this.state;
    const method = methodNames[methodIndex].content;
    const methodDescriptor = NetworkAnalyticsBipartite[method];
    const request = new methodDescriptor.requestType();

    if (method === "BipartiteGraph") {
      let nodes = new BipartiteNodes();
      nodes.setBipartite0List(dataset["nodes"]["bipartite_0"]);
      nodes.setBipartite1List(dataset["nodes"]["bipartite_1"]);

      var edges = [];
      for (let i = 0; i < dataset["edges"].length; i++) {
        let e = new Edge();
        e.setEdgeList(dataset["edges"][i]["edge"]);
        edges.push(e);
      }

      request.setNodes(nodes);
      request.setEdgesList(edges);
    }

    if (method === "ProjectedGraph") {
      let graph = new BipartiteGraph();
      let edges = [];
      for (let i = 0; i < dataset["graph"]["edges"].length; i++) {
        let e = new Edge();
        e.setEdgeList(dataset["graph"]["edges"][i]["edge"]);
        edges.push(e);
      }

      graph.setBipartite1List(dataset["graph"]["bipartite_1"]);
      graph.setBipartite0List(dataset["graph"]["bipartite_0"]);

      graph.setEdgesList(edges);
      graph.setWeightsList(dataset["graph"]["weights"]);

      request.setGraph(graph);
      request.setNodesList(dataset["nodes"]);
      request.setWeight(dataset["weight"]);
    }

    const props = {
      request,
      onEnd: ({ message }) => {
        this.setState({
          response: {
            status: "success",
            message: message.getMessage(),
            output: message.getOutput(),
          },
        });
      },
    };

    this.props.serviceClient.unary(methodDescriptor, props);
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
    let user_value = "";
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
    const { methodIndex, methodNames } = this.state;
    const method = methodNames[methodIndex].content;
    const user_value_keys = Object.keys(user_value);

    this.setState({ internal_error: "" });

    if (method === "BipartiteGraph") {
      const sample_keys = Object.keys(SampleInputBipartiteGraph);
      let found_keys = sample_keys.every(r => user_value_keys.indexOf(r) > -1);
      if (!found_keys) {
        this.setState({
          internal_error: "One or both of nodes and/or edges is/are missing.",
        });
      } else {
        this.setState({ dataset: user_value });
        return true;
      }
      return false;
    }

    if (method === "ProjectedGraph") {
      const sample_keys = Object.keys(SampleInputProjectedGraph);
      let found_keys = sample_keys.every(r => user_value_keys.indexOf(r) > -1);
      if (!found_keys) {
        this.setState({
          internal_error: "One or more of graph, nodes or weight is/are missing.",
        });
      } else {
        this.setState({ dataset: user_value });
        return true;
      }
      return false;
    }
  }

  handleValidateRequest(event) {
    // Now in this section, we take the function and assert the values
    let user_value = this.validateJSON(this.state.string_area);
    if (user_value === undefined) return;
    let condition = this.validateValues(user_value);
    if (condition) {
      this.state.string_area = JSON.stringify(user_value, undefined, 4);
      this.setState({ internal_error: "" });
    }
    this.setValidationStatus("validJSON", condition);
    event.preventDefault();
  }

  renderForm() {
    return (
      <React.Fragment>
        <Grid container spacing={2} justify="center" alignItems="center">
          <Grid item xs={12} container justify="center" style={{ textAlign: "center" }}>
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
          <Grid item xs={12} container justify="center" style={{ textAlign: "center" }}>
            <OutlinedDropDown
              id="inputs"
              name="inputIndex"
              label="Input Form"
              fullWidth={true}
              list={this.state.inputNames}
              value={this.state.inputIndex}
              onChange={this.handleFormUpdate}
            />
          </Grid>

          {this.state.inputIndex === "File" && (
            <Grid item xs={12} container justify="center" style={{ textAlign: "center" }}>
              <FileUploader
                uploadedFiles={this.state.datasetFile}
                handleFileUpload={this.handleFileUpload}
                fileAccept={this.state.fileAccept}
                setValidationStatus={valid => this.setValidationStatus("datasetFile", valid)}
              />
              <Grid item xs={12} container justify="center" style={{ textAlign: "center" }}>
                <p>
                  <span style={{ color: "red", fontSize: "13px" }}>{this.state.internal_error}</span>
                </p>
              </Grid>
            </Grid>
          )}

          {this.state.inputIndex === "Text" && (
            <Grid item xs={12} container justify="center" style={{ textAlign: "center" }}>
              <Grid item xs={12} style={{ textAlign: "left" }}>
                <OutlinedTextArea
                  id="string_area"
                  name="string_area"
                  label={"Text input for " + this.state.methodNames[this.state.methodIndex].content}
                  fullWidth={true}
                  value={this.state.string_area}
                  rows={8}
                  onChange={this.handleFormUpdate}
                />
              </Grid>
              <Grid item xs={12} container justify="center" style={{ textAlign: "center" }}>
                <Button variant="contained" color="primary" onClick={this.handleValidateRequest}>
                  Format/Validate Graph
                </Button>
                <Button variant="contained" color="primary" onClick={this.resetInternalState}>
                  Reset Internal State
                </Button>
              </Grid>
              <Grid item xs={12} container justify="center" style={{ textAlign: "center" }}>
                <p>
                  <span style={{ color: "red", fontSize: "13px" }}>{this.state.internal_error}</span>
                </p>
              </Grid>
            </Grid>
          )}

          <Grid item xs container justify="flex-end">
            <Grid item>
              <HoverIcon text="View code on Github" href={this.state.code_repo}>
                <SvgIcon>
                  <path // Github Icon
                    d="M12.007 0C6.12 0 1.1 4.27.157 10.08c-.944 5.813 2.468 11.45 8.054 13.312.19.064.397.033.555-.084.16-.117.25-.304.244-.5v-2.042c-3.33.735-4.037-1.56-4.037-1.56-.22-.726-.694-1.35-1.334-1.756-1.096-.75.074-.735.074-.735.773.103 1.454.557 1.846 1.23.694 1.21 2.23 1.638 3.45.96.056-.61.327-1.178.766-1.605-2.67-.3-5.462-1.335-5.462-6.002-.02-1.193.42-2.35 1.23-3.226-.327-1.015-.27-2.116.166-3.09 0 0 1.006-.33 3.3 1.23 1.966-.538 4.04-.538 6.003 0 2.295-1.5 3.3-1.23 3.3-1.23.445 1.006.49 2.144.12 3.18.81.877 1.25 2.033 1.23 3.226 0 4.607-2.805 5.627-5.476 5.927.578.583.88 1.386.825 2.206v3.29c-.005.2.092.393.26.507.164.115.377.14.565.063 5.568-1.88 8.956-7.514 8.007-13.313C22.892 4.267 17.884.007 12.008 0z"
                  />
                </SvgIcon>
              </HoverIcon>
            </Grid>
            <Grid item>
              <HoverIcon text="User's guide" href={this.state.users_guide}>
                <InfoIcon />
              </HoverIcon>
            </Grid>
            <Grid item>
              <HoverIcon text="View original project" href={this.state.reference}>
                <SvgIcon>
                  <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 11.701c0 2.857-1.869 4.779-4.5 5.299l-.498-1.063c1.219-.459 2.001-1.822 2.001-2.929h-2.003v-5.008h5v3.701zm6 0c0 2.857-1.869 4.779-4.5 5.299l-.498-1.063c1.219-.459 2.001-1.822 2.001-2.929h-2.003v-5.008h5v3.701z" />
                </SvgIcon>
              </HoverIcon>
            </Grid>
          </Grid>

          <Grid item xs={12} container justify="center">
            <Button variant="contained" color="primary" onClick={this.submitAction} disabled={!this.canBeInvoked()}>
              Invoke
            </Button>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }

  renderComplete() {
    return (
      <React.Fragment>
        <ReactJson src={this.state.response} theme="apathy:inverted" />
        <Grid container spacing={2} justify="center" alignItems="center">
          <Grid item xs={12} container justify="center">
            <Button variant="contained" color="primary" onClick={this.download}>
              Download JSON
            </Button>
          </Grid>
        </Grid>
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
