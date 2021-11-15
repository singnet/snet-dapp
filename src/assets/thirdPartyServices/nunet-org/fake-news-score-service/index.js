import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import OutlinedTextArea from "../../common/OutlinedTextArea";
import OutlinedDropDown from "../../common/OutlinedDropdown";

//import { FakeNewsScore } from "./fake_news_score_pb_service";

const initialUserInput = {
  methodIndex: "0",
  methodNames: [
    {
      label: "fn_score_calc",
      content: "fn_score_calc",
      value: "0",
    },
  ],
  headline: "news_headline",
  body: "news_body lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
};

export default class FakeNewsScoreService extends React.Component {
  constructor(props) {
    super(props);
    this.handleFormUpdate = this.handleFormUpdate.bind(this);
    this.state = { ...initialUserInput };
  }

  handleFormUpdate(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleFocus = event => event.target.select();

  submitAction() {
    //const { methodIndex, methodNames } = this.state;
  }

  renderForm() {
    return (
      <React.Fragment>
        <Grid container direction="column" alignItems="center" justify="center">
          <Grid item xs={6} container style={{ textAlign: "center" }}>
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

          <Grid item xs={6} container spacing={1}>
            <OutlinedTextArea
              id="headline"
              name="headline"
              label="Headline"
              type="text"
              fullWidth={false}
              value={this.state.headline}
              rows={2}
              onChange={this.handleFormUpdate}
              onFocus={this.handleFocus}
            />
          </Grid>

          <Grid item xs={8} container spacing={1}>
            <OutlinedTextArea
              id="body"
              name="body"
              label="Body"
              type="text"
              fullWidth={false}
              value={this.state.body}
              rows={5}
              onChange={this.handleFormUpdate}
              onFocus={this.handleFocus}
            />
          </Grid>

          <Grid item xs={12} style={{ textAlign: "center" }}>
            <Button variant="contained" color="primary">
              Invoke
            </Button>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }

  render() {
    return <div>{this.renderForm()}</div>;
  }
}
