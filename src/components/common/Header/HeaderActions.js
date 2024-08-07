import React, { Fragment } from "react";
// import { withRouter } from "react-router-dom";

import { useStyles } from "./styles";
import Routes from "../../../utility/constants/Routes";
import UserProfileToggler from "../../UserProfilePopUp/UserProfileToggler";
import { useLocation, useNavigate } from "react-router-dom";

const HeaderActions = ({ isLoggedIn }) => {
  const classes = useStyles();
  const location = useLocation();
  const navigate = useNavigate();

  const handleRedirection = (redirectTo) => {
    const sourcePath = location.pathname;
    navigate({ pathname: redirectTo, state: { sourcePath } });
  };

  return (
    <ul className={classes.loginBtnsUl}>
      {isLoggedIn ? (
        <UserProfileToggler />
      ) : (
        <Fragment>
          <li className={classes.loginBtnsLi}>
            <span
              className={`${classes.loginBtnsAnchor} ${classes.loginBtn}`}
              onClick={() => handleRedirection(`/${Routes.LOGIN}`)}
            >
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

export default HeaderActions;
