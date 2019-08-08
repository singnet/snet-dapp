import React from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/styles";
import Divider from "@material-ui/core/Divider";
import StyledDropdown from "../../common/StyledDropdown";

import { useStyles } from "./styles";

const UserProfileAccount = ({ classes }) => {
  return (
    <div>
      {" "}
      <Grid container spacing={10} className={classes.accountMainContainer}>
        <Grid xs={12} sm={12} md={3} lg={3} className={classes.accountContainer}>
          <h3>Payment / Transfer Method</h3>
          <Divider />
          <StyledDropdown labelTxt="Walet" />
        </Grid>
      </Grid>
    </div>
  );
};

export default withStyles(useStyles)(UserProfileAccount);
