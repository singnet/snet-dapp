import React from "react";
import { withStyles } from "@material-ui/styles";

import UserProfileCard from "../../common/UserProfileCard";
import { useStyles } from "./styles";
import StyledButton from "../../common/StyledButton";

const UserProfileHeader = ({ classes, username }) => {
  return (
    <div className={classes.userProfileHeader}>
      <UserProfileCard userName={username} />
      <StyledButton type="transparentBlueBorder" btnText="request developer's account" />
    </div>
  );
};

export default withStyles(useStyles)(UserProfileHeader);
