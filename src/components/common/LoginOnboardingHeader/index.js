import React, { Component } from "react";
import { Link } from "react-router-dom";

import Routes from "../../../utility/stringConstants/routes";

// material components
import { withStyles } from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";

// images
import Logo from "../../../assets/images/LoginLogo.png";

const useStyles = theme => ({
  loginHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexBasis: "100%",
    maxWidth: "71%",
    margin: "0 auto",
    padding: "30px 0",
    "& h1": {
      margin: 0
    },
    "& p": {
      color: theme.palette.secondary.main,
      fontSize: "16px"
    },
    "& a": {
      color: theme.palette.primary.main,
      textDecoration: "none"
    },
    ["@media (max-width:750px)"]: {
      width: "75%"
    }
  },
  loginHeaderLink: {
    textAlign: "right",
    "& a": {
      "&:hover": {
        textDecoration: "underline"
      }
    },
    ["@media (max-width:750px)"]: {
      maxWidth: "100%",
      flexBasis: "100%",
      textAlign: "left"
    }
  }
});

class LoginOnboardingHeader extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Grid container spacing={24}>
        <Grid container spacing={24} className={classes.loginHeader}>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <h1>
              <a href="#" title="SingularityNET">
                <img src={Logo} alt="SingularityNET" />
              </a>
            </h1>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={6}
            lg={6}
            className={classes.loginHeaderLink}
          >
            <p>
              {this.props.title}{" "}
              <Link to={Routes.SIGNUP}>{this.props.linkText}</Link>
            </p>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}
export default withStyles(useStyles)(LoginOnboardingHeader);
