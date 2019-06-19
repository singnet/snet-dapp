import React, { Component, Fragment } from "react";

// material ui imports
import { withStyles } from "@material-ui/styles";

import StyledButton from "../common/StyledButton";
import { Auth, API } from "aws-amplify";
import ErrorMsgBox from "../common/ErrorMsgBox";
import { parseError } from "../../utility/errorHandling";

const useStyles = theme => ({
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
  },
  privateKey: {
    marginBottom: "15px !important",
    textAlign: "center !important"
  }
});

class TermsOfUse extends Component {
  state = {
    privateKey: undefined,
    error: undefined
  };
  handleExportingPrivateKey = () => {
    Auth.currentAuthenticatedUser({ bypassCache: true })
      .then(data => {
        API.get("Get Service", "/signup", {
          headers: {
            Authorization: data.idToken.jwtToken
          }
        })
          .then(res => {
            if (res.data === "User Already Exist!") {
              this.setState({ error: res.data });
              return;
            }
            this.setState({ privateKey: res.data[0].private_key });
          })
          .catch(err => {
            let error = parseError(err);
            this.setState({ error });
          });
      })
      .catch(err => {
        let error = parseError(err);
        this.setState({ error });
      });
  };

  render() {
    const { classes } = this.props;
    const { privateKey, error } = this.state;
    return (
      <div className={classes.walletKeyContainer}>
        <h3>Wallet Key</h3>
        <p>
          <span>Brief information about wallet and key.</span> Lorem ipsum dolor
          sit amet, ad vis affert dictas. Has an scripta ponderum accommodare,
          adhuc dolorum adolescens per
        </p>
        {privateKey ? (
          <p className={classes.privateKey}>{privateKey}</p>
        ) : (
          <Fragment>
            <StyledButton
              type="transparent"
              btnText="Export Private Key"
              onClick={this.handleExportingPrivateKey}
            />
            <div className={classes.warningBox}>
              <i className="fas fa-exclamation-triangle"></i>
              <span>
                Please keep in mind that once wallet key is lost, it cant be
                recovered.
              </span>
            </div>
          </Fragment>
        )}

        <ErrorMsgBox showErr={error} errorMsg={error} />
        <div className={classes.continueBtnContainer}>
          <StyledButton type="blue" btnText="continue" disabled />
        </div>
      </div>
    );
  }
}

export default withStyles(useStyles)(TermsOfUse);
