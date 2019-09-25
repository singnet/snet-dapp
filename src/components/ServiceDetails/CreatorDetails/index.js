import React from "react";
import { withStyles } from "@material-ui/styles";

import SingularityLogo from "../../../assets/images/avatar.png";
import { useStyles } from "./styles";

const CreatorDetails = ({ classes, organizationName, orgImg }) => {
  return (
    <div className={classes.creatorDetailsContainer}>
      <h3>Provider</h3>
      <div className={classes.companyInfo}>
        <img src={orgImg || SingularityLogo} alt="SingularityNET" />
        <div className={classes.companyName}>
          <h4>{organizationName}</h4>
        </div>
      </div>
    </div>
  );
};

export default withStyles(useStyles)(CreatorDetails);
