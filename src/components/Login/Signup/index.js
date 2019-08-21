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
import { userActions, loaderActions } from "../../../Redux/actionCreators";
import { LoaderContent } from "../../../utility/constants/LoaderContent";

class SignUp extends Component {
  state = {
    nickname: "",
    email: "",
    password: "",
    error: undefined,
    toBeConfirmed: false,
    otp: "",
  };

  handleNickname = event => {
    this.setState({ nickname: event.currentTarget.value });
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
    const { nickname, password, email } = this.state;
    const { startSignupLoader, stopLoader } = this.props;
    this.setState({ error: undefined });
    if (nickname === "") {
      this.setState({ error: "Please enter a nickname" });
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
    startSignupLoader();
    Auth.signUp({
      username: email,
      password,
      attributes: {
        email,
        nickname,
      },
    })
      .then(user => {
        this.props.updateNickname(nickname);
        this.setState({ toBeConfirmed: true });
        stopLoader();
      })
      .catch(err => {
        this.setState({ error: err.message });
        stopLoader();
      });
  };

  handleConfirmSignup = event => {
    const { email, otp } = this.state;
    const { history, updateEmail } = this.props;
    event.preventDefault();
    event.stopPropagation();
    let route = `/${Routes.LOGIN}`;

    Auth.confirmSignUp(email, otp)
      .then(() => {
        updateEmail(email);
        history.push(route);
      })
      .catch(err => {
        let error = parseError(err);
        this.setState({ error });
      });
  };

  handleResendOTP = () => {
    this.setState({ error: undefined });
    const { email } = this.state;
    Auth.resendSignUp(email)
      .then(() => {
        this.setState({ error: "code resent successfully" });
      })
      .catch(err => {
        this.setState({ error: err.message });
      });
  };

  render() {
    const { nickname, email, password, otp, error, toBeConfirmed } = this.state;
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
              nickname={nickname}
              handleNickname={this.handleNickname}
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
  startSignupLoader: () => dispatch(loaderActions.startAppLoader(LoaderContent.SIGNUP)),
  stopLoader: () => dispatch(loaderActions.stopAppLoader),
  updateNickname: nickname => dispatch(userActions.updateNickname(nickname)),
  updateEmail: email => dispatch(userActions.updateEmail(email)),
});

export default connect(
  null,
  mapDispatchToProps
)(withStyles(useStyles)(SignUp));
