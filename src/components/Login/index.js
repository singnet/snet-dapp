import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { Auth } from "aws-amplify";

import Header from "../common/LoginOnboardingHeader";
import StyledButton from "../common/StyledButton";
import ErrorMsgBox from "../common/ErrorMsgBox";
import Routes from "../../utility/stringConstants/Routes";
import Session from "../../utility/stringConstants/Session";
import { useStyles } from "./styles";

class Login extends Component {
    state = {
        username: "",
        password: "",
        error: undefined,
    };

    handleUsername = event => {
        this.setState({ username: event.currentTarget.value });
    };

    handlePassword = event => {
        this.setState({ password: event.currentTarget.value });
    };

    handleSubmit = event => {
        this.setState({ error: undefined });
        const { username, password } = this.state;
        event.preventDefault();
        event.stopPropagation();
        Auth.signIn(username, password)
            .then(user => {
                sessionStorage.setItem(Session.USERNAME, username);
                this.props.history.push(Routes.ONBOARDING);
            })
            .catch(err => {
                if (err.code === "UserNotConfirmedException") {
                    sessionStorage.setItem(Session.USERNAME, username);
                    this.props.history.push(Routes.ONBOARDING);
                    return;
                }
                this.setState({ error: err.message });
            });
    };

    render() {
        const { classes } = this.props;
        const { username, password, error } = this.state;
        return (
            <Grid container spacing={24}>
                <Header title="New to singularityNET?" linkPath={Routes.SIGNUP} linkText="SignUp" />
                <Grid item xs={12} sm={12} md={12} lg={12} className={classes.loginDetails}>
                    <h2>Welcome Back</h2>
                    <form noValidate autoComplete="off" className={classes.loginForm}>
                        <TextField
                            id="outlined-user-name"
                            label="UserName or Email"
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
                            value={username}
                            onChange={this.handleUsername}
                        />
                        <TextField
                            id="outlined-password-input"
                            label="Password"
                            className={classes.textField}
                            type="password"
                            autoComplete="current-password"
                            margin="normal"
                            variant="outlined"
                            value={password}
                            onChange={this.handlePassword}
                        />
                        <div className={classes.checkboxSection}>
                            <div className={classes.checkbox} />
                            <Link to={Routes.FORGOT_PASSWORD}>Forgot password?</Link>
                        </div>
                        <ErrorMsgBox errorMsg={error} showErr={error} />
                        <StyledButton type="blue" btnText="login" onClick={this.handleSubmit} />
                    </form>
                </Grid>
            </Grid>
        );
    }
}
export default withStyles(useStyles)(Login);
