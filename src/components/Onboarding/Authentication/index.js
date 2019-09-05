import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import { Auth } from "aws-amplify";
import { withStyles } from "@material-ui/styles";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import StyledButton from "../../common/StyledButton";
import { isValidNumber } from "../../../utility/Validation";
import { parseError } from "../../../utility/ErrorHandling";
import { useStyles } from "./styles";
import AlertText from "../../common/AlertText";
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
    const { email } = this.props;
    this.setState({ loading: true });
    Auth.confirmSignUp(email, verificationCode)
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
    const { email } = this.props;
    Auth.resendSignUp(email)
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
          Please enter the verification code below to confirm your email address. Check your spam, or junk folders if
          you encounter any delays. The email should be from otp@singularitynet.io. The code will be valid for 5
          minutes.
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
        <AlertText message={error} />
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

const mapStateToProps = state => ({
  email: state.userReducer.email,
});

export default connect(mapStateToProps)(withRouter(withStyles(useStyles)(Authentication)));
