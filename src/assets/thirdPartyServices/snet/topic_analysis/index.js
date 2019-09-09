import React from "react";
import DatasetUpload from "../analysis-helpers/DatasetUploaderHelper";
import ReactJson from "react-json-view";
import { Grid, Card, CardContent } from "@material-ui/core";
import { CheckCircle, Cancel } from "@material-ui/icons";
import MethodNamesDropDown from "../../common/MethodNamesDropDown";
import { TopicAnalysis } from "./topic_analysis_pb_service";

const InputView = { File: "File Upload", Text: "Textual Input" };
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

export default class TopicAnalysisService extends React.Component {
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
      serviceName: "TopicAnalysis",
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
      default_val.value = JSON.stringify(SampleInput, undefined, 4);
      this.setValidationStatus("validJSON", false);
      this.setState({
        internal_error: "",
      });
    }
  }

  renderFormInput() {
    const inputOptions = ["File Upload", "Textual Input"];
    return inputOptions.map((inputOption, index) => {
      return <option key={index}>{inputOption}</option>;
    });
  }

  submitAction() {
    const {methodName} = this.state;
    const methodDescriptor = TopicAnalysis[methodName];
    const request = new methodDescriptor.requestType();

    let docs = this.state.dataset["docs"]
    let num_topics = this.state.dataset["num_topics"]
    let topic_divider = this.state.dataset["topic_divider"]
    let maxiter = this.state.dataset["maxiter"] === undefined ? "2" : this.state.dataset["maxiter"]
    let beta = this.state.dataset["beta"] === undefined ? "1" : this.state.dataset["beta"]

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

        // Check whether we need for the initial set of values
        // this.state = this.getInitialState();

        this.setState({
          response: { status: "success", resStatus: message.getStatus(), message: message.getMessage(), handle: message.getHandle() },
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
    const sample_keys = Object.keys(SampleInput);
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
      this.setState({
        dataset: user_value,
      });
      return true;
    }
    return false;
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

    const serviceNameOptions = ["Select a method", ...this.props.serviceClient.getMethodNames(TopicAnalysis)];

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
                  <p style={{ textColor: "red", fontSize: "13px" }}>{this.state.internal_error}</p>
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
                    Format/Validate Input
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
            Call Topic Analysis
          </button>
        </div>
      </React.Fragment>
    );
  }

  renderComplete() {

    var response = this.state.response;

    response.handle =
      "https://tz-services-1.snet.sh:2298/topic-analysis/api/v1.0/results?handle=" + response.handle;
    return (
      <React.Fragment>
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
              <a
                rel="noopener noreferrer"
                target="_blank"
                href={response.handle}
              >
                {response.handle}
              </a>
            </p>
          </CardContent>
        </Card>
        <hr
          style={{
            color: "red",
            backgroundColor: "color",
            height: 5,
          }}
        />
        <ReactJson src={response} theme="apathy:inverted" />
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
