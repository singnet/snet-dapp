import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useStyles } from "./styles";
import Routes from "../../../utility/constants/Routes";
import UserProfileToggler from "../../UserProfilePopUp/UserProfileToggler";
import StyledButton from "../StyledButton";

const HeaderActions = () => {
  const classes = useStyles();
  const location = useLocation();
  const navigate = useNavigate();

  const isLoggedIn = useSelector((state) => state.userReducer.login.isLoggedIn);

  const handleRedirection = (redirectTo) => {
    const sourcePath = location.pathname;
    navigate({ pathname: redirectTo, state: { sourcePath } });
  };

  return (
    <div className={classes.loginBtnsContainer}>
      {isLoggedIn ? (
        <UserProfileToggler />
      ) : (
        <Fragment>
          <StyledButton
            type="transparentBlueBorderDisable"
            btnText="Login"
            onClick={() => handleRedirection(`/${Routes.LOGIN}`)}
          />
          <StyledButton
            type="whiteBorder"
            btnText="Sign Up Free"
            onClick={() => handleRedirection(`/${Routes.SIGNUP}`)}
          />
        </Fragment>
      )}
    </div>
  );
};

export default HeaderActions;
