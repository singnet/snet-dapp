import React from "react";
import { withStyles } from "@material-ui/styles";

import UserProfileHeader from "./UserProfileHeader";
import UserMenu from "./UserMenu";
import { useStyles } from "./styles";

const UserProfile = ({ classes }) => {
  return (
    <div className={classes.UserProfilePopUpContainer}>
      <UserProfileHeader userName="waythingswork" remainingCredits="120" usedCredits="30" />
      <UserMenu />
    </div>
  );
};

export default withStyles(useStyles)(UserProfile);
