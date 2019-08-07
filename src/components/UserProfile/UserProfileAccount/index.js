import React from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/styles";

import { useStyles } from "./styles";

const UserProfileAccount = ({ classes }) => {
  return (
    <div>
      {" "}
      <Grid container spacing={6} className={classes.settingMainContainer}>
        HEllo
      </Grid>
    </div>
  );
};

export default withStyles(useStyles)(UserProfileAccount);
