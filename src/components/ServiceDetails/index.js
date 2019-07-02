import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/styles";

import TitleCard from "./TitleCard";
import PricingDetails from "./PricingDetails";
import StyledTabs from "./StyledTabs";
import { useStyles } from "./styles";

class ServiceDetails extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Grid container spacing={24} className={classes.serviceDetailContainer}>
        <TitleCard />
        <PricingDetails />
        <StyledTabs />
      </Grid>
    );
  }
}

export default withStyles(useStyles)(ServiceDetails);
