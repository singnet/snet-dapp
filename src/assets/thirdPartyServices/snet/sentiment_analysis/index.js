import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import {SentimentAnalysis} from "./sentiment_analysis_rpc_pb_service";
import OutlinedDropDown from "../../common/OutlinedDropdown";
import OutlinedTextArea from "../../common/OutlinedTextArea";
import OutlinedLabel from "../../common/OutlinedLabel";
import PositiveIcon from "@material-ui/icons/SentimentVerySatisfied";
import NeutralIcon from "@material-ui/icons/SentimentSatisfied";
import NegativeIcon from "@material-ui/icons/SentimentVeryDissatisfied";
import InfoIcon from "@material-ui/core/SvgIcon/SvgIcon";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";

class SentimentAnalysisService extends React.Component {
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
                    content: "Great price, fast shipping, great product. \n\n " +
                        "@Olielayus I want to go to promote GEAR AND GROOVE but unfornately no ride there  I may b going to " +
                        "the one in Anaheim in May though. \n\n " +
                        "@maja_dren2, is still sick, and worrying the orange she just ate is going to come back up... ugh.",
                },
            ],
            serviceName: undefined,
            methodName: "Analyze",
            message: "",
            response: undefined,
            reqStart: undefined
        };
    }

    handleFormUpdate(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleParameterChange(event) {
        this.setState({
            selectedExample: event.target.value,
        }, () => {
            if (this.state.selectedExample !== "default") {
                this.state.exampleList.forEach(item => {
                    if (item.value == event.target.value) {
                        this.setState({message: item.content}, () => {
                                this.textInput.current.inputRef.current.focus();
                            },
                        );
                    }
                });
            }
        });
    }

    handleInputText(event) {
        this.setState({[event.target.name]: event.target.value});
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

    parseResponse(response) {
        try {
            let parsedResponse = JSON.parse(response);
            let parsedResult = [];
            for (let i = 0; i < parsedResponse.length; i++) {
                let parsedAnalysis = JSON.parse(parsedResponse[i].analysis.split("\'").join("\""));
                parsedResult.push({id: parsedResponse[i].id, analysis: parsedAnalysis});
            }
            return parsedResult;
        } catch (e) {
            return [];
        }
    }

    canBeInvoked() {
        return typeof this.state.message !== "undefined" && this.state.message.trim() !== "";
    }

    submitAction() {
        const {methodName, message} = this.state;
        const methodDescriptor = SentimentAnalysis[methodName];
        const request = new methodDescriptor.requestType();

        request.setValue(JSON.stringify(this.handleSentences()));

        const props = {
            request,
            onEnd: response => {
                const {message, status, statusMessage} = response;
                if (status !== 0) {
                    throw new Error(statusMessage);
                }
                this.setState({
                    response: {status: "success", value: message.getValue()},
                });
            },
        };

        this.props.serviceClient.unary(methodDescriptor, props);
        this.setState({reqStart: new Date()});
    }

    renderForm() {

        return (
            <React.Fragment>
                <Grid item xs={12} style={{textAlign: "left"}}>

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
                <Grid item xs={12} style={{textAlign: "left"}}>

                    <OutlinedTextArea
                        id="input_text"
                        ref={this.textInput}
                        name="message"
                        label="Input Text"
                        value={this.state.message}
                        helperTxt={this.state.message.length + " / 5000 char " + " - " + this.handleSentences().length + " sentence(s)"}
                        rows={5}
                        charLimit={5000}
                        onChange={this.handleInputText}
                        htmlTooltip={
                            <div>
                                <p>If you want to parse many sentences, divide the sentences by break lines and the service will respond one analysis for each sentence.</p>
                                <p>In case you want analyze an entire sentence, please write your sentence continuously without line break.</p>
                            </div>
                        }
                    />

                </Grid>
                <Grid item xs={12} style={{textAlign: "center"}}>
                    <Button variant="contained" color="primary" onClick={this.submitAction}
                            disabled={!this.canBeInvoked()}>
                        Invoke
                    </Button>
                </Grid>

            </React.Fragment>
        );
    }

    renderComplete() {
        const sentSentences = this.handleSentences();
        const response = this.parseResponse(this.state.response.value);
        const responseTime = (new Date() - this.state.reqStart) / 1000;

        return (

            <div style={{background: "#F8F8F8", padding: "24px"}}>

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
                    infoTitle="Sentiment Analysis"
                    htmlValue={
                        <Grid container
                              direction="row"
                              justify="center"
                              alignItems="center"
                        >
                            <Grid item xs={5}><span style={{color: "#212121"}}>Sentence</span></Grid>
                            <Grid item xs={2}><span style={{color: "#212121"}}>Sentiment</span></Grid>
                            <Grid item xs={5}>
                                <Tooltip
                                    style={{width: "200px"}}
                                    title={
                                        <Typography>
                                            <span><b>About scoring: </b></span><br/>
                                            <br/>
                                            <span>The <b>compound</b> score is computed by summing the valence scores of each word in the lexicon, adjusted according to the rules, and then normalized to be between -1 (most extreme negative) and +1 (most extreme positive). This is the most useful metric if you want a single unidimensional measure of sentiment for a given sentence. Calling it a 'normalized, weighted composite score' is accurate.</span>
                                            <br/><br/>
                                            <span>The <b>pos</b>, <b>neu</b>, and <b>neg</b> scores are ratios for proportions of text that fall in each category (so these should all add up to be 1... or close to it with float operation). These are the most useful metrics if you want multidimensional measures of sentiment for a given sentence.</span>
                                            <br/><br/>
                                            <span><b>Positive sentiment: </b>{`compound score >= 0.05`}</span><br/>
                                            <span><b>Neutral sentiment: </b>{`(compound score > -0.05) and (compound score < 0.05)`}</span><br/>
                                            <span><b>Negative sentiment: </b>{`compound score <= -0.05`}</span>
                                            <br/><br/>
                                        </Typography>
                                    }
                                    placement="top"
                                >
                                    <InfoIcon
                                        style={{
                                            color: "#D6D6D6",
                                            "&:hover": {color: "#008BF9",},
                                            verticalAlign: "middle"
                                        }}
                                    />
                                </Tooltip>
                                <span style={{color: "#212121"}}>Intensivity scores</span>
                            </Grid>
                            {
                                response.map((item, index) => {
                                    let sentiment = "";
                                    if (item.analysis.compound >= 0.5) sentiment = "Positive";
                                    if (item.analysis.compound > -0.5 && item.analysis.compound <= 0.5) sentiment = "Neutral";
                                    if (item.analysis.compound <= -0.5) sentiment = "Negative";
                                    return (
                                        <Grid key={index} item xs={12} style={{
                                            padding: 0,
                                            marginTop: 12,
                                            backgroundColor: "rgba(155, 155, 155, 0.05)"
                                        }}>

                                            <Grid container
                                                  direction="row"
                                                  justify="center"
                                                  alignItems="center"
                                            >

                                                <Grid item xs={5}>
                                                    <span style={{color: "#666"}}>{sentSentences[index].sentence}</span>
                                                </Grid>

                                                <Grid item xs={2}>
                                                    <span style={{color: "#666"}}>
                                                      {sentiment === "Positive" ?
                                                          <span><PositiveIcon
                                                              style={{verticalAlign: "middle"}}/></span> : null}
                                                        {sentiment === "Neutral" ?
                                                            <span><NeutralIcon
                                                                style={{verticalAlign: "middle"}}/></span> : null}
                                                        {sentiment === "Negative" ?
                                                            <span><NegativeIcon
                                                                style={{verticalAlign: "middle"}}/></span> : null}
                                                        <span> {sentiment}</span>
                                                    </span>
                                                </Grid>

                                                <Grid item xs={5}>
                                                    <span
                                                        style={{color: "#666"}}>{`pos: ${item.analysis.pos}, neu: ${item.analysis.neu}, neg: ${item.analysis.neg}, compound: ${item.analysis.compound}`}</span>
                                                </Grid>

                                            </Grid>
                                        </Grid>
                                    );
                                })
                            }
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
                <div style={{flexGrow: 1}}>
                    <Grid
                        container
                        style={{marginTop: 15, marginBottom: 15}}
                    >
                        {this.renderComplete()}
                    </Grid>
                </div>
            );
        else {
            return (
                <div style={{flexGrow: 1}}>
                    <Grid
                        container
                        style={{marginTop: 15, marginBottom: 15}}
                    >
                        {this.renderForm()}
                    </Grid>
                </div>
            );
        }
    }
}

export default SentimentAnalysisService;
