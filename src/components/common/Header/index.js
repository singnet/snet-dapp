import React, { Component, useState, Fragment } from "react";
import { Link } from "react-router-dom";
// Material UI imports
import { makeStyles } from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";

import StyledDropdown from "../StyledDropdown/index.js";

// import Images
import Logo from "../../../assets/images/Logo.png";
import Routes from "../../../utility/stringConstants/routes.js";
import { Auth } from "aws-amplify";

const useStyles = makeStyles(theme => ({
  header: {
    width: "100%",
    alignItems: "center",
    display: "flex",
    backgroundColor: "#220D3A",
    padding: "15px 6%"
  },
  h1: {
    margin: 0
  },
  logoAnchor: {
    display: "inline-block"
  },
  logoIcon: {
    width: "100%"
  },
  navUl: {
    padding: 0,
    margin: 0,
    display: "flex"
  },
  navLinks: {
    marginRight: 26,
    listStyle: "none",
    "& div": {
      marginTop: 0,
      "& label": {
        top: "-17px",
        color: theme.palette.secondary.main
      },
      "& svg": {
        right: "-35px",
        color: theme.palette.secondary.main,
        fontSize: 30
      }
    }
  },
  navLinksAnchor: {
    textDecoration: "none",
    fontSize: 20,
    color: theme.palette.secondary.main
  },
  activeTab: {
    paddingBottom: 12,
    fontWeight: 600,
    borderBottomWidth: "2px",
    borderBottomStyle: "solid",
    borderBottomColor: "#fff",
    color: "#fff"
  },
  loginBtnsUl: {
    margin: 0,
    padding: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end"
  },
  loginBtnsLi: {
    marginRight: 26,
    listStyle: "none"
  },
  signupBtn: {
    padding: "7px 12px",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "#fff",
    borderRadius: 4,
    marginRight: 0
  },
  loginBtnsAnchor: {
    textDecoration: "none",
    fontSize: 20,
    color: "#fff"
  },
  signupBtnText: {
    fontWeight: "600",
    letterSpacing: 1.79,
    lineHeight: "16px"
  },
  UppercaseText: { textTransform: "uppercase" },
  XXX: {
    backgroundColor: "red"
  }
}));

function Header() {
  const classes = useStyles();
  const [isLoggedIn, toggleLoggedIn] = useState(false);
  Auth.currentSession().then(data => {
    console.log("signout", Auth.user);
    if (data === null || data === undefined) {
      toggleLoggedIn(false);
    }
    toggleLoggedIn(true);
  });

  const handleSignOut = () => {
    Auth.signOut()
      .then(data => {
        console.log("signout", data);
        toggleLoggedIn(false);
      })
      .catch(err => console.log("signout", err));
  };
  console.log("isLoggedIn", isLoggedIn);
  return (
    <Grid container spacing={24}>
      <header className={classes.header}>
        <Grid item xs={3} sm={3} md={3} lg={3}>
          <h1 className={classes.h1}>
            <a href="#" title="SingularityNET" className={classes.logoAnchor}>
              <img
                src={Logo}
                alt="SingularityNET"
                className={classes.logoIcon}
              />
            </a>
          </h1>
        </Grid>
        <Grid item xs={6} sm={6} md={6} lg={6}>
          <nav>
            <ul className={classes.navUl}>
              <li className={classes.navLinks}>
                <a
                  href="#"
                  title="AI Marketplace"
                  className={`${classes.navLinksAnchor} ${classes.activeTab}`}
                >
                  AI Marketplace
                </a>
              </li>
              <li className={classes.navLinks}>
                <a href="#" title="Pricing" className={classes.navLinksAnchor}>
                  Pricing
                </a>
              </li>
              <li className={classes.navLinks}>
                <a
                  href="#"
                  title="Get Started"
                  className={classes.navLinksAnchor}
                >
                  Get Started
                </a>
              </li>
              <li className={classes.navLinks}>
                <StyledDropdown labelTxt="Resources" />
              </li>
            </ul>
          </nav>
        </Grid>
        <Grid item xs={3} sm={3} md={3} lg={3}>
          <ul className={classes.loginBtnsUl}>
            {isLoggedIn ? (
              <li className={`${classes.signupBtn} ${classes.loginBtnsLi}`}>
                <Link>
                  <span
                    className={`${classes.loginBtnsAnchor} ${classes.UppercaseText} ${classes.signupBtnText}`}
                    onClick={handleSignOut}
                  >
                    {" "}
                    Sign Out
                  </span>
                </Link>
              </li>
            ) : (
              <Fragment>
                <li className={classes.loginBtnsLi}>
                  <Link to={Routes.LOGIN}>
                    <span className={classes.loginBtnsAnchor}>Login</span>
                  </Link>
                </li>
                <li className={`${classes.signupBtn} ${classes.loginBtnsLi}`}>
                  <Link to={Routes.SIGNUP}>
                    <span
                      className={`${classes.loginBtnsAnchor} ${classes.UppercaseText} ${classes.signupBtnText}`}
                    >
                      {" "}
                      Sign Up
                    </span>
                  </Link>
                </li>
              </Fragment>
            )}
          </ul>
        </Grid>
      </header>
    </Grid>
  );
}

export default Header;
