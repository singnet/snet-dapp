import React, { Component } from "react";
import { Auth } from "aws-amplify";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/styles";
import { connect } from "react-redux";

import Routes from "../../../utility/constants/Routes";
import { isValidEmail } from "../../../utility/Validation";
import { parseError } from "../../../utility/ErrorHandling";
import { useStyles } from "./styles";
import RenderForm from "./RenderForm";
import RenderOTP from "./RenderOTP";
import { userActions } from "../../../Redux/actionCreators";

class SignUp extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    error: undefined,
    toBeConfirmed: false,
    otp: "",
  };

  handleUsername = event => {
    this.setState({ username: event.currentTarget.value });
  };

  handleEmail = event => {
    this.setState({ email: event.currentTarget.value });
  };

  handlePassword = event => {
    this.setState({ password: event.currentTarget.value });
  };

  handleOTP = event => {
    this.setState({ otp: event.currentTarget.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { username, password, email } = this.state;
    this.setState({ error: undefined });
    if (username === "") {
      this.setState({ error: "Please enter a username" });
      return;
    }
    if (email === "") {
      this.setState({ error: "Email cannot be left blank" });
      return;
    }
    if (!isValidEmail(email)) {
      this.setState({ error: "Please enter a valid email" });
      return;
    }
    if (password === "") {
      this.setState({ error: "Password cannot be left blank" });
      return;
    }

    Auth.signUp({
      username,
      password,
      attributes: {
        email,
        name: username,
      },
    })
      .then(user => {
        this.props.updateUsername(username);
        this.setState({ toBeConfirmed: true });
      })
      .catch(err => this.setState({ error: err.message }));
  };

  handleConfirmSignup = event => {
    const { username, otp } = this.state;
    const { history, updateUsername } = this.props;
    event.preventDefault();
    event.stopPropagation();
    let route = `/${Routes.LOGIN}`;
    if (history.location.state && history.location.state.sourcePath) {
      route = history.location.state.sourcePath;
    }
    Auth.confirmSignUp(username, otp)
      .then(() => {
        updateUsername(username);
        history.push(route);
      })
      .catch(err => {
        let error = parseError(err);
        this.setState({ error });
      });
  };

  handleResendOTP = () => {
    this.setState({ error: undefined });
    const { username } = this.state;
    Auth.resendSignUp(username)
      .then(() => {
        this.setState({ error: "code resent successfully" });
      })
      .catch(err => {
        this.setState({ error: err.message });
      });
  };

  render() {
    const { username, email, password, otp, error, toBeConfirmed } = this.state;
    const { classes } = this.props;

    return (
      <div className={classes.signupMainContainer}>
        <Grid container spacing={24} className={classes.signupMainContent}>
          {toBeConfirmed ? (
            <RenderOTP
              otp={otp}
              handleOTP={this.handleOTP}
              handleResendOTP={this.handleResendOTP}
              handleConfirmSignup={this.handleConfirmSignup}
              error={error}
            />
          ) : (
            <RenderForm
              username={username}
              handleUsername={this.handleUsername}
              email={email}
              handleEmail={this.handleEmail}
              password={password}
              handlePassword={this.handlePassword}
              error={error}
              handleSubmit={this.handleSubmit}
            />
          )}
        </Grid>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  updateUsername: username => dispatch(userActions.updateUsername(username)),
});

export default connect(
  null,
  mapDispatchToProps
)(withStyles(useStyles)(SignUp));
