import React from "react";
import { useDispatch } from "react-redux";
// import Icon from "@mui/material/Icon";
import { withStyles } from "@mui/styles";

import { useStyles } from "./styles";

const UserMenuAction = ({ title, icon: Icon, action, classes }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(action());
  };

  return (
    <li className={classes.UserMenuAction}>
      <Icon className={classes.icon} />
      <span onClick={handleClick}>{title}</span>
    </li>
  );
};

export default withStyles(useStyles)(UserMenuAction);
