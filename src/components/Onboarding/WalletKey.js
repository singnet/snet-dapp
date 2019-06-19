import React, { Component } from "react";

// material ui imports
import { withStyles } from "@material-ui/styles";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

import ProgressBar from "./ProgressBar.js";
import StyledButton from "../common/StyledButton";

const useStyles = theme => ({
  onboardingContainer: {
    paddingBottom: 40,
    backgroundColor: theme.palette.text.gray8
  },
  walletKeyContainer: {
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
      padding: "30px 53px 0",
      margin: 0,
      color: theme.palette.text.gray3,
      fontFamily: theme.typography.secondary.main,
      fontSize: 14,
      lineHeight: "21px",
      textAlign: "left",
      "& span": {
        fontWeight: theme.typography.fontweight
      }
    }
  },
  warningBox: {
    borderRadius: 4,
    padding: "10px 20px",
    margin: "5px 0 20px",
    display: "inline-block",
    backgroundColor: theme.palette.text.orange1,
    "& i": {
      marginRight: 18,
      color: theme.palette.text.darkOrange
    },
    "& span": {
      color: theme.palette.text.darkOrange,
      fontFamily: theme.typography.secondary.main,
      fontSize: 14
    }
  },
  continueBtnContainer: {
    "& button": {
      padding: "13px 60px"
    }
  }
});

class TermsOfUse extends Component {
  state = {
    verificationCode: ""
  };

  render() {
    const { classes } = this.props;
    const { verificationCode } = this.state;
    return (
      <div className={classes.onboardingContainer}>
        <ProgressBar />
        <div className={classes.walletKeyContainer}>
          <h3>Wallet Key</h3>
          <p>
            <span>Brief information about wallet and key.</span> Lorem ipsum
            dolor sit amet, ad vis affert dictas. Has an scripta ponderum
            accommodare, adhuc dolorum adolescens per
          </p>
          <StyledButton type="transparent" btnText="download to proceed" />
          <div className={classes.warningBox}>
            <i className="fas fa-exclamation-triangle"></i>
            <span>
              Please keep in mind that once wallet key is lost, it cant be
              recovered.
            </span>
          </div>
          <div className={classes.continueBtnContainer}>
            <StyledButton type="blue" btnText="continue" disabled />
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(useStyles)(TermsOfUse);
