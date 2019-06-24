import React, { Component, Fragment } from "react";
import { withStyles } from "@material-ui/styles";
import { withRouter } from "react-router";
import { Auth, API } from "aws-amplify";

import StyledButton from "../common/StyledButton";
import ErrorMsgBox from "../common/ErrorMsgBox";
import { parseError } from "../../utility/errorHandling";
import Routes from "../../utility/stringConstants/routes";

const useStyles = theme => ({
  walletKeyContainer: {
    width: 630,
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
    },
    "@media (max-width:724px)": {
      width: "90%"
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
    error: undefined,
    allowContinue: false
  };

  handleExportingPrivateKey = () => {
    Auth.currentSession({ bypassCache: true })
      .then(data => {
        API.get("Get Service", "/signup", {
          headers: {
            Authorization: data.idToken.jwtToken
          }
        })
          .then(res => {
            if (res.data === "User Already Exist!") {
              this.setState({ error: res.data, allowContinue: true });
              return;
            }
            this.setState({
              privateKey: res.data.data[0].private_key,
              allowContinue: true
            });
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
    const { privateKey, error, allowContinue } = this.state;
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
          <StyledButton
            type="blue"
            btnText="continue"
            disabled={!allowContinue}
            onClick={() => this.props.history.push(Routes.AI_MARKETPLACE)}
          />
        </div>
      </div>
    );
  }
}

export default withStyles(useStyles)(withRouter(TermsOfUse));
