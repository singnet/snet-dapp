import React from "react";
import Icon from "@material-ui/core/Icon";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/styles";

import { useStyles } from "./styles";

const UserMenuAction = ({ title, icon, action, dispatch, classes }) => {
  const handleClick = () => {
    dispatch(action);
  };

  return (
    <li className={classes.UserMenuAction}>
      <Icon className={icon} />
      <span onClick={handleClick}>{title}</span>
    </li>
  );
};

export default connect()(withStyles(useStyles)(UserMenuAction));
