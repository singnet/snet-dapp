import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/styles";

import StyledButton from "../../common/StyledButton";
import { useStyles } from "./styles";

class PricingDetails extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Grid item xs={12} sm={12} md={4} lg={4} className={classes.creditsContainer}>
        <div className={classes.creditsAndToken}>
          <div className={classes.credits}>
            <span>credits</span>
            <span>12</span>
          </div>
          <span>=</span>
          <div className={classes.tokens}>
            <span>agi tokens</span>
            <span>0.000001</span>
          </div>
        </div>
        <p>
          <i className="fas fa-info-circle"></i>
          <span>Fixed price per use</span>
        </p>
        <StyledButton btnText="demo" />
      </Grid>
    );
  }
}

export default withStyles(useStyles)(PricingDetails);
