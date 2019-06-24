import React, { Component, Fragment } from "react";
import { withStyles } from "@material-ui/styles";
import { withRouter } from "react-router";
import { Auth, API } from "aws-amplify";

import StyledButton from "../../common/StyledButton";
import ErrorMsgBox from "../../common/ErrorMsgBox";
import { parseError } from "../../../utility/ErrorHandling";
import Routes from "../../../utility/stringConstants/Routes";
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
                    <span>Brief information about wallet and key.</span> Lorem ipsum dolor sit amet, ad vis affert
                    dictas. Has an scripta ponderum accommodare, adhuc dolorum adolescens per
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
                            <span>Please keep in mind that once wallet key is lost, it cant be recovered.</span>
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
