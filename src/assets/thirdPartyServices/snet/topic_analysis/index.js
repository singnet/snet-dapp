import React from "react";
import ReactJson from "react-json-view";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import SvgIcon from "@material-ui/core/SvgIcon";
import InfoIcon from "@material-ui/icons/Info";

import HoverIcon from "../../standardComponents/HoverIcon";
import OutlinedDropDown from "../../common/OutlinedDropdown";
import OutlinedTextArea from "../../common/OutlinedTextArea";
import FileUploader from "../../common/FileUploader";

import { Card, CardContent } from "@material-ui/core";
import { CheckCircle } from "@material-ui/icons";

import { TopicAnalysis } from "./topic_analysis_pb_service";

const SampleInput = {
  docs: [
    "Toward Democratic, Lawful Citizenship for AIs, Robots, and Corporations",
    "Dr. Ben Goertzel, CEO of SingularityNET, shares his thoughts about the AI Citizenship Test",
    "I am writing this on a plane flying away from Malta, where I just spoke about SingularityNET at the Malta Blockchain Summit.",
    "It was my first time on Malta, and after the event, I took the afternoon to explore some of the elegant, quaint, ancient neighborhoods of the island.",
    "Walking through medieval alleyways by the rocky coast, I felt an ironic contrast between my elegant surroundings and the main reason I had decided to allocate a couple days from my insanely busy schedule to this Malta event: not just the conference itself, but also the opportunity to meet with the top levels of the Malta government to discuss the enablement of Maltese citizenship for AIs, robots and automated corporations.",
    "The folks who had built the stone walls lining the narrow Maltese roads, still standing strong centuries later, had probably not foreseen their blue-wave-lapped island becoming a nexus of thinking at the intersection of general intelligence theory, cryptography, distributed systems, and advanced legal theory.",
    "The Hanson Robot Sophia, with whose development I've been intimately involved via my role as Chief Scientist of Hanson Robotics, was granted citizenship of Saudi Arabia this year. This was an exciting landmark event, however, its significance is muddled a bit by the fact that Saudi Arabia is not governed by rule of law in the modern sense.",
    "In a nation governed by rule of law, citizenship has a clearly defined meaning with rights and responsibilities relatively straightforwardly derivable from written legal documents using modern analytical logic (admittedly with some measure of quasi-subjective interpretation via case law).",
    "Saudi Arabian citizenship also has a real meaning, but it's a different sort of meaning\u200a—\u200aderivable from various historical Islamic writings (the Quran, the hadiths, etc.) based on deep contextual interpretation by modern and historical Islamic figures. This is a species of legal interpretation that is understood rather poorly by myself personally, and one that is less easily comprehensible by current AIs.",
    "I'm aware that affiliation with Saudi Arabia in any sense has become controversial in recent weeks due to the apparent murder of Jamal Khashoggi.",
  ],
  num_topics: 2,
  topic_divider: 0,
  maxiter: 22,
  beta: 1,
};

const initialUserInput = {
  samplesIndex: "0",
  samples: [
    {
      label: "MinNodesToRemove",
      content: "MinNodesToRemove",
      value: "0",
    },
    {
      label: "MostImportantNodesEdgesSubset",
      content: "MostImportantNodesEdgesSubset",
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
  string_area: JSON.stringify(SampleInput, undefined, 4),
};

export default class TopicAnalysisService extends React.Component {
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
      users_guide: "https://github.com/singnet/topic-analysis/blob/master/docs/USERGUIDE.md",
      code_repo: "https://github.com/singnet/topic-analysis",
      reference: "https://en.wikipedia.org/wiki/Topic_model",
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
    const { inputIndex } = this.state;
    if (event.target.name !== "string_area" && inputIndex === "Text") {
      this.setState({ string_area: JSON.stringify(SampleInput, undefined, 4) });
    }
    this.setState({ internal_error: "" });
  }

  submitAction() {
    const { dataset } = this.state;
    const methodDescriptor = TopicAnalysis["PLSA"];
    const request = new methodDescriptor.requestType();

    let docs = dataset["docs"];
    let num_topics = dataset["num_topics"];
    let topic_divider = dataset["topic_divider"];
    let maxiter = dataset["maxiter"] === undefined ? "2" : dataset["maxiter"];
    let beta = dataset["beta"] === undefined ? "1" : dataset["beta"];

    request.setDocsList(docs);
    request.setNumTopics(num_topics);
    request.setTopicDivider(topic_divider);
    request.setMaxiter(maxiter);
    request.setBeta(beta);

    const props = {
      request,
      onEnd: response => {
        const { message, status, statusMessage } = response;
        if (status !== 0) {
          throw new Error(statusMessage);
        }
        this.setState({
          response: {
            status: "success",
            resStatus: message.getStatus(),
            message: message.getMessage(),
            handle: message.getHandle(),
          },
        });
      },
    };

    this.props.serviceClient.unary(methodDescriptor, props);
  }

  download() {
    const link = document.createElement("a");
    link.setAttribute("type", "hidden");
    let resp = this.state.response;
    // Concatenation already done in the render complete method
    //resp["handle"] = "https://tz-services-1.snet.sh:2298/topic-analysis/api/v1.0/results?handle=" + resp["handle"];
    link.setAttribute("href", "data:text/json," + JSON.stringify(resp));
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
      this.setState({ internal_error: error.toString() });
    }
    return user_value;
  }

  validateValues(user_value) {
    const user_value_keys = Object.keys(user_value);
    const sample_keys = Object.keys(SampleInput);

    this.setState({ internal_error: "" });

    let found_keys = sample_keys.every(r => user_value_keys.indexOf(r) > -1);
    if (!found_keys) {
      this.setState({
        internal_error: "One or more of docs, num_topics, topic_divider, maxiter or beta is/are missing.",
      });
    } else {
      // Now let check the validation of the internal values.
      if (user_value["docs"].length === 0) {
        this.setState({
          internal_error: "Document or text number is zero",
        });
        return false;
      }
      if (parseInt(user_value["num_topics"], 10) < 1) {
        this.setState({
          internal_error: "Num topics isn't big enough for analysis.",
        });
        return false;
      }
      if (parseInt(user_value["topic_divider"], 10) < 0) {
        this.setState({
          internal_error: "Topic divider is less than zero.",
        });
        return false;
      }
      if (parseInt(user_value["maxiter"], 10) <= 0 || parseInt(user_value["maxiter"], 10) > 500) {
        this.setState({
          internal_error: "Max iteration value (maxiter) should have a value greater than 0 and less than 501.",
        });
        return false;
      }
      if (parseFloat(user_value["beta"]) <= 0 || parseFloat(user_value["beta"]) > 1) {
        this.setState({
          internal_error: "Beta should have a value greater than 0 and less than or equal to 1.",
        });
        return false;
      }
      this.setState({ dataset: user_value });
      return true;
    }
    return false;
  }

  handleValidateRequest(event) {
    // Now in this section, we take the function and assert the values
    let user_value = this.validateJSON(this.state.string_area);
    if (user_value === undefined) return;
    let condition = this.validateValues(user_value);
    if (condition) {
      this.setState({
        string_area: JSON.stringify(user_value, undefined, 4),
        internal_error: "",
      });
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
                  label="Text input for PSLA"
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
    var response = this.state.response;
    const handler = "https://tz-services-1.snet.sh:2298/topic-analysis/api/v1.0/results?handle=" + response.handle;
    return (
      <React.Fragment>
        <Grid item xs={12} container justify="center">
          <Card
            style={{
              backgroundColor: "#deffde",
            }}
            elevation={0}
          >
            <CardContent style={{ textAlign: "center" }}>
              <h4>
                <CheckCircle style={{ fontSize: "36px", color: "#54C21F", textAlign: "center" }} />
                <br />
                Analysis started!
              </h4>
              <p>Follow the link below to check the status of the analysis.</p>
              <p
                style={{
                  marginTop: "15px",
                  backgroundColor: "#fff",
                  border: "5px",
                  padding: "10px",
                  borderRadius: "5px",
                }}
              >
                <a rel="noopener noreferrer" target="_blank" href={handler}>
                  {handler}
                </a>
              </p>
            </CardContent>
          </Card>
        </Grid>

        <ReactJson src={response} theme="apathy:inverted" />

        <Grid item xs={12} container justify="center">
          <Button variant="contained" color="primary" onClick={this.download}>
            Download JSON
          </Button>
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
