import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import SvgIcon from "@material-ui/core/SvgIcon";
import InfoIcon from "@material-ui/icons/Info";

import HoverIcon from "../../standardComponents/HoverIcon";
import OutlinedDropDown from "../../common/OutlinedDropdown";
import OutlinedTextArea from "../../common/OutlinedTextArea";

import { ResolveReference } from "./CoreferenceResolutionService_pb_service";

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

const initialUserInput = {
  sentencesIndex: "0",
  sentences: [
    {
      label: "Samples",
      content: "",
      value: "0",
    },
    {
      label: "Michael is a great man. He does what is required of him.",
      content: "Michael is a great man. He does what is required of him.",
      value: "1",
    },
    {
      label: "Paul Allen was born on January 21, 1953, in Seattle, Washington, to Kenneth Sam Allen ...",
      content:
        "Paul Allen was born on January 21, 1953, in Seattle, Washington, to Kenneth Sam Allen and Edna Faye Allen. " +
        "Allen attended Lakeside School, a private school in Seattle, where he befriended Bill Gates, two years younger, with " +
        "whom he shared an enthusiasm for computers. Paul and Bill used a teletype terminal at their high school, Lakeside, " +
        "to develop their programming skills on several time-sharing computer systems.",
      value: "2",
    },
    {
      label: "SingularityNET lets anyone create, share, and monetize AI services at scale. ...",
      content:
        "SingularityNET lets anyone create, share, and monetize AI services at scale. It helps you in your endeavors",
      value: "3",
    },
  ],
  sentence: "",
};

export default class CoreferenceResolutionService extends React.Component {
  constructor(props) {
    super(props);
    this.handleFormUpdate = this.handleFormUpdate.bind(this);
    this.submitAction = this.submitAction.bind(this);

    this.state = {
      ...initialUserInput,
      users_guide: "https://singnet.github.io/nlp-services-misc/users_guide/coreference-resolution-service.html",
      code_repo: "https://github.com/singnet/nlp-services-misc/tree/master/coreference-resolution",
      reference: "https://demo.allennlp.org/coreference-resolution",
      response: undefined,
    };
  }

  canBeInvoked() {
    return this.state.sentence !== "";
  }

  submitAction() {
    const { sentence } = this.state;
    const methodDescriptor = ResolveReference["resolution"];
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
          response: {
            status: "success",
            references: message.toObject().referencesList,
            words: message.toObject().words,
          },
        });
      },
    };

    this.props.serviceClient.unary(methodDescriptor, props);
  }

  handleFormUpdate(event) {
    this.setState({ [event.target.name]: event.target.value });
    if (event.target.name === "sentencesIndex") {
      const { sentences } = this.state;
      this.setState({ sentence: sentences[event.target.value].content });
    }
  }

  renderForm() {
    return (
      <React.Fragment>
        <Grid container spacing={2} justify="center" alignItems="center">
          <Grid item xs={12} container justify="center" style={{ textAlign: "center" }}>
            <OutlinedDropDown
              id="sentences"
              name="sentencesIndex"
              label="Sample Sentences"
              fullWidth={true}
              list={this.state.sentences}
              value={this.state.sentencesIndex}
              onChange={this.handleFormUpdate}
            />
          </Grid>

          <Grid item xs={12} style={{ textAlign: "left" }}>
            <OutlinedTextArea
              id="sentence"
              name="sentence"
              label="Sentence(s)"
              fullWidth={true}
              value={this.state.sentence}
              rows={8}
              charLimit={5000}
              onChange={this.handleFormUpdate}
            />
          </Grid>

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
