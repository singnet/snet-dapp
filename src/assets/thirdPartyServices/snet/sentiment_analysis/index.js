import React from "react";
import { hasOwnDefinedProperty } from "../../../../utility/JSHelper";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import Typography from "@material-ui/core/Typography";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import {SentimentAnalysis} from './sentiment_analysis_rpc_pb_service';

export default class NamedEntityRecognitionService extends React.Component {
  constructor(props) {
    super(props);
    this.submitAction = this.submitAction.bind(this);
    this.handleFormUpdate = this.handleFormUpdate.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      serviceName: undefined,
      methodName: "Analyze",
      message: undefined,
      response: undefined,
      expanded: null,
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
    this.message = undefined;
    this.isComplete = false;
    this.serviceMethods = [];
    this.allServices = [];
    this.methodsForAllServices = [];

  }

 handleFormUpdate(event) {
  console.log(event.target);
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
  let filterArray = tempArray.filter(function (el) {
      return el != null;
  });

  let itemsToAnalyze = [];
  for (let i = 0; i < filterArray.length; i++) {
      itemsToAnalyze.push({id: i + 1, sentence: filterArray[i]});
  }
  return itemsToAnalyze;
}

  submitAction() {
    const { methodName, message } = this.state;
    const methodDescriptor = SentimentAnalysis[methodName];
    const request = new methodDescriptor.requestType();

    request.setValue(JSON.stringify(this.handleSentences()));

    const props = {
      request,
      onEnd: response => {
        const { message, status, statusMessage } = response;
        if (status !== 0) {
          throw new Error(statusMessage);
        }
        this.setState({
          response: { status: "success", value: message.getValue() },
        });
      },
    };

    this.props.serviceClient.unary(methodDescriptor, props);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  parseResponse(response) {
    //Temporary parse
    //Will be improved and migrated to backend service soon
    try {
      let resultItems = [];

      /*
      const responseArray = atob(response).split("}");
      for (let i = 0; i < responseArray.length - 1; i++) {
        let arrayItem = responseArray[i].split("{");
        let stringJson = "{" + arrayItem[1] + "}";
        let item = {
          sentence: arrayItem[0],
          result: JSON.parse(stringJson.replace(new RegExp("'", "g"), '"')),
        };
        resultItems.push(item);
      }
      return resultItems;
      */

      // Anyway we are pushing only one sentence in the input.
      var jsonResult = JSON.parse(response);

      var i=0;
      var input = this.handleSentences();
      jsonResult.forEach(val => {  

        let item = {
          sentence: input[i++].sentence,
          result: val.analysis,
        };
        resultItems.push(item);

      });

      return resultItems;

    } catch (e) {
      return [];
    }
  }

  renderForm() {
    const answer = {
      first: {
        sentence: "Great price, fast shipping, great product.",
        result: { neg: 0.0, neu: 0.328, pos: 0.672, compound: 0.8481 },
      },
      second: {
        sentence:
          "@Olielayus I want to go to promote GEAR AND GROOVE but unfornately no ride there  I may b going to the one in Anaheim in May though.",
        result: { neg: 0.105, neu: 0.785, pos: 0.11, compound: -0.2144 },
      },
      third: {
        sentence: "@maja_dren2, is still sick, and worrying the orange she just ate is going to come back up... ugh.",
        result: { neg: 0.362, neu: 0.638, pos: 0.0, compound: -0.8176 },
      },
    };
    return (
      <React.Fragment>
        <Grid item xs={12} style={{ textAlign: "center" }}>
          <h3>Sentiment Analysis Service</h3>
        </Grid>
        <Grid item xs={12}>
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
          <Button variant="contained" color="primary" onClick={this.submitAction}>
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
                Great price, fast shipping, great product.
                <br />
                <br />
                @Olielayus I want to go to promote GEAR AND GROOVE but unfornately no ride there I may b going to the
                one in Anaheim in May though.
                <br />
                <br />
                @maja_dren2, is still sick, and worrying the orange she just ate is going to come back up... ugh.
              </pre>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography style={this.state.styles.defaultFontSize}>Response example</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails style={this.state.styles.details}>
              <pre>
                <p>
                  {answer.first.sentence}
                  <br />
                  {JSON.stringify(answer.first.result)}
                </p>
                <p>
                  {answer.second.sentence}
                  <br />
                  {JSON.stringify(answer.second.result)}
                </p>
                <p>
                  {answer.third.sentence}
                  <br />
                  {JSON.stringify(answer.third.result)}
                </p>
              </pre>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </Grid>
      </React.Fragment>
    );
  }

  renderComplete() {

    const {response} = this.state;

    const result = this.parseResponse(response.value);
    return (
        
<div style={{background:"#F8F8F8", padding: "24px"}}>
    <h4> Results</h4>
    <div style={{ padding: "10px 0",fontSize: "14px",color:"#9b9b9b" }}>Response from service is: 
        <div style={{color:"#212121", marginTop:"5px",padding:"10px", background:"#f1f1f1",borderRadius:"4px"}}>
          <React.Fragment>
            <Grid item xs={12} style={{ textAlign: "center" }}>
              <div style={{ textAlign: "left" }}>
                {result.map(item => (
                  <h5 style={{fontSize: "14px"}}>
                    <span style={{fontWeight:"400"}}>{item.sentence}</span>
                    <br />
                    {JSON.stringify(item.result)}
                    <br />
                  </h5>
                ))}
              </div>
            </Grid>
          </React.Fragment>
        </div>
    </div>         
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
