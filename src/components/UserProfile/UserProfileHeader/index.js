import React from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/styles";

import UserProfileCard from "../../common/UserProfileCard";
import { useStyles } from "./styles";

const UserProfileHeader = ({ classes, userName }) => {
  return (
    <div className={classes.userProfileHeader}>
      <UserProfileCard userName={userName} />
      <Link className={classes.requestText}>request developer's account</Link>
    </div>
  );
};

export default withStyles(useStyles)(UserProfileHeader);
