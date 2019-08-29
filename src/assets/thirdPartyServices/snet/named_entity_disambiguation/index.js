import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { withStyles } from "@material-ui/core/styles";
import MethodNamesDropDown from "../../common/MethodNamesDropDown";
import Paper from "@material-ui/core/Paper";
import {Disambiguate} from "./NamedEntityDisambiguation_pb_service"

export default class NamedEntityDisambiguation extends React.Component {
  constructor(props) {
    super(props);
    this.handleFormUpdate = this.handleFormUpdate.bind(this);
    this.submitAction = this.submitAction.bind(this);
    this.handleInputUpdate = this.handleInputUpdate.bind(this);

    this.state = {
      serviceName: "Disambiguate",
      methodName: "named_entity_disambiguation",
      sentence: "Enter sample text here!",
    };
  }

  canBeInvoked() {
    let sentence = this.state.sentence;
    return this.state.methodName !== "Select a method" && 
                    (sentence.trim() !== "" && sentence !== "Enter sample text here!");
  }

  renderServiceMethodNames(serviceMethodNames) {
    const serviceNameOptions = ["Select a method", ...serviceMethodNames];
    return serviceNameOptions.map((serviceMethodName, index) => {
      return <option key={index}>{serviceMethodName}</option>;
    });
  }

  renderFormInput() {
    const inputOptions = [
      "Silicon Valley is an American comedy television series created by Mike Judge, John Altschuler and Dave Krinsky.",
      "I had a wonderful trip to Seattle and enjoyed seeing the Space Needle!",
      "Moscow’s as yet undisclosed proposals on Chechnya’s political future have , meanwhile, been sent back to do the rounds of various government departments.",
      'Silicon Valley venture capitalist Michael Moritz said that today\'s billion-dollar "unicorn" startups can learn from Apple founder Steve Jobs.',
      "This category lists articles related to films in the Alien media franchise, an influential science fiction franchise that began with the 1979 film Alien.",
      "Gordon School is a coeducational, independent school located in East Providence, Rhode Island.",
      'Silva is a Portuguese freguesia ("civil parish"), located in the municipality of Barcelos.',
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
    const { methodName, sentence } = this.state;
    const methodDescriptor = Disambiguate[methodName];
    const request = new methodDescriptor.requestType();

    request.setInput(sentence)

    const props = {
      request,
      onEnd: ({message}) => {
        this.setState({
          response: { status: "success", value: message.toObject() },
        });
      },
    };

    this.props.serviceClient.unary(methodDescriptor, props);  
  }

  handleInputUpdate(event) {
    this.setState({ sentence: event.target.value });
  }

  renderForm() {
   const serviceNameOptions = ["Select a method", ...this.props.serviceClient.getMethodNames(Disambiguate)];


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
            Call Named Entity Disambiguation
          </button>
        </div>
      </React.Fragment>
    );
  }

  renderComplete() {
    const response = this.state.response.value;
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
                <CustomTableCell>Named Entity</CustomTableCell>
                <CustomTableCell>Disambiguation Word</CustomTableCell>
                <CustomTableCell>Disambiguation Link</CustomTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {response.disambiguationList.map((row, index) => (
                <TableRow key={index}>
                  <CustomTableCell component="th" scope="row">
                    {row.namedEntity}
                  </CustomTableCell>
                  <CustomTableCell align="center">{row.disambiguationWord}</CustomTableCell>
                  <CustomTableCell align="center">
                    <a rel="noopener noreferrer" target="_blank" href={row.disambiguationLink}>
                      {row.disambiguationLink}
                    </a>
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
