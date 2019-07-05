import React from "react";
import Icon from "@material-ui/core/Icon";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/styles";

import { useStyles } from "./styles";

const UserMenuItem = ({ classes, icon, title, linkTo }) => {
  return (
    <li>
      <Icon className={clsx(classes.icon, icon)} />
      <Link to={linkTo}>{title}</Link>
    </li>
  );
};

export default withStyles(useStyles)(UserMenuItem);
