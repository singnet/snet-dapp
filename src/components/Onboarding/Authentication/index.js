import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import { Auth } from "aws-amplify";
import { withStyles } from "@material-ui/styles";
import { withRouter } from "react-router-dom";

import StyledButton from "../../common/StyledButton";
import Session from "../../../utility/constants/Session";
import { isValidNumber } from "../../../utility/Validation";
import { parseError } from "../../../utility/ErrorHandling";
import { useStyles } from "./styles";
import ErrorMsgText from "../../common/ErrorMsgText";
import InlineLoader from "../../common/InlineLoader";
import Routes from "../../../utility/constants/Routes";

class Authentication extends Component {
  state = {
    verificationCode: "",
    enableResend: false,
    loading: true,
    error: undefined,
  };

  handleVerificationCode = event => {
    let verificationCode = event.currentTarget.value;
    if (!isValidNumber(verificationCode) || verificationCode.length > 6) {
      return;
    }
    this.setState({ verificationCode });
  };

  handleContinue = () => {
    const { verificationCode } = this.state;
    this.setState({ loading: true });
    let username = sessionStorage.getItem(Session.USERNAME);
    Auth.confirmSignUp(username, verificationCode)
      .then(res => {
        this.setState({ loading: false });
        this.props.history.push(Routes.LOGIN);
      })
      .catch(err => {
        let error = parseError(err);
        this.setState({ error, enableResend: true, loading: false });
      });
  };

  handleResendCode = () => {
    this.setState({ loading: true });
    let username = sessionStorage.getItem(Session.USERNAME);
    Auth.resendSignUp(username)
      .then(res => {
        this.setState({ loading: false });
        this.props.handleNextSection();
      })
      .catch(err => {
        let error = parseError(err);
        this.setState({ error, loading: false });
      });
  };

  render() {
    const { classes } = this.props;
    const { verificationCode, enableResend, loading, error } = this.state;
    return (
      <div className={classes.authenticationContent}>
        <h3>Validate Email</h3>
        <p className={classes.validateEmailDescription}>
          <span>A verification code has been sent to your registered email address.</span>
          <br /> <br />
          Please enter the verification code below to confirm your email address. If you are unable to find the email
          from <span>‘otp@singularitynet.io’</span> in your inbox, make sure to check the spam folder. The code will be
          valid for 5 minutes.{" "}
        </p>
        <InlineLoader loading={loading} />
        <TextField
          id="outlined-verification-code"
          label="Verification Code"
          className={classes.textField}
          type="text"
          name="verificationCode"
          margin="normal"
          variant="outlined"
          value={verificationCode}
          onChange={this.handleVerificationCode}
        />
        <ErrorMsgText error={error} />
        <div className={classes.buttonsContainer}>
          <StyledButton
            btnText="resend code"
            type="transparent"
            disabled={!enableResend}
            onClick={this.handleResendCode}
          />
          <StyledButton btnText="continue" disabled={verificationCode.length !== 6} onClick={this.handleContinue} />
        </div>
      </div>
    );
  }
}

export default withRouter(withStyles(useStyles)(Authentication));
