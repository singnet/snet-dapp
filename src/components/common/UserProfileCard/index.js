import React from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/styles";
import Icon from "@material-ui/core/Icon";

import { useStyles } from "./styles";

const UserProfileCard = ({ classes, userName }) => {
  return (
    <div className={classes.Userdetails}>
      <Icon className={clsx(classes.icon, "fas fa-user-circle")} />
      <div>
        <h4>{userName}</h4>
        <Link to="/">change photo</Link>
      </div>
    </div>
  );
};

export default withStyles(useStyles)(UserProfileCard);
