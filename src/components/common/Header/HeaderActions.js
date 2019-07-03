import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import { useStyles } from "./styles";
import Routes from "../../../utility/constants/Routes";
import SignOut from "./SignOut";

const HeaderActions = ({ isLoggedIn }) => {
  const classes = useStyles();
  return (
    <ul className={classes.loginBtnsUl}>
      {isLoggedIn ? (
        <SignOut />
      ) : (
        <Fragment>
          <li className={classes.loginBtnsLi}>
            <Link to={Routes.LOGIN}>
              <span className={classes.loginBtnsAnchor}>Login</span>
            </Link>
          </li>
          <li className={`${classes.signupBtn} ${classes.loginBtnsLi}`}>
            <Link to={Routes.SIGNUP}>
              <span className={`${classes.loginBtnsAnchor} ${classes.UppercaseText} ${classes.signupBtnText}`}>
                {" "}
                Sign Up
              </span>
            </Link>
          </li>
        </Fragment>
      )}
    </ul>
  );
};

export default HeaderActions;
