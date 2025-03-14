import React from "react";
import { useSelector } from "react-redux";
import { useStyles } from "./styles";
import UserProfileToggler from "../../../UserProfilePopUp/UserProfileToggler";
import LoginActionsBtns from "./LoginActionsBtns";

const HeaderActions = () => {
  const classes = useStyles();
  const isLoggedIn = useSelector((state) => state.userReducer.login.isLoggedIn);

  return <div className={classes.loginBtnsContainer}>{isLoggedIn ? <UserProfileToggler /> : <LoginActionsBtns />}</div>;
};

export default HeaderActions;
