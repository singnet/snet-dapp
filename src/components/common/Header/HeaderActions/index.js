import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { useStyles } from "./styles";
import UserProfileToggler from "../../../UserProfilePopUp/UserProfileToggler";
import LoginActionsBtns from "./LoginActionsBtns";
import TokenPurchase from "../../../TokenPurchase/TokenPurchase";

const HeaderActions = () => {
  const classes = useStyles();
  const isLoggedIn = useSelector((state) => state.userReducer.login.isLoggedIn);

  return (
    <div className={classes.loginBtnsContainer}>
      {isLoggedIn ? (
        <Fragment>
          <TokenPurchase />
          <UserProfileToggler />
        </Fragment>
      ) : (
        <LoginActionsBtns />
      )}
    </div>
  );
};

export default HeaderActions;
