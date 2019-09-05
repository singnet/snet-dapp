import React from "react";
import { withStyles } from "@material-ui/styles";

import UserProfileCard from "../../common/UserProfileCard";
import { useStyles } from "./styles";
import StyledButton from "../../common/StyledButton";

const UserProfileHeader = ({ classes, nickname }) => {
  return (
    <div className={classes.userProfileHeader}>
      <UserProfileCard nickName={nickname} />
      <StyledButton type="transparentBlueBorder" btnText="request developer's account" />
    </div>
  );
};

export default withStyles(useStyles)(UserProfileHeader);
