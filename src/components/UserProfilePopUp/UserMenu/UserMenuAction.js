import React from "react";
// import Icon from "@mui/material/Icon";
import { connect } from "react-redux";
import { withStyles } from "@mui/styles";

import { useStyles } from "./styles";

const UserMenuAction = ({ title, icon: Icon, action, dispatch, classes }) => {
  const handleClick = () => {
    dispatch(action);
  };

  return (
    <li className={classes.UserMenuAction}>
      <Icon className={classes.icon} />
      <span onClick={handleClick}>{title}</span>
    </li>
  );
};

export default connect()(withStyles(useStyles)(UserMenuAction));
