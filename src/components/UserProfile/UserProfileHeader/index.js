import React from "react";
import { withStyles } from "@mui/styles";
import StyledButton from "snet-dapp-components/components/StyledButton";
import UserProfileCard from "snet-dapp-components/components/UserProfileCard";
import { useStyles } from "./styles";

const UserProfileHeader = ({ classes, nickname, email }) => {
  return (
    <div className={classes.userProfileHeader}>
      <UserProfileCard nickName={nickname} email={email} />
      <StyledButton type="transparentBlueBorder" btnText="request developer's account" />
    </div>
  );
};

export default withStyles(useStyles)(UserProfileHeader);
