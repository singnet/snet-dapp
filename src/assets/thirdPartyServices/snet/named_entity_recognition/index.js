import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {RecognizeMessage} from "./named_entity_recognition_rpc_pb_service";
import OutlinedDropDown from "../../common/OutlinedDropdown";
import OutlinedTextArea from "../../common/OutlinedTextArea";
import OutlinedLabel from "../../common/OutlinedLabel";
import parse from 'html-react-parser';

export default class NamedEntityRecognitionService extends React.Component {
  constructor(props) {
    super(props);
    this.submitAction = this.submitAction.bind(this);
    this.handleFormUpdate = this.handleFormUpdate.bind(this);
    this.handleParameterChange = this.handleParameterChange.bind(this);
    this.handleInputText = this.handleInputText.bind(this);

    this.textInput = React.createRef();

    this.state = {
      selectedExample: 0,
      exampleList: [
        {
          label: "Custom text",
          value: 0,
          content: "",
        },
        {
          label: "Example 1",
          value: 1,
          content: "Our concept of operations is to flow in our military assets with a priority to build up southern " +
            "Texas, and then Arizona, and then California, Donald Trump said Monday, adding that the soldiers normally " +
            "assigned weapons will be carrying them at the border.  We'll reinforce along priority points of entry, and " +
            "while this happens, Trump Hotels is falling down in stock market.",
        },
      ],
      serviceName: "RecognizeMessage",
      methodName: "Recognize",
      message: "",
      response: undefined,
      reqStart: undefined,
    };
  }

  handleFormUpdate(event) {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleParameterChange(event) {
    this.setState({
      selectedExample: event.target.value,
    }, () => {
      if (this.state.selectedExample !== "default") {
        this.state.exampleList.forEach(item => {
          if (item.value == event.target.value) {
            this.setState({ message: item.content }, () => {
                this.textInput.current.inputRef.current.focus();
              },
            );
          }
        });
      }
    });
  }

  handleInputText(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSentences() {
    let tempMessages = this.state.message.toString().split("\n");
    let tempArray = [];
    for (let i = 0; i < tempMessages.length; i++) {
      if (tempMessages[i].length >= 1) {
        tempArray.push(tempMessages[i]);
      }
    }
    let filterArray = tempArray.filter(function(el) {
      return el != null;
    });

    let itemsToAnalyze = [];
    for (let i = 0; i < filterArray.length; i++) {
      itemsToAnalyze.push({ id: i + 1, sentence: filterArray[i] });
    }
    return itemsToAnalyze;
  }

  parseResponse(response) {
    const responseArray = JSON.parse(response);
    let resultItems = [];
    for (let i = 0; i < responseArray.length; i++) {
      const entityArrayItem = responseArray[i]["entities"];
      for (let j = 0; j < entityArrayItem.length; j++) {
        const entityItem = entityArrayItem[j];
        const tempStartSpan = { startSpan: entityItem["start_span"] };
        const tempEndSpan = { endSpan: entityItem["end_span"] };
        const tempEntity = {
          "entity": {
            "name": entityItem["name"],
            "type": entityItem["type"],
          },
        };
        resultItems.push(Object.assign(tempEntity, tempStartSpan, tempEndSpan));
      }
    }
    return resultItems;
  }

  canBeInvoked() {
    return typeof this.state.message !== "undefined" && this.state.message.trim() !== "";
  }

  submitAction() {
    const { methodName } = this.state;
    const methodDescriptor = RecognizeMessage[methodName];
    const request = new methodDescriptor.requestType();
    request.setValue(JSON.stringify(this.handleSentences()));
    const props = {
      request,
      onEnd: ({ message }) => {
        this.setState({ value: message.getValue() });
      },
    };
    this.props.serviceClient.unary(methodDescriptor, props);
    this.setState({reqStart: new Date()});
  }

  renderForm() {
    return (
      <React.Fragment>
        <Grid item xs={12} style={{ textAlign: "left" }}>

          <OutlinedDropDown
            id="params"
            name="selected_example"
            label="Parameters"
            helperTxt="Select an example"
            fullWidth={false}
            list={this.state.exampleList}
            value={this.state.selectedExample}
            onChange={this.handleParameterChange}
            htmlTooltip={
              <div>
                <p>Example1 option: This is an example of three sentences splited by break lines. </p>
                <p>Custom text: This option keep the input area empty to you set your own sentence.</p>
              </div>
            }
          />
        </Grid>
        <Grid item xs={12} style={{ textAlign: "left" }}>

          <OutlinedTextArea
            id="input_text"
            ref={this.textInput}
            name="message"
            label="Input Text"
            value={this.state.message}
            helperTxt={this.state.message.length + " / 5000 char "}
            rows={5}
            charLimit={5000}
            onChange={this.handleInputText}
            htmlTooltip={
              <div>
                <p>Write a sentence to be processed</p>
              </div>
            }
          />

        </Grid>
        <Grid item xs={12} style={{ textAlign: "center" }}>
          <Button variant="contained" color="primary" onClick={this.submitAction} disabled={!this.canBeInvoked()}>
            Invoke
          </Button>
        </Grid>
      </React.Fragment>
    );
  }

  renderComplete() {
    const response = this.parseResponse(this.state.value);
    const responseTime = (new Date() - this.state.reqStart) / 1000;
    let highlitedText = this.state.message;
    if(response){
      response.map((item,index) => {
        highlitedText = highlitedText.replace(item.entity.name, `<b>${item.entity.name}</b>`);
      });
    }

    return (

      <div style={{ background: "#F8F8F8", padding: "24px" }}>

        <OutlinedLabel
          infoTitle="Status"
          value="Success"
          variant="bottomLine"
          htmlTooltip={
            <p>Service status</p>
          }
        />

        <OutlinedLabel
          infoTitle="Time"
          value={`${responseTime} seconds`}
          variant="bottomLine"
          htmlTooltip={
            <p>Service processing time</p>
          }
        />

        <OutlinedLabel
          infoTitle="Input Text"
          htmlValue={
            <p>{parse(highlitedText)}</p>
          }
          // value={highlitedText}
          variant="bottomLine"
          htmlTooltip={
            <p>Informed text</p>
          }
        />

        <OutlinedLabel
          infoTitle="Named Entity Recognition"
          htmlValue={
            <Grid container
                  direction="row"
                  justify="center"
                  alignItems="center"
            >
              <Grid item xs={4}><span style={{ color: "#212121" }}>Entity</span></Grid>
              <Grid item xs={4}><span style={{ color: "#212121" }}>Type</span></Grid>
              <Grid item xs={4}><span style={{ color: "#212121" }}>Char position</span></Grid>
              {response.map((item,index) => {

                return (
                  <Grid key={index} item xs={12}
                        style={{
                          padding: 0,
                          marginTop: 12,
                          backgroundColor: "rgba(155, 155, 155, 0.05)" }}
                  >

                    <Grid container
                          direction="row"
                          justify="center"
                          alignItems="center"
                    >

                      <Grid item xs={4}>
                        <span style={{ color: "#666" }}>{item.entity.name}</span>
                      </Grid>

                      <Grid item xs={4}>
                          <span style={{ color: "#666" }}>
                            {item.entity.type}
                          </span>
                      </Grid>

                      <Grid item xs={4}>
                          <span style={{ color: "#666" }}>
                            {item.startSpan} - {item.endSpan}
                          </span>
                      </Grid>

                    </Grid>
                  </Grid>
                );
              })}
            </Grid>
          }
          variant="bottomLine"
          htmlTooltip={
            <p>Service response details</p>
          }
        />
      </div>

    );
  }

  render() {
    if (this.props.isComplete)
      return (
        <div style={{ flexGrow: 1 }}>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            style={{ marginTop: 15, marginBottom: 15 }}
          >
            {this.renderComplete()}
          </Grid>
        </div>
      );
    else {
      return (
        <div style={{ flexGrow: 1 }}>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            style={{ marginTop: 15, marginBottom: 15 }}
          >
            {this.renderForm()}
          </Grid>
        </div>
      );
    }
  }
}
