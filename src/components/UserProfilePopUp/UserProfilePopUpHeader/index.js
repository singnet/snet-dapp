import React from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import { withStyles } from "@material-ui/styles";

import UserProfileCard from "../../common/UserProfileCard";
import { useStyles } from "./styles";

const UserProfilePopUpHeader = ({ classes, nickName, remainingCredits, usedCredits, onClose }) => {
  return (
    <div className={classes.UserProfilePopUpHeader}>
      <UserProfileCard nickName={nickName} onClose={onClose} />
      <div className={classes.creditsCount}>
        <span className={classes.creditsRemaining}>{remainingCredits} credits remaining</span>
        <LinearProgress className={classes.styledProgressBar} variant="determinate" value={80} />
        <span className={classes.usedCredits}>({usedCredits} used this month)</span>
      </div>
    </div>
  );
};

export default withStyles(useStyles)(UserProfilePopUpHeader);
