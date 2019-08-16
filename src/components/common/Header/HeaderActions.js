import React, { Fragment } from "react";
import { withRouter } from "react-router-dom";

import { useStyles } from "./styles";
import Routes from "../../../utility/constants/Routes";
import UserProfileToggler from "../../UserProfilePopUp/UserProfileToggler";

const HeaderActions = ({ isLoggedIn, history }) => {
  const classes = useStyles();
  const handleRedirection = redirectTo => {
    const sourcePath = history.location.pathname;
    history.push({ pathname: redirectTo, state: { sourcePath } });
  };
  return (
    <ul className={classes.loginBtnsUl}>
      {isLoggedIn ? (
        <UserProfileToggler />
      ) : (
        <Fragment>
          <li className={classes.loginBtnsLi}>
            <span className={classes.loginBtnsAnchor} onClick={() => handleRedirection(`/${Routes.LOGIN}`)}>
              Login
            </span>
          </li>
          <li className={`${classes.signupBtn} ${classes.loginBtnsLi}`}>
            <span
              className={`${classes.loginBtnsAnchor} ${classes.UppercaseText} ${classes.signupBtnText}`}
              onClick={() => handleRedirection(`/${Routes.SIGNUP}`)}
            >
              Sign Up Free
            </span>
          </li>
        </Fragment>
      )}
    </ul>
  );
};

export default withRouter(HeaderActions);
