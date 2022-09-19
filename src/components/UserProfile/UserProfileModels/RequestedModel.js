import React from "react";
import { withStyles } from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import { useStyles } from "./styles";

const RequestedModel = ({ classes }) => {
  return (
    <Grid container spacing={24} className={classes.requestedModelsContainer}>
      <Grid item xs={12} sm={12} md={12} lg={12} className={classes.requestedModelsHeaders}>
        <Grid item xs={3} sm={3} md={3} lg={3}>
          <Typography>name</Typography>
        </Grid>
        <Grid item xs={2} sm={2} md={2} lg={2}>
          <Typography>service</Typography>
        </Grid>
        <Grid item xs={3} sm={3} md={3} lg={3}>
          <Typography>submission date</Typography>
        </Grid>
        <Grid item xs={2} sm={2} md={2} lg={2}>
          <Typography>fee</Typography>
        </Grid>
        <Grid item xs={2} sm={2} md={2} lg={2}>
          <Typography>status</Typography>
        </Grid>
      </Grid>
      <Grid container spacing={24} className={classes.requestedModelsDataContainer}>
        <Grid item xs={12} sm={12} md={3} lg={3}>
          <span>name:</span>
          <Typography>Region Recognation</Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={2} lg={2}>
          <span>service:</span>
          <Typography>Deoldify photos</Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3}>
          <span>submission date:</span>
          <Typography>15 June 2022 - 9:14 AM</Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={2} lg={2}>
          <span>fee:</span>
          <Typography>0.5 AZIX</Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={2} lg={2}>
          <span>status:</span>
          <Typography>Ready for use</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default withStyles(useStyles)(RequestedModel);
