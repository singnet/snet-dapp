import React, { Component, Fragment } from "react";
import { withStyles } from "@material-ui/styles";
import { withRouter } from "react-router";
import { Auth, API } from "aws-amplify";
import { Icon } from "@material-ui/core";
import { connect } from "react-redux";

import StyledButton from "../../common/StyledButton";
import AlertBox from "../../common/AlertBox";
import { parseError } from "../../../utility/ErrorHandling";
import Routes from "../../../utility/constants/Routes";
import { useStyles } from "./styles";
import { userActions } from "../../../Redux/actionCreators";
import { APIEndpoints, APIPaths } from "../../../config/APIEndpoints";
import { generateAPIInit } from "../../../utility/API";

class TermsOfUse extends Component {
  state = {
    privateKey: undefined,
    error: undefined,
    allowContinue: false,
  };

  handleExportingPrivateKey = () => {
    Auth.currentSession({ bypassCache: true })
      .then(data => {
        const apiName = APIEndpoints.USER.name;
        const apiPath = APIPaths.SIGNUP;
        const myInit = generateAPIInit(data.idToken.jwtToken);
        API.get(apiName, apiPath, myInit)
          .then(res => {
            if (res.data === "User already exist") {
              this.setState({ error: res.data, allowContinue: true });
              return;
            }
            this.setState({
              privateKey: res.data.data[0].private_key,
              allowContinue: true,
            });
          })
          .catch(err => {
            const error = parseError(err);
            this.setState({ error });
          });
      })
      .catch(err => {
        const error = parseError(err);
        this.setState({ error });
      });
  };

  handleContinue = () => {
    const { enforcedWalletCreation, history, walletCreationSuccess } = this.props;
    if (enforcedWalletCreation) {
      walletCreationSuccess();
      return;
    }
    history.push(Routes.AI_MARKETPLACE);
    walletCreationSuccess();
  };

  render() {
    const { classes } = this.props;
    const { privateKey, error, allowContinue } = this.state;
    return (
      <div className={classes.walletKeyContainer}>
        <h3>Wallet Key Generator</h3>
        <p>
          <span />
        </p>
        {privateKey ? (
          <p className={classes.privateKey}>{privateKey}</p>
        ) : (
          <Fragment>
            <StyledButton type="transparent" btnText="View your secret key" onClick={this.handleExportingPrivateKey} />
            <div className={classes.warningBox}>
              <Icon className="fas fa-exclamation-triangle" />
              <span>
                ATTENTION: By clicking on "View your secret key" you will be given a unique key known only by yourself.
                Make sure you STORE YOUR KEY SOMEWHERE SAFE. If you loose your key, you will not be able to recover it.
              </span>
            </div>
          </Fragment>
        )}
        <AlertBox type="error" message={error} />
        <div className={classes.continueBtnContainer}>
          <StyledButton type="blue" btnText="continue" disabled={!allowContinue} onClick={this.handleContinue} />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  walletCreationSuccess: () => dispatch(userActions.walletCreationSuccess),
});

export default connect(
  null,
  mapDispatchToProps
)(withStyles(useStyles)(withRouter(TermsOfUse)));
