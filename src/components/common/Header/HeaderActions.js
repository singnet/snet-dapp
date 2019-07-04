import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Icon from "@material-ui/core/Icon";
import clsx from "clsx";

import { useStyles } from "./styles";
import Routes from "../../../utility/constants/Routes";

const HeaderActions = ({ isLoggedIn }) => {
  const classes = useStyles();
  return (
    <ul className={classes.loginBtnsUl}>
      {isLoggedIn ? (
        <div className={classes.loggedInActions}>
          <Icon className={clsx(classes.icon, "fas fa-bell")} />
          <Icon className={clsx(classes.icon, "fas fa-user-circle")} />
        </div>
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
