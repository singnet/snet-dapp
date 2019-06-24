import React, { Component, Fragment } from "react";
import { Auth } from "aws-amplify";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/styles";

import Header from "../common/LoginOnboardingHeader";
import StyledButton from "../common/StyledButton";
import ErrorMsgBox from "../common/ErrorMsgBox";
import Routes from "../../utility/stringConstants/Routes";
import { isValidEmail } from "../../utility/Validation";
import Session from "../../utility/stringConstants/Session";
import { parseError } from "../../utility/ErrorHandling";

const useStyles = theme => ({
    signupMainContent: {
        width: "71%",
        paddingBottom: 50,
        margin: "0 auto",
    },
    signupContent: {
        width: "71%",
        margin: "0 auto",
    },
    signupInfo: {
        paddingRight: 100,
        "@media (max-width:960px)": {
            paddingRight: 0,
        },
        "& h2": {
            margin: 0,
            color: theme.palette.text.black1,
            fontSize: 36,
        },
        "& p": {
            margin: "40px 0 40px",
            color: theme.palette.text.gray3,
            fontFamily: theme.typography.secondary.main,
            fontSize: 20,
            lineHeight: "30px",
        },
        "& ul": {
            margin: 0,
            padding: 0,
        },

        "& li": {
            marginBottom: 15,
            listStyle: "none",
            "& i": {
                marginRight: 15,
                color: theme.palette.text.green,
                fontSize: 20,
            },
            "& p": {
                color: theme.palette.text.gray3,
                fontFamily: theme.typography.secondary.main,
                fontSize: 16,
                letterSpacing: "0.29px",
                display: "inline-block",
                margin: 0,
                width: "84%",
                verticalAlign: "top",
            },
        },
    },
    signupForm: {
        boxSizing: "border-box",
        width: 410,
        padding: "20px 20px 30px",
        margin: "0 auto",
        boxShadow: "0 1px 1px 0 rgba(0,0,0,0.14), 0 2px 1px -1px rgba(0,0,0,0.14), 0 1px 3px 0 rgba(0,0,0,0.2)",
        "& h3": {
            margin: "0 0 11px",
            color: theme.palette.text.gray2,
            fontSize: 16,
            letterSpacing: "0.29px",
            textAlign: "center",
            textTransform: "uppercase",
        },
        "& button": { width: "100%" },
        "@media (max-width:960px)": {
            width: "95%",
            marginTop: 35,
        },
    },
    horizontalLine: {
        marginTop: 15,
        display: "block",
        color: theme.palette.text.gray2,
        fontSize: 14,
        textTransform: "uppercase",
        textAlign: "center",
        "&::before": {
            content: '" "',
            display: "inline-block",
            verticalAlign: "middle",
            width: 160,
            height: 1,
            backgroundColor: theme.palette.text.gray5,
            marginRight: 10,
        },
        "&::after": {
            content: '" "',
            display: "inline-block",
            verticalAlign: "middle",
            width: 160,
            height: 1,
            marginLeft: 10,
            backgroundColor: theme.palette.text.gray5,
        },
    },
    textField: {
        width: "100%",
        marginBottom: 0,
        display: "inline-block",
        "& label": {
            fontFamily: theme.typography.primary.main,
        },
        "& div": {
            width: "100%",
        },
    },
    charCount: {
        color: theme.palette.text.gray2,
        fontFamily: theme.typography.secondary.main,
        fontSize: "12.17px",
        letterSpacing: "0.4px",
    },
    usernameError: {
        color: theme.palette.text.gray6,
        fontFamily: theme.typography.secondary.main,
        fontSize: "12.17px",
        letterSpacing: "0.4px",
    },
    passwordTxt: {
        color: theme.palette.text.gray2,
        fontFamily: theme.typography.secondary.main,
        fontSize: "12.17px",
        letterSpacing: "0.4px",
    },
    checkboxSection: {
        textAlign: "center",
        "& p": {
            display: "inline-block",
            color: theme.palette.text.gray4,
        },
        "& a": {
            color: theme.palette.text.primary,
            fontSize: 14,
            textDecoration: "none",
        },
    },
    buttonsContainer: {
        marginTop: 10,
        "& button": {
            padding: " 13px 60px 11px",
            marginTop: 10,
        },
    },
    confirmOtp: {
        width: 410,
        margin: "0 auto",
    },
});

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
                            <i className="fas fa-check-circle"></i>
                            <p>Built for you, powered for enterprise.</p>
                        </li>
                        <li>
                            <i className="fas fa-check-circle"></i>
                            <p>
                                Get 100 free credits to try out any of the AI services available. Easily refill your
                                credits anytime.{" "}
                            </p>
                        </li>
                        <li>
                            <i className="fas fa-check-circle"></i>
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
