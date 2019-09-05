import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

import MethodNamesDropDown from "../../common/MethodNamesDropDown";
import {LanguageDetect} from "./LanguageDetection_pb_service"

const initialUserInput = {
  methodName: "Select a method",
  sentence: "Enter sample text here!",
};


export default class LanguageDetectionService extends React.Component {
  constructor(props) {
    super(props);
    this.handleFormUpdate = this.handleFormUpdate.bind(this);
    this.submitAction = this.submitAction.bind(this);
    this.handleInputUpdate = this.handleInputUpdate.bind(this);

    this.state = {
      ...initialUserInput,
      serviceName: "LanguageDetect",
      response: undefined,
    };
  }

  canBeInvoked() {
    // When the image isn't uploaded yet and when function name isn't yet given.
    return this.state.methodName !== "Select a method" && this.state.sentence !== "";
  }

  renderFormInput() {
    const inputOptions = [
      "Ich bin das Singularität.",
      "I am the singularity. And I hope to find the best of the world. If not, as they say in french, Bye",
      "እኔ የነጠላነት ደረጃ ነኝ::",
      "Ich bin das Singularität. I am the singularity.",
      "Ich bin das Singularität. I am the singularity. እኔ የነጠላነት ደረጃ ነኝ:: ",
    ];
    return inputOptions.map((inputOption, index) => {
      return <option key={index}>{inputOption}</option>;
    });
  }

  handleFormUpdate(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  submitAction() {
    const { methodName, sentence} = this.state;
    const methodDescriptor = LanguageDetect[methodName];
    const request = new methodDescriptor.requestType();

    request.setInput(sentence);

    const props = {
      request,
      onEnd: response => {
        const { message, status, statusMessage } = response;
        if (status !== 0) {
          throw new Error(statusMessage);
        }
        this.setState({
          response: { status: "success", language: message.toObject() },
        });
      },
    };

    this.props.serviceClient.unary(methodDescriptor, props);
  }


  handleInputUpdate(event) {
    this.setState({ sentence: event.target.value });
  }

  renderForm() {

    const serviceNameOptions = ["Select a method", ...this.props.serviceClient.getMethodNames(LanguageDetect)];

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
            Sample Sentences
          </div>
        </div>
        <div className="col-md-3 col-lg-3">
          <select
            name="sentence"
            value={this.state.sentence}
            style={{ height: "30px", width: "250px", fontSize: "13px", marginBottom: "5px" }}
            onChange={this.handleFormUpdate}
          >
            {this.renderFormInput()}
          </select>
        </div>
        <div className="form-group">
          <div>
            <label style={{ marginRight: "10px" }}>Text input</label>
          </div>
          <textarea
            value={this.state.sentence}
            onChange={this.handleInputUpdate}
            style={{ height: "200px", width: this.props.sliderWidth, fontSize: "12px" }}
          />
        </div>
        <div className="row" align=" center">
          <button
            type=" button"
            className=" btn btn-primary"
            disabled={!this.canBeInvoked()}
            onClick={this.submitAction}
          >
            Call Language Detection Service
          </button>
        </div>
      </React.Fragment>
    );
  }

  renderComplete() {
    const response = this.state.response;
    const CustomTableCell = withStyles(theme => ({
      head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
      },
      body: {
        fontSize: 14,
      },
    }))(TableCell);
    return (
      <div className="row">
        <div className="col-md-12 col-lg-12">
          <p style={{ fontSize: "14px" }}>The original Sentence:</p>
          <p style={{ fontSize: "16px" }}>{this.state.sentence}</p>
        </div>
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <CustomTableCell>Sentences Splits</CustomTableCell>
                <CustomTableCell>Language Guess #1</CustomTableCell>
                <CustomTableCell>Language Guess #2</CustomTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {response.language.languageList.map((row, index) => (
                <TableRow key={index}>
                  <CustomTableCell component="th" scope="row">
                    {row["sentence"]}
                  </CustomTableCell>
                  <CustomTableCell align="center">
                    {row["predictionList"][0]["language"] +
                      " - " +
                      parseFloat(row["predictionList"][0]["confidence"]).toFixed(2) +
                      "%"}
                  </CustomTableCell>
                  <CustomTableCell align="center">
                    {row["predictionList"][1]["language"] +
                      " - " +
                      parseFloat(row["predictionList"][1]["confidence"]).toFixed(2) +
                      "%"}
                  </CustomTableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
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
