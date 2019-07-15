import React from "react";
import { CheckCircle, Cancel } from "@material-ui/icons";
import { Grid, Card, CardContent } from "@material-ui/core";

export default class MosesServiceResult extends React.Component {
  renderError() {
    return (
      <Card
        style={{
          backgroundColor: "#ffdede",
        }}
        elevation={0}
      >
        <CardContent>
          <Cancel style={{ fontSize: "36px", color: "maroon" }} />
          <br />
          <p>{this.props.result.description}</p>
        </CardContent>
      </Card>
    );
  }

  renderCompleted() {
    return (
      <Card
        style={{
          backgroundColor: "#deffde",
        }}
        elevation={0}
      >
        <CardContent>
          <h4>
            <CheckCircle style={{ fontSize: "36px", color: "#54C21F" }} />
            <br />
            Anlaysis started!
          </h4>
          <p>Follow the link below to check the status of the analysis.</p>
          <p
            style={{
              marginTop: "15px",
              backgroundColor: "#fff",
              border: "5px",
              padding: "10px",
              borderRadius: "5px",
            }}
          >
            <a rel="noopener noreferrer" target="_blank" href={this.props.result.resultUrl}>
              {this.props.result.resultUrl}
            </a>
          </p>
        </CardContent>
      </Card>
    );
  }

  render() {
    return (
      <React.Fragment>
        <Grid container justify={"center"}>
          <Grid xs={12} item style={{ textAlign: "center", paddingTop: "10%" }}>
            {this.props.result.resultUrl ? this.renderCompleted() : this.renderError()}
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}
