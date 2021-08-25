import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";

import OutlinedTextArea from "../../common/OutlinedTextArea";

import { fake_news_classification } from "./fake_news_pb_service";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Typography from "@material-ui/core/Typography";

const initialUserInput = {
  method: "classify",
  headline: "news_headline",
  body: "news_body",
  callId: "1",
};

export default class BinaryClassification extends React.Component {
  constructor(props) {
    super(props);
    this.submitAction = this.submitAction.bind(this);
    this.handleFormUpdate = this.handleFormUpdate.bind(this);
    this.state = { ...initialUserInput };
  }

  handleFormUpdate(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleFocus = event => event.target.select();

  canBeInvoked() {
    return this.state.headline !== "" && this.state.body !== "";
  }

  submitAction() {
    const method = this.state.method;
    const headline = this.state.headline;
    const body = this.state.body;
    const callId = this.state.callId;
    const methodDescriptor = fake_news_classification[method];
    const request = new methodDescriptor.requestType();

    request.setHeadline(headline);
    request.setBody(body);
    request.setCallId(callId);

    const props = {
      request,
      onEnd: ({ message }) => {
        this.setState({
          ...initialUserInput,
          response: { status: "success", result: `${message.getResponse()}` },
        });
      },
    };
    this.props.serviceClient.unary(methodDescriptor, props);
  }

  renderForm() {
    return (
      <React.Fragment>
        <Grid container direction="column" alignItems="center" justify="center">
          <Grid item xs={3} container style={{ textAlign: "center" }}>
            <p style={{ fontSize: "20px" }}>Method: {this.state.method}</p>
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
            <Button variant="contained" color="primary" onClick={this.submitAction} disabled={!this.canBeInvoked()}>
              Invoke
            </Button>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }

  renderComplete() {
    const { response } = this.state;
    var res = response.result;
    res = res.replaceAll("'", '"');
    res = JSON.parse(res);

    return (
      <Box>
        <Box align="center">
          <p style={{ fontSize: "20px" }}>Output</p>
        </Box>

        <Grid item xs={12} container justify="center">
          <Grid item xs={4} />
          <Grid item xs={4}>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell align="center">
                    <Typography variant="subtitle1">Result</Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography variant="subtitle1">{res.binary_classification_result}</Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Grid>
          <Grid item xs={4} />
        </Grid>

        <Box align="center">
          <p>Json Result: {JSON.stringify(res)}</p>
        </Box>
      </Box>
    );
  }

  render() {
    if (this.props.isComplete) return <div>{this.renderComplete()}</div>;
    else {
      return <div>{this.renderForm()}</div>;
    }
  }
}
