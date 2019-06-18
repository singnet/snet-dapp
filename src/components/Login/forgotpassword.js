import React, { Component } from "react";

// material components
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/styles";

// internal components
import Header from "../common/LoginOnboardingHeader/index.js";
import ErrorMsgBox from "../common/ErrorMsgBox/index.js";
import StyledButton from "../common/StyledButton";

// images
import Routes from "../../utility/stringConstants/routes";
import { Auth } from "aws-amplify";
import Session from "../../utility/stringConstants/session";

const useStyles = theme => ({
  loginHeader: {
    width: "71%",
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "30px 0",
    "& h1": {
      margin: 0
    },
    "& p": {
      color: "#9b9b9b",
      fontSize: "16px"
    },
    "& a": {
      color: "#4086ff",
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
  },
  forgotPwdContent: {
    textAlign: "center",
    "& h2": {
      margin: 0,
      fontSize: "36px",
      color: theme.palette.text.black1
    },
    "& p": {
      margin: "17px 0 0",
      color: theme.palette.text.gray3,
      fontSize: "22px",
      fontFamily: theme.typography.secondary.main
    },
    ["@media (max-width:527px)"]: {
      width: "75%",
      margin: "0 auto",
      flexBasis: "90%"
    }
  },
  forgotPwdForm: {
    boxSizing: "border-box",
    width: 410,
    padding: "40px 20px 30px",
    margin: "45px auto 0",
    boxShadow:
      "0 1px 1px 0 rgba(0,0,0,0.14), 0 2px 1px -1px rgba(0,0,0,0.14), 0 1px 3px 0 rgba(0,0,0,0.2)",
    "& button": { width: "100%" },
    "& p": { marginBottom: 10 },
    ["@media (max-width:527px)"]: {
      width: "100%"
    }
  },
  textField: {
    width: "100%",
    margin: "0 0 10px 0"
  }
});

class ForgotPassword extends Component {
  state = {
    username: "",
    error: undefined
  };

  handleUsername = event => {
    this.setState({ username: event.currentTarget.value });
  };

  handleSubmit = event => {
    this.setState({ error: undefined });
    const { username } = this.state;

    event.preventDefault();
    event.stopPropagation();
    Auth.forgotPassword(username)
      .then(res => {
        sessionStorage.setItem(Session.USERNAME, username);
        this.props.history.push(Routes.FORGOT_PASSWORD_SUBMIT);
      })
      .catch(err => {
        this.setState({ error: err.message });
      });
  };

  render() {
    const { classes } = this.props;
    const { username, error } = this.state;
    return (
      <Grid container spacing={24}>
        <Header title="Already have an account?" linkText="Login" />
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          className={classes.forgotPwdContent}
        >
          <h2>Forgot your pasword?</h2>
          <p>We'll email you instructions on how to reset it.</p>
          <form noValidate autoComplete="off" className={classes.forgotPwdForm}>
            <TextField
              id="outlined-username-input"
              label="Email"
              className={classes.textField}
              type="text"
              name="username"
              margin="normal"
              variant="outlined"
              value={username}
              onChange={this.handleUsername}
            />
            <ErrorMsgBox errorMsg="error state message" />
            <StyledButton
              type="blue"
              btnText="reset password"
              onClick={this.handleSubmit}
            />
          </form>
        </Grid>
      </Grid>
    );
  }
}
export default withStyles(useStyles)(ForgotPassword);
