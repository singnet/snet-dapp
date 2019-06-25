import React, { Component, Fragment } from "react";
import { Auth } from "aws-amplify";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/styles";

import Header from "../../common/LoginOnboardingHeader";
import StyledButton from "../../common/StyledButton";
import ErrorMsgBox from "../../common/ErrorMsgBox";
import Routes from "../../../utility/stringConstants/Routes";
import { isValidEmail } from "../../../utility/Validation";
import Session from "../../../utility/stringConstants/Session";
import { parseError } from "../../../utility/ErrorHandling";
import { useStyles } from "./styles";
import { Icon } from "@material-ui/core";

class SignUp extends Component {
    state = {
        username: "",
        email: "",
        password: "",
        error: undefined,
        toBeConfirmed: false,
        otp: "",
    };

    handleUsername = event => {
        this.setState({ username: event.currentTarget.value });
    };

    handleEmail = event => {
        this.setState({ email: event.currentTarget.value });
    };

    handlePassword = event => {
        this.setState({ password: event.currentTarget.value });
    };

    handleOTP = event => {
        this.setState({ otp: event.currentTarget.value });
    };

    handleSubmit = event => {
        event.preventDefault();
        const { username, password, email } = this.state;
        this.setState({ error: undefined });
        if (username === "") {
            this.setState({ error: "Please enter a username" });
            return;
        }
        if (email === "") {
            this.setState({ error: "Email cannot be left blank" });
            return;
        }
        if (!isValidEmail(email)) {
            this.setState({ error: "Please enter a valid email" });
            return;
        }
        if (password === "") {
            this.setState({ error: "Password cannot be left blank" });
            return;
        }

        Auth.signUp({
            username,
            password,
            attributes: {
                email,
                name: username,
            },
        })
            .then(user => {
                sessionStorage.setItem(Session.USERNAME, username);
                this.setState({ toBeConfirmed: true });
            })
            .catch(err => this.setState({ error: err.message }));
    };

    handleConfirmSignup = event => {
        const { username, otp } = this.state;
        event.preventDefault();
        event.stopPropagation();
        Auth.confirmSignUp(username, otp)
            .then(res => {
                sessionStorage.setItem(Session.USERNAME, username);
                this.props.history.push(Routes.LOGIN);
            })
            .catch(err => {
                let error = parseError(err);
                this.setState({ error });
            });
    };

    handleResendOTP = () => {
        this.setState({ error: undefined });
        const { username } = this.state;
        Auth.resendSignUp(username)
            .then(() => {
                this.setState({ error: "code resent successfully" });
            })
            .catch(err => {
                this.setState({ error: err.message });
            });
    };

    render() {
        const { username, email, password, otp, error, toBeConfirmed } = this.state;
        const { classes } = this.props;

        const renderForm = (
            <Fragment>
                <Grid item xs={12} sm={12} md={6} lg={6} className={classes.signupInfo}>
                    <h2>Sign up for your free account in minutes</h2>
                    <p>
                        {" "}
                        Use your Github account to easily get started, or fill out the form. Get free credits for the
                        first month and continue with your perferred wallet or credit card.{" "}
                    </p>
                    <ul>
                        <li>
                            <Icon className="fas fa-check-circle" />
                            <p>Built for you, powered for enterprise.</p>
                        </li>
                        <li>
                            <Icon className="fas fa-check-circle" />
                            <p>
                                Get 100 free credits to try out any of the AI services available. Easily refill your
                                credits anytime.{" "}
                            </p>
                        </li>
                        <li>
                            <Icon className="fas fa-check-circle" />
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua.
                            </p>
                        </li>
                    </ul>
                </Grid>

                <Grid item xs={12} sm={12} md={6} lg={6}>
                    <form noValidate autoComplete="off" className={classes.signupForm}>
                        <h3>sign up with </h3>
                        <StyledButton btnText="github" type="black" iconClass="fab fa-github" />
                        <span className={classes.horizontalLine}>or</span>
                        <TextField
                            id="outlined-user-name"
                            label="UserName"
                            className={classes.textField}
                            value={username}
                            onChange={this.handleUsername}
                            margin="normal"
                            variant="outlined"
                        />
                        <div>
                            <TextField
                                id="outlined-email-input"
                                label="Email"
                                className={classes.textField}
                                type="email"
                                name="email"
                                autoComplete="email"
                                margin="normal"
                                variant="outlined"
                                value={email}
                                onChange={this.handleEmail}
                            />
                            {email !== "" && !isValidEmail(email) && (
                                <span className={classes.usernameError}>Error msg - invalid email</span>
                            )}
                        </div>
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

                        {error && <ErrorMsgBox errorMsg={error} />}
                        <div style={{ marginTop: 20 }}></div>
                        <StyledButton type="blue" btnText="Sign up for free credits" onClick={this.handleSubmit} />
                    </form>
                </Grid>
            </Fragment>
        );

        const renderOTP = (
            <Grid item xs={12} sm={12} md={6} lg={6} className={`${classes.confirmOtp}`}>
                <form noValidate autoComplete="off" className={`${classes.signupForm}`}>
                    <h3>Confirm Sign up </h3>
                    <p>
                        <strong>A verfiication code has been sent to your email address</strong>
                    </p>
                    <p>
                        Please enter the verification code below to confirm your email address. If you are unable to
                        find the email from
                        <strong> 'otp@singularitynet.io'</strong> in your inbox, make sure to check the spam folder. The
                        code will be valid only for 5 minutes.
                    </p>
                    <TextField
                        id="outlined-confirm-otp"
                        label="OTP"
                        className={classes.textField}
                        type="password"
                        autoComplete="otp"
                        margin="normal"
                        variant="outlined"
                        value={otp}
                        onChange={this.handleOTP}
                    />
                    {error && <ErrorMsgBox errorMsg={error} />}
                    <div className={classes.buttonsContainer}>
                        <StyledButton type="blue" btnText="Resend" onClick={this.handleResendOTP} />
                        <StyledButton type="blue" btnText="Conitnue" onClick={this.handleConfirmSignup} />
                    </div>
                </form>
            </Grid>
        );

        return (
            <div>
                <Header title="Already have an account?" linkPath={Routes.LOGIN} linkText="Login" />
                <Grid container spacing={24} className={classes.signupMainContent}>
                    {toBeConfirmed ? renderOTP : renderForm}
                </Grid>
            </div>
        );
    }
}

export default withStyles(useStyles)(SignUp);
