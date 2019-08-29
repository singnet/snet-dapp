import React from "react";
import MethodNamesDropDown from "../../common/MethodNamesDropDown";
import {ResolveReference} from "./CoreferenceResolutionService_pb_service"

const Colors = {};
Colors.names = [
  "#00ffff",
  "#0000ff",
  "#a52a2a",
  "#008b8b",
  "#a9a9a9",
  "#006400",
  "#bdb76b",
  "#8b008b",
  "#556b2f",
  "#ff8c00",
  "#9932cc",
  "#8b0000",
  "#e9967a",
  "#9400d3",
  "#ff00ff",
  "#ffd700",
  "#008000",
  "#4b0082",
  "#f0e68c",
  "#add8e6",
  "#e0ffff",
  "#90ee90",
  "#d3d3d3",
  "#ffb6c1",
  "#ffffe0",
  "#00ff00",
  "#ff00ff",
  "#800000",
  "#000080",
  "#808000",
  "#ffa500",
  "#ffc0cb",
  "#800080",
  "#800080",
  "#ff0000",
  "#c0c0c0",
  "#ffffff",
  "#ffff00",
];
export default class CoreferenceResolutionService extends React.Component {
  constructor(props) {
    super(props);
    this.handleFormUpdate = this.handleFormUpdate.bind(this);
    this.submitAction = this.submitAction.bind(this);
    // this.randomColor = this.randomColor.bind(this);
    this.handleInputUpdate = this.handleInputUpdate.bind(this);

    this.state = {
      serviceName: "ResolveReference",
      methodName: "Select a method",
      sentence: "Michael is a great man. He does what is required of him. Or Enter another text here.",
    };
  }

  canBeInvoked() {
    // When the image isn't uploaded yet and when function name isn't yet given.
    return this.state.methodName !== "Select a method" && this.state.sentence !== "";
  }

  renderFormInput() {
    const inputOptions = [
      "Michael is a great man. He does what is required of him.",
      `Paul Allen was born on January 21, 1953, in Seattle, Washington, to Kenneth Sam Allen and Edna Faye Allen. 
            Allen attended Lakeside School, a private school in Seattle, where he befriended Bill Gates, two years younger, with 
            whom he shared an enthusiasm for computers. Paul and Bill used a teletype terminal at their high school, Lakeside, 
            to develop their programming skills on several time-sharing computer systems.`,
      "SingularityNET lets anyone create, share, and monetize AI services at scale. It helps you in your endeavors",
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
    const methodDescriptor = ResolveReference[methodName];
    const request = new methodDescriptor.requestType();

    request.setSentence(sentence);

    const props = {
      request,
      onEnd: response => {
        const { message, status, statusMessage } = response;
        if (status !== 0) {
          throw new Error(statusMessage);
        }
        this.setState({
          response: { status: "success", references: message.toObject().referencesList, words: message.toObject().words },
        });
      },
    };

    this.props.serviceClient.unary(methodDescriptor, props);
  }


  handleInputUpdate(event) {
    this.setState({ sentence: event.target.value });
  }

  renderForm() {

    const serviceNameOptions = ["Select a method", ...this.props.serviceClient.getMethodNames(ResolveReference)];

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
            Call Co-reference Resolution Service
          </button>
        </div>
      </React.Fragment>
    );
  }

  randomColor(idx) {
    return Colors.names[idx];
  }

  renderComplete() {
    const response = this.state.response;
    let similarItems = [];
    response.references.forEach((item, index) => {
      let similarItem = [];
      similarItem.push.apply(
        similarItem,
        Array.from(
          new Array(parseInt(item["key"]["secondindex"]) - parseInt(item["key"]["firstindex"]) + 1),
          (x, i) => i + parseInt(item["key"]["firstindex"])
        )
      );
      item["mappingsList"].forEach((item_map, index) => {
        similarItem.push.apply(
          similarItem,
          Array.from(
            new Array(parseInt(item_map["secondindex"]) - parseInt(item_map["firstindex"]) + 1),
            (x, i) => i + parseInt(item_map["firstindex"])
          )
        );
      });
      similarItems.push(similarItem);
    });
    // Now let's take the word in words and create a big new array that is a mapping of colors and items
    let colorForm = {};
    //response["words"]["word"].forEach((word, index) => {
    response["words"]["wordList"].forEach((word, index) => {
      colorForm[index] = "#000000";
    });
    similarItems.forEach((item, idx) => {
      item.forEach((it, val) => {
        colorForm[it] = Colors.names[idx];
      });
    });
    return (
      <div style={{ borderWidth: 2, borderColor: "#000000", boarderSytle: "solid" }}>
        <p style={{ fontSize: "13px" }}> Similar colors are represent identical entities in this sentence: </p>
        <p>
          {response["words"]["wordList"].map((word, index) => (
            <span style={{ fontSize: "14px", color: colorForm[index] }} key={index}>
              {word}{" "}
            </span>
          ))}
        </p>
      </div>
      // span<span style={{color: colors[index], fontSize: '14px'}} key={index}>{word} </span>
    );
  }

  render() {
    if (this.props.isComplete) return <div>{this.renderComplete()}</div>;
    else {
      return <div>{this.renderForm()}</div>;
    }
  }
}
