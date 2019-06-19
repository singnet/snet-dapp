import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import StyledButton from "../common/StyledButton";
import { withStyles } from "@material-ui/styles";
import Session from "../../utility/stringConstants/session";
import { Auth } from "aws-amplify";
import Routes from "../../utility/stringConstants/routes";
import { isValidNumber } from "../../utility/validation";
import ErrorMsgBox from "../common/ErrorMsgBox";

const useStyles = theme => ({
  authenticationContent: {
    width: "41%",
    paddingBottom: 40,
    margin: "40px auto 0",
    backgroundColor: theme.palette.text.white,
    boxShadow:
      "0 1px 1px 0 rgba(0,0,0,0.14), 0 2px 1px -1px rgba(0,0,0,0.14), 0 1px 3px 0 rgba(0,0,0,0.2)",
    textAlign: "center",
    "& h3": {
      padding: "15px 0 15px 25px",
      borderBottomWidth: 1,
      borderBottomStyle: "solid",
      borderBottomColor: theme.palette.text.gray5,
      margin: 0,
      color: theme.palette.text.black1,
      fontSize: 20,
      textAlign: "left"
    },
    "& p": {
      padding: "30px 50px 20px",
      margin: 0,
      color: theme.palette.text.gray10,
      fontSize: 14,
      fontFamily: theme.typography.secondary.main,
      lineHeight: "21px",
      textAlign: "left",
      "& span": {
        fontWeight: theme.typography.fontweight
      }
    }
  },
  pendingSection: {
    marginBottom: 20,
    color: theme.palette.text.orange,
    fontWeight: theme.typography.fontweight,
    "& i": {
      fontSize: 12,
      paddingRight: 10
    }
  },
  textField: {
    width: "60%",
    margin: 0,
    "& label": {
      color: "rgba(0,0,0,.87) !important"
    }
  },
  buttonsContainer: {
    marginTop: 40,
    "& button": {
      padding: " 13px 60px 11px"
    }
  }
});

class Authentication extends Component {
  state = {
    verificationCode: "",
    enableResend: false,
    loading: false,
    error: undefined
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
        this.props.handleNextSection();
      })
      .catch(err => {
        let error = err.message ? err.message : JSON.stringify(err);
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
        let error = err.message ? err.message : JSON.stringify(err);
        this.setState({ error, loading: false });
      });
  };

  render() {
    const { classes } = this.props;
    const { verificationCode, enableResend, loading, error } = this.state;
    return (
      <div className={classes.authenticationContent}>
        <h3>Validate Email</h3>
        <p>
          <span>
            A verification code has been sent to your registered email address.
          </span>
          <br /> <br />
          Please enter the verification code below to confirm your email
          address. If you are unable to find the email from{" "}
          <span>‘otp@singularitynet.io’</span> in your inbox, make sure to check
          the spam folder. The code will be valid for 5 minutes.{" "}
        </p>
        {loading ? (
          <div className={classes.pendingSection}>
            <i className="far fa-hourglass"></i>
            <span>Pending</span>
          </div>
        ) : (
          ""
        )}
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
        <ErrorMsgBox showErr={error} errorMsg={error} />
        <div className={classes.buttonsContainer}>
          <StyledButton
            btnText="resend code"
            type="transparent"
            disabled={!enableResend}
            onClick={this.handleResendCode}
          />
          <StyledButton
            btnText="continue"
            disabled={verificationCode.length !== 6}
            onClick={this.handleContinue}
          />
        </div>
      </div>
    );
  }
}

export default withStyles(useStyles)(Authentication);
