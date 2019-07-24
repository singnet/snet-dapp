import React from "react";
import { withStyles } from "@material-ui/styles";

import { useStyles } from "./styles";

const CreatorDetails = ({ classes, organizationName }) => {
  return (
    <div className={classes.creatorDetailsContainer}>
      <h3>Creator Details</h3>
      <div className={classes.companyInfo}>
        <img src="http://placehold.it/72x72" alt="" />
        <div className={classes.companyName}>
          <h4>{organizationName}</h4>
        </div>
      </div>
    </div>
  );
};

export default withStyles(useStyles)(CreatorDetails);
