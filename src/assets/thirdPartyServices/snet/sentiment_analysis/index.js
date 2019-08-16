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

export default class NamedEntityRecognitionService extends React.Component {
  constructor(props) {
    super(props);
    this.submitAction = this.submitAction.bind(this);
    this.handleServiceName = this.handleServiceName.bind(this);
    this.handleFormUpdate = this.handleFormUpdate.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      serviceName: undefined,
      methodName: undefined,
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
    this.parseProps(props);
  }

  parseProps(nextProps) {
    this.isComplete = nextProps.isComplete;
    if (!this.isComplete) {
      this.parseServiceSpec(nextProps.serviceSpec);
    } else {
      if (typeof nextProps.response !== "undefined") {
        if (typeof nextProps.response === "string") {
          this.setState({ response: nextProps.response });
        } else {
          this.setState({ response: nextProps.response.value });
        }
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.isComplete !== nextProps.isComplete) {
      this.parseProps(nextProps);
    }
  }

  parseServiceSpec(serviceSpec) {
    const packageName = Object.keys(serviceSpec.nested).find(
      key => typeof serviceSpec.nested[key] === "object" && hasOwnDefinedProperty(serviceSpec.nested[key], "nested")
    );

    var objects = undefined;
    var items = undefined;
    if (typeof packageName !== "undefined") {
      items = serviceSpec.lookup(packageName);
      objects = Object.keys(items);
    } else {
      items = serviceSpec.nested;
      objects = Object.keys(serviceSpec.nested);
    }

    this.methodsForAllServices = [];
    objects.map(rr => {
      if (typeof items[rr] === "object" && items[rr] !== null && items[rr].hasOwnProperty("methods")) {
        this.allServices.push(rr);
        this.methodsForAllServices.push(rr);
        var methods = Object.keys(items[rr]["methods"]);
        this.methodsForAllServices[rr] = methods;
      }
    });
  }

  handleFormUpdate(event) {
    console.log(event.target);
    this.setState({ [event.target.name]: event.target.value });
  }

  handleServiceName(event) {
    var strService = event.target.value;
    this.setState({ serviceName: strService });
    this.serviceMethods.length = 0;
    var data = Object.values(this.methodsForAllServices[strService]);
    if (typeof data !== "undefined") {
      console.log("typeof data !== 'undefined'");
      this.serviceMethods = data;
    }
  }

  submitAction() {
    this.props.callApiCallback(this.state.serviceName, this.state.methodName, {
      value: btoa(this.state.message),
    });
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  parseResponse(response) {
    //Temporary parse
    //Will be improved and migrated to backend service soon
    try {
      let resultItems = [];
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
          <br />
          <FormControl style={{ minWidth: "100%" }}>
            <Select
              value={this.state.serviceName}
              onChange={this.handleServiceName}
              displayEmpty
              name="serviceName"
              style={this.state.styles.defaultFontSize}
            >
              <MenuItem style={this.state.styles.defaultFontSize} value={undefined}>
                <em>Select a Service</em>
              </MenuItem>
              {this.allServices.map(item => (
                <MenuItem style={this.state.styles.defaultFontSize} value={item} key={item}>
                  {item}
                </MenuItem>
              ))}
              ;
            </Select>
          </FormControl>
          <br />
          <FormControl style={{ minWidth: "100%" }}>
            <Select
              value={this.state.methodName}
              onChange={this.handleFormUpdate}
              displayEmpty
              name="methodName"
              style={this.state.styles.defaultFontSize}
            >
              <MenuItem style={this.state.styles.defaultFontSize} value={undefined}>
                <em>Select a Method</em>
              </MenuItem>
              {this.serviceMethods.map(item => (
                <MenuItem style={this.state.styles.defaultFontSize} value={item}>
                  {item}
                </MenuItem>
              ))}
              ;
            </Select>
          </FormControl>
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
    const result = this.parseResponse(this.props.response.value);
    return (
      <React.Fragment>
        <Grid item xs={12} style={{ textAlign: "center" }}>
          <h4>Response from service is:</h4>
          <br />
          <div style={{ textAlign: "left", padding: 20, backgroundColor: "#E5EFFC" }}>
            {result.map(item => (
              <h5>
                {item.sentence}
                <br />
                {JSON.stringify(item.result)}
                <br />
              </h5>
            ))}
            ;
          </div>
        </Grid>
      </React.Fragment>
    );
  }

  render() {
    if (this.isComplete)
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
