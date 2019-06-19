import React, { Component } from "react";

// material ui imports
import { withStyles } from "@material-ui/styles";
import TextField from "@material-ui/core/TextField";
import ProgressBar from "./ProgressBar";
import StyledButton from "../common/StyledButton";
import Header from "../common/LoginOnboardingHeader";

const useStyles = theme => ({
  onboardingContainer: {
    paddingBottom: 40,
    backgroundColor: theme.palette.text.gray8
  },
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
  },
  topSection: {
    textAlign: "center",
    "& h2": {
      color: theme.palette.text.black1,
      fontSize: 32,
      fontWeight: theme.typography.fontweight
    },
    "& p": {
      margin: "20px 0 0",
      color: theme.palette.text.gray3,
      fontFamily: theme.typography.secondary.main,
      fontSize: 20,
      lineHeight: "30px"
    }
  }
});

class Authorization extends Component {
  state = {
    verificationCode: "",
    activeSection: 2
  };
  render() {
    const { classes } = this.props;
    const { verificationCode, activeSection } = this.state;
    return (
      <div className={classes.onboardingContainer}>
        <Header linkText="Log Out" />
        <div className={classes.topSection}>
          <h2>Welcome Username</h2>
          <p>
            You have successfully logged into your singularitynet account.
            <br /> You are just steps away from completing your activation.
          </p>
        </div>
        <ProgressBar activeSection={activeSection} />
        <div className={classes.authenticationContent}>
          <h3>Validate Email</h3>
          <p>
            <span>
              A verification code has been sent to your registered email
              address.
            </span>
            <br /> <br />
            Please enter the verification code below to confirm your email
            address. If you are unable to find the email from{" "}
            <span>‘otp@singularitynet.io’</span> in your inbox, make sure to
            check the spam folder. The code will be valid for 5 minutes.{" "}
          </p>
          <div className={classes.pendingSection}>
            <i className="far fa-hourglass"></i>
            <span>Pending</span>
          </div>
          <TextField
            id="outlined-verification-code"
            label="Verification Code"
            className={classes.textField}
            type="text"
            name="verificationCode"
            margin="normal"
            variant="outlined"
            value={verificationCode}
            onChange={this.handleUsername}
          />
          <span></span>
          <div className={classes.buttonsContainer}>
            <StyledButton
              btnText="resend code"
              type="transparent"
              disabled={false}
            />
            <StyledButton btnText="continue" disabled />
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(useStyles)(Authorization);
