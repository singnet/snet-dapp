import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import { useStyles } from "./styles";
import Routes from "../../../utility/constants/Routes";
import UserProfileToggler from "../../UserProfilePopUp/UserProfileToggler";

const HeaderActions = ({ isLoggedIn }) => {
  const classes = useStyles();
  return (
    <ul className={classes.loginBtnsUl}>
      {isLoggedIn ? (
        <UserProfileToggler />
      ) : (
        <Fragment>
          <li className={classes.loginBtnsLi}>
            <Link to={`/${Routes.LOGIN}`}>
              <span className={classes.loginBtnsAnchor}>Login</span>
            </Link>
          </li>
          <li className={`${classes.signupBtn} ${classes.loginBtnsLi}`}>
            <Link to={`/${Routes.SIGNUP}`}>
              <span className={`${classes.loginBtnsAnchor} ${classes.UppercaseText} ${classes.signupBtnText}`}>
                {" "}
                Sign Up Free
              </span>
            </Link>
          </li>
        </Fragment>
      )}
    </ul>
  );
};

export default HeaderActions;
