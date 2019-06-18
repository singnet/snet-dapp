import React, { Component } from "react";
import { Link } from "react-router-dom";

// material components
import { withStyles } from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

// internal components
import Header from "../common/LoginOnboardingHeader/index.js";
import StyledButton from "../common/StyledButton/index.js";
import ErrorMsgBox from "../common/ErrorMsgBox/index.js";

import { Auth } from "aws-amplify";
// import { AWS } from "@aws-amplify/core";
import Routes from "../../utility/stringConstants/routes";
import Session from "../../utility/stringConstants/session";

const useStyles = theme => ({
  loginDetails: {
    textAlign: "center",
    "& h2": {
      margin: 0,
      fontSize: "36px",
      color: "rgba(0,0,0,.87)"
    }
  },
  loginForm: {
    boxSizing: "border-box",
    width: 410,
    padding: "40px 20px 30px",
    margin: "45px auto 0",
    boxShadow:
      "0 1px 1px 0 rgba(0,0,0,0.14), 0 2px 1px -1px rgba(0,0,0,0.14), 0 1px 3px 0 rgba(0,0,0,0.2)",
    "& h3": {
      margin: "0 0 11px",
      color: "rgba(0,0,0,0.6)",
      fontSize: 16,
      letterSpacing: "0.29px",
      textTransform: "uppercase"
    },
    "& button": {
      width: "100%"
    },
    ["@media (max-width:545px)"]: {
      width: "80%"
    }
  },
  horizontalLine: {
    marginTop: 15,
    display: "block",
    color: "rgba(0,0,0,0.6)",
    fontSize: 14,
    textTransform: "uppercase",
    textAlign: "center",
    "&::before": {
      content: '" "',
      display: "inline-block",
      verticalAlign: "middle",
      width: 160,
      height: 1,
      backgroundColor: "#F5F7F8",
      marginRight: 10
    },
    "&::after": {
      content: '" "',
      display: "inline-block",
      verticalAlign: "middle",
      width: 160,
      height: 1,
      marginLeft: 10,
      backgroundColor: "#F5F7F8"
    }
  },
  textField: {
    width: "100%",
    "& label": {
      fontFamily: theme.typography.primary.main
    }
  },
  checkboxSection: {
    marginTop: 10,
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between",
    "& label": {
      color: "#666",
      fontSize: 14,
      letterSpacing: "0.25px"
    },
    "& a": {
      color: "#666",
      fontSize: 14,
      letterSpacing: "0.25px",
      textDecoration: "none"
    },
    ["@media (max-width:400px)"]: {
      flexDirection: "column"
    }
  }
});

class Login extends Component {
  state = {
    username: "",
    password: "",
    error: undefined
  };
  handleUsername = event => {
    this.setState({ username: event.currentTarget.value });
  };
  handlePassword = event => {
    this.setState({ password: event.currentTarget.value });
  };
  handleSubmit = event => {
    this.setState({ error: undefined });
    const { username, password } = this.state;
    event.preventDefault();
    event.stopPropagation();
    Auth.signIn(username, password)
      .then(user => {
        this.props.history.push(Routes.AI_MARKETPLACE);
      })
      .catch(err => {
        if (err.code === "UserNotConfirmedException") {
          sessionStorage.setItem(Session.USERNAME, username);
          this.props.history.push(Routes.VERIFY);
          return;
        }
        this.setState({ error: err.message });
      });
  };

  render() {
    const { classes } = this.props;
    const { username, password, error } = this.state;
    return (
      <Grid container spacing={24}>
        <Header title="New to singularityNET?" linkText="SignUp" />
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          className={classes.loginDetails}
        >
          <h2>Welcome Back</h2>
          <form noValidate autoComplete="off" className={classes.loginForm}>
            <h3>log in with </h3>
            <StyledButton
              btnText="github"
              type="black"
              iconClass="fab fa-github"
            />
            <span className={classes.horizontalLine}>or</span>
            <TextField
              id="outlined-user-name"
              label="UserName or Email"
              className={classes.textField}
              margin="normal"
              variant="outlined"
              value={username}
              onChange={this.handleUsername}
            />
            <TextField
              id="outlined-password-input"
              label="Password"
              className={classes.textField}
              type="password"
              autoComplete="current-password"
              margin="normal"
              variant="outlined"
              value={password}
              onChange={this.handlePassword}
            />
            <div className={classes.checkboxSection}>
              <div className={classes.checkbox}>
                {/* <input type="checkbox" />
                <label>Remember Me</label> */}
              </div>
              <Link to={Routes.FORGOT_PASSWORD}>Forgot password?</Link>
            </div>
            {error && <ErrorMsgBox errorMsg={error} />}
            <StyledButton
              type="blue"
              btnText="login"
              onClick={this.handleSubmit}
            />
          </form>
        </Grid>
      </Grid>
    );
  }
}
export default withStyles(useStyles)(Login);
