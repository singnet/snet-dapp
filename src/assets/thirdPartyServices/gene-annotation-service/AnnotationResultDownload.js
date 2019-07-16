import React from "react";
import logo from "./mozi_globe.png";
import { Grid, Button, Typography } from "@material-ui/core";
import { ArrowDownward } from "@material-ui/icons";

export default class AnnotationResultDownload extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Grid containe style={{ paddingTop: "30px" }}>
          <Grid item style={{ textAlign: "center" }}>
            <img alt="MOZI globe logo" src={logo} style={{ width: "100px" }} />
            <Typography variant="h3" gutterBottom>
              Annotaion result ready!
            </Typography>
            <Typography variant="body1" gutterBottom>
              The result was too large for visualization. Please click the button below to download the annotation
              result file.
            </Typography>

            <Button variant="contained" onClick={e => this.props.downloadSchemeFile()} color="primary">
              <ArrowDownward />
              Download annotation results
            </Button>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}
