import React, { Component, Fragment } from "react";
import { withStyles } from "@material-ui/styles";
import { withRouter } from "react-router";
import { Auth, API } from "aws-amplify";
import { Icon } from "@material-ui/core";

import StyledButton from "../../common/StyledButton";
import AlertBox from "../../common/AlertBox";
import { parseError } from "../../../utility/ErrorHandling";
import Routes from "../../../utility/constants/Routes";
import { useStyles } from "./styles";

class TermsOfUse extends Component {
  state = {
    privateKey: undefined,
    error: undefined,
    allowContinue: false,
  };

  handleExportingPrivateKey = () => {
    Auth.currentSession({ bypassCache: true })
      .then(data => {
        API.get("Get Service", "/signup", {
          headers: {
            Authorization: data.idToken.jwtToken,
          },
        })
          .then(res => {
            if (res.data === "User Already Exist!") {
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
