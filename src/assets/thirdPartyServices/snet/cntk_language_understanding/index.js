import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import SvgIcon from "@material-ui/core/SvgIcon";
import InfoIcon from "@material-ui/icons/Info";

import HoverIcon from "../../standardComponents/HoverIcon";
import OutlinedDropDown from "../../common/OutlinedDropdown";
import OutlinedTextArea from "../../common/OutlinedTextArea";

import { LanguageUnderstanding } from "./language_understanding_pb_service";

const initialUserInput = {
  methodIndex: "0",
  methodNames: [
    {
      label: "Slot Tagging",
      content: "slot_tagging",
      value: "0",
    },
    {
      label: "Intent Classification",
      content: "intent",
      value: "1",
    },
  ],

  train_ctf_url: "",
  test_ctf_url: "",
  query_wl_url: "",
  slots_wl_url: "",
  intent_wl_url: "",
  vocab_size: "943",
  num_labels: "129",
  num_intents: "26",
  sentences_url: "",
};

export default class CNTKLanguageUnderstanding extends React.Component {
  constructor(props) {
    super(props);
    this.submitAction = this.submitAction.bind(this);
    this.handleFormUpdate = this.handleFormUpdate.bind(this);

    this.state = {
      ...initialUserInput,
      users_guide: "https://singnet.github.io/nlp-services/users_guide/cntk-language-understanding.html",
      code_repo: "https://github.com/singnet/nlp-services/blob/master/cntk-language-understanding",
      reference: "https://cntk.ai/pythondocs/CNTK_202_Language_Understanding.html",
      response: undefined,
    };
  }

  isValidURL(str, file_ext) {
    return (str.startsWith("http://") || str.startsWith("https://")) && str.includes(file_ext);
  }

  canBeInvoked() {
    return (
      this.isValidURL(this.state.train_ctf_url, ".ctf") &&
      this.isValidURL(this.state.test_ctf_url, ".ctf") &&
      this.isValidURL(this.state.query_wl_url, ".wl") &&
      this.isValidURL(this.state.sentences_url, ".txt")
    );
  }

  handleFormUpdate(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  submitAction() {
    const {
      methodIndex,
      methodNames,
      train_ctf_url,
      test_ctf_url,
      query_wl_url,
      slots_wl_url,
      intent_wl_url,
      vocab_size,
      num_labels,
      num_intents,
      sentences_url,
    } = this.state;

    const methodDescriptor = LanguageUnderstanding[methodNames[methodIndex].content];
    const request = new methodDescriptor.requestType();
    request.setTrainCtfUrl(train_ctf_url);
    request.setTestCtfUrl(test_ctf_url);
    request.setQueryWlUrl(query_wl_url);
    request.setSlotsWlUrl(slots_wl_url);
    request.setIntentWlUrl(intent_wl_url);
    request.setVocabSize(vocab_size);
    request.setNumLabels(num_labels);
    request.setNumIntents(num_intents);
    request.setSentencesUrl(sentences_url);

    const props = {
      request,
      onEnd: ({ message }) => {
        this.setState({
          ...initialUserInput,
          response: { status: "success", model_url: message.getModelUrl(), output_url: message.getOutputUrl() },
        });
      },
    };
    this.props.serviceClient.unary(methodDescriptor, props);
  }

  renderForm() {
    return (
      <React.Fragment>
        <Grid container direction="column" alignItems="center" justify="center">
          <Grid item xs={8} container style={{ textAlign: "center" }}>
            <OutlinedDropDown
              id="method"
              name="methodIndex"
              label="Method"
              fullWidth={true}
              list={this.state.methodNames}
              value={this.state.methodIndex}
              onChange={this.handleFormUpdate}
            />
          </Grid>

          <Grid item xs={8} container style={{ textAlign: "center" }}>
            <OutlinedTextArea
              id="train_ctf_url"
              name="train_ctf_url"
              label="Train CTF (URL)"
              type="text"
              fullWidth={true}
              value={this.state.train_ctf_url}
              rows={1}
              onChange={this.handleFormUpdate}
            />
          </Grid>

          <Grid item xs={8} container style={{ textAlign: "center" }}>
            <OutlinedTextArea
              id="test_ctf_url"
              name="test_ctf_url"
              label="Test CTF (URL)"
              type="text"
              fullWidth={true}
              value={this.state.test_ctf_url}
              rows={1}
              onChange={this.handleFormUpdate}
            />
          </Grid>

          <Grid item xs={8} container style={{ textAlign: "center" }}>
            <OutlinedTextArea
              id="query_wl_url"
              name="query_wl_url"
              label="Query List (URL)"
              type="text"
              fullWidth={true}
              value={this.state.query_wl_url}
              rows={1}
              onChange={this.handleFormUpdate}
            />
          </Grid>

          <Grid item xs={8} container style={{ textAlign: "center" }}>
            <OutlinedTextArea
              id="slots_wl_url"
              name="slots_wl_url"
              label="Slots List (URL)"
              type="text"
              fullWidth={true}
              value={this.state.slots_wl_url}
              rows={1}
              onChange={this.handleFormUpdate}
            />
          </Grid>

          <Grid item xs={8} container style={{ textAlign: "center" }}>
            <OutlinedTextArea
              id="intent_wl_url"
              name="intent_wl_url"
              label="Intent List (URL)"
              type="text"
              fullWidth={true}
              value={this.state.intent_wl_url}
              rows={1}
              onChange={this.handleFormUpdate}
            />
          </Grid>

          <Grid item xs={8} container spacing={1}>
            <Grid item xs>
              <OutlinedTextArea
                id="vocab_size"
                name="vocab_size"
                type="number"
                label="Vocabulary Size"
                value={this.state.vocab_size}
                min={1}
                fullWidth={true}
                onChange={this.handleFormUpdate}
              />
            </Grid>
            <Grid item xs>
              <OutlinedTextArea
                id="num_labels"
                name="num_labels"
                type="number"
                label="Number of Labels"
                value={this.state.num_labels}
                min={1}
                fullWidth={true}
                onChange={this.handleFormUpdate}
              />
            </Grid>
            <Grid item xs>
              <OutlinedTextArea
                id="num_intents"
                name="num_intents"
                type="number"
                label="Number of Intents"
                value={this.state.num_intents}
                min={1}
                fullWidth={true}
                onChange={this.handleFormUpdate}
              />
            </Grid>
          </Grid>

          <Grid item xs={8} container style={{ textAlign: "center" }}>
            <OutlinedTextArea
              id="sentences_url"
              name="sentences_url"
              label="Sentences (URL)"
              type="text"
              fullWidth={true}
              value={this.state.sentences_url}
              rows={1}
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

          <Grid item xs={12} container justify="center" style={{ textAlign: "center" }}>
            <Button variant="contained" color="primary" onClick={this.submitAction} disabled={!this.canBeInvoked()}>
              Invoke
            </Button>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }

  renderComplete() {
    const { status, model_url, output_url } = this.state.response;

    return (
      <Grid style={{ background: "#F8F8F8", padding: "24px" }}>
        <h4> Results</h4>
        <Grid style={{ padding: "10px 10px 0 10px", fontSize: "14px", color: "#9b9b9b" }}>
          <Grid style={{ padding: "10px 0", borderBottom: "1px solid #eee" }}>
            Status: <span style={{ color: "#212121" }}>{status}</span>
          </Grid>
          <Grid style={{ padding: "10px 0", borderBottom: "1px solid #eee" }}>
            Model: <span style={{ color: "#212121" }}>{model_url}</span>
          </Grid>
          <Grid style={{ padding: "10px 0", borderBottom: "1px solid #eee" }}>
            Output: <span style={{ color: "#212121" }}>{output_url}</span>
          </Grid>
        </Grid>
      </Grid>
    );
  }

  render() {
    if (this.props.isComplete) return <div>{this.renderComplete()}</div>;
    else {
      return <div>{this.renderForm()}</div>;
    }
  }
}
