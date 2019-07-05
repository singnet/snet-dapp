import React from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/styles";

import { useStyles } from "./styles";

const Tutorial = ({ classes }) => {
  return (
    <Grid container spacing={24} className={classes.tutorialMainContainer}>
      <Grid item xs={12} sm={12} md={8} lg={8}>
        <div className={classes.tutorialContainer}>
          <h3>Tutorial</h3>
        </div>
      </Grid>
    </Grid>
  );
};

export default withStyles(useStyles)(Tutorial);
