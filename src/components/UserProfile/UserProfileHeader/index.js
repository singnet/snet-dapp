import React from "react";
import Icon from "@material-ui/core/Icon";
import clsx from "clsx";
import { Link } from "react-router-dom";
import LinearProgress from "@material-ui/core/LinearProgress";
import { withStyles } from "@material-ui/styles";

import { useStyles } from "./styles";

const UserProfileHeader = ({ classes, userName, remainingCredits, usedCredits }) => {
  return (
    <div className={classes.UserProfilePopUpHeader}>
      <div className={classes.Userdetails}>
        <Icon className={clsx(classes.icon, "fas fa-user-circle")} />
        <div>
          <h4>{userName}</h4>
          <Link to="/">change photo</Link>
        </div>
      </div>
      <div className={classes.creditsCount}>
        <span className={classes.creditsRemaining}>{remainingCredits} credits remaining</span>
        <LinearProgress className={classes.styledProgressBar} variant="determinate" value={80} />
        <span className={classes.usedCredits}>({usedCredits} used this month)</span>
      </div>
    </div>
  );
};

export default withStyles(useStyles)(UserProfileHeader);
