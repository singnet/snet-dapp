import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { useStyles } from "./styles";
import UserProfileToggler from "../../../UserProfilePopUp/UserProfileToggler";
import LoginActionsBtns from "./LoginActionsBtns";
import TokenPurchase from "../../../TokenPurchase/TokenPurchase";
import { TOKEN_NAMES } from "../../../../utility/constants/EthereumUtils";

const HeaderActions = () => {
  const classes = useStyles();
  const isLoggedIn = useSelector((state) => state.userReducer.login.isLoggedIn);
  const isFetToken = process.env.REACT_APP_TOKEN_NAME === TOKEN_NAMES.FET;

  return (
    <div className={classes.loginBtnsContainer}>
      {isLoggedIn ? (
        <Fragment>
          {isFetToken && <TokenPurchase />}
          <UserProfileToggler />
        </Fragment>
      ) : (
        <LoginActionsBtns />
      )}
    </div>
  );
};

export default HeaderActions;
