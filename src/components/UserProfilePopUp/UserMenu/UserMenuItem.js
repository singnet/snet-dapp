import React from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/styles";

import { useStyles } from "./styles";

const UserMenuItem = ({ classes, icon: Icon, title, linkTo }) => {
  return (
    <li>
      <Link to={`/${linkTo}`}>
        <Icon className={classes.icon} />
        <span className={classes.title}>{title}</span>
      </Link>
    </li>
  );
};
export default withStyles(useStyles)(UserMenuItem);
