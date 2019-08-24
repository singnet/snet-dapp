import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import Typography from "@material-ui/core/Typography";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {RecognizeMessage} from "./named_entity_recognition_rpc_pb_service"

export default class NamedEntityRecognitionService extends React.Component {
  constructor(props) {
    super(props);
    this.submitAction = this.submitAction.bind(this);
    this.handleFormUpdate = this.handleFormUpdate.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.canBeInvoked = this.canBeInvoked.bind(this);

    this.state = {
      value: "",
      serviceName: "RecognizeMessage",
      methodName: "Recognize",
      message: undefined,
      isComplete : false,
      styles: {
        details: {
          fontSize: 14,
          alignItems: "center",
        },
        defaultFontSize: {
          fontSize: 15,
        },
      },
    };

    this.isComplete = false;
    this.serviceMethods = [];
    this.allServices = [];
    this.methodsForAllServices = [];
  }

  handleFormUpdate(event) {
    console.log(event.target);
    this.setState({ [event.target.name]: event.target.value });
  }

  submitAction() {
    const { methodName } = this.state;
    const methodDescriptor = RecognizeMessage[methodName];
    const request = new methodDescriptor.requestType();

    request.setValue(JSON.stringify(this.handleSentences()))

    const props = {
      request,
      onEnd: response => {
        const { message, status, statusMessage } = response;
        if (status !== 0) {
          throw new Error(statusMessage);
        }
        this.setState({value: message.getValue()});
        this.setState({isComplete: true});
      },
    };

    this.props.serviceClient.unary(methodDescriptor, props);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSentences() {
    let tempMessages = this.state.message.toString().trim().split("\n");
    let tempArray = [];
    for (let i = 0; i < tempMessages.length; i++) {
        if (tempMessages[i].length >= 1) {
            tempArray.push(tempMessages[i]);
        }
    }
    let filterArray = tempArray.filter(function (el) {
        return el != null;
    });

    let itemsToAnalyze = [];
    for (let i = 0; i < filterArray.length; i++) {
        itemsToAnalyze.push({id: i + 1, sentence: filterArray[i]});
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
        const tempEntity = { "entity": {
                  "name" : entityItem["name"],
                  "type" : entityItem["type"]
                }
              };
        resultItems.push(Object.assign(tempEntity, tempStartSpan, tempEndSpan));
      }
    }
    return resultItems;
  }

  canBeInvoked() {
    return typeof this.state.message !== "undefined" && this.state.message.trim() !== "";
  }

  /*
  parseResponse(response) {
    //Temporary parse
    //Will be improved and migrated to backend service soon
    try {
      let resultItems = [];
      let responseArray = response
        .split("[")
        .join("")
        .split("]")
        .join("")
        .split(")");
      //const responseArray = JSON.parse(response);
      for (let i = 0; i < responseArray.length; i++) {
        let temp = "";
        if (i === 0) {
          temp = responseArray[i].substring(1, responseArray[i].length);
        } else {
          temp = responseArray[i].substring(3, responseArray[i].length);
        }
        let entityArrayItem = temp.split(",");
        let tempEntity,
          tempStartSpan,
          tempEndSpan = {};
        for (let j = 0; j < entityArrayItem.length; j++) {
          let tempProperty = entityArrayItem[j];
          tempProperty = entityArrayItem[j].replace(":", "").replace(",", "");
          if (j % 2 === 0) {
            if (tempProperty.includes("Start span")) {
              tempStartSpan = { startSpan: entityArrayItem[j + 1] };
            } else if (tempProperty.includes("End span")) {
              tempEndSpan = { endSpan: entityArrayItem[j + 1] };
            } else if (typeof tempProperty === "string") {
              tempEntity = {
                entity: {
                  name: entityArrayItem[j].split("'").join(""),
                  type: entityArrayItem[j + 1].split("'").join(""),
                },
              };
            }
          }
        }
        resultItems.push(Object.assign(tempEntity, tempStartSpan, tempEndSpan));
      }
      return resultItems;
    } catch (e) {
      return [];
    }
  }*/

  renderForm() {
    return (
      <React.Fragment>
        <Grid item xs={12}>
          <br />
          <br />
          <TextField
            id="standard-multiline-static"
            label="Input sentence"
            style={{ width: "100%", fontSize: 24 }}
            InputProps={{
              style: { fontSize: 15 },
            }}
            InputLabelProps={{
              style: { fontSize: 15 },
            }}
            multiline
            rows="6"
            value={this.state.message}
            name="message"
            onChange={this.handleChange}
            defaultValue=""
            margin="normal"
          />
        </Grid>
        <Grid item xs={12} style={{ textAlign: "center" }}>
          <Button variant="contained" color="primary" onClick={this.submitAction} disabled={!this.canBeInvoked()}>
            Invoke
          </Button>
        </Grid>
        <Grid item xs={12} style={{ textAlign: "center" }}>
          <br />
          <h2>Examples</h2>
          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography style={this.state.styles.defaultFontSize}>Sentence example</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails style={this.state.styles.details}>
              <pre
                style={{
                  whiteSpace: "pre-wrap",
                  overflowX: "scroll",
                }}
              >
                Our concept of operations is to flow in our military assets with a priority to build up southern Texas,
                and then Arizona, and then California," Donald Trump said Monday, adding that the soldiers normally
                assigned weapons will be carrying them at the border. " We'll reinforce along priority points of entry,
                and while this happens, Trump Hotels is falling down in stock market.
              </pre>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography style={this.state.styles.defaultFontSize}>Response example</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails style={this.state.styles.details}>
              <pre
                style={{whiteSpace: "pre-wrap",overflowX: "scroll",}}
              >
                  <p>Texas : LOCATION<br/>Start span: 97 - End span: 102</p>
                  <p>Arizona : LOCATION<br/>Start span: 113 - End span: 120  </p>
                  <p>California : LOCATION<br/>Start span: 131 - End span: 141 </p>
                  <p>Donald Trump : PERSON<br/>Start span: 144 - End span: 156 </p>
                  <p>Trump Hotels : ORGANIZATION<br/>Start span: 332 - End span: 344 </p>
              </pre>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </Grid>
      </React.Fragment>
    );
  }
  
  renderComplete() {
    const result = this.parseResponse(this.state.value);
    return (
      <React.Fragment>
        <Grid item xs={12} style={{ textAlign: "center" }}>
          <h4>Response from service is:</h4>
          <br />
          <div style={{ textAlign: "left", padding: 20, backgroundColor: "#E5EFFC" }}>
            <h4>This is the entities found and it's positions in the inputed sentence.</h4>
            <br />
            {result.map(item => (
              <div>
                <h5>
                  {item.entity.name} : {item.entity.type}
                </h5>
                <p>
                  Start span: {item.startSpan} - End span: {item.endSpan}
                </p>
              </div>
            ))}
            ;
          </div>
        </Grid>
      </React.Fragment>
    );
  }

  render() {
    if (this.state.isComplete)
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