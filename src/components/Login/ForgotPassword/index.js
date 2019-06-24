import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/styles";

import Header from "../../common/LoginOnboardingHeader";
import ErrorMsgBox from "../../common/ErrorMsgBox";
import StyledButton from "../../common/StyledButton";
import Routes from "../../../utility/stringConstants/Routes";
import { Auth } from "aws-amplify";
import Session from "../../../utility/stringConstants/Session";
import { useStyles } from "./styles";

class ForgotPassword extends Component {
    state = {
        username: "",
        error: undefined,
    };

    handleUsername = event => {
        this.setState({ username: event.currentTarget.value });
    };

    handleSubmit = event => {
        this.setState({ error: undefined });
        const { username } = this.state;

        event.preventDefault();
        event.stopPropagation();
        Auth.forgotPassword(username)
            .then(res => {
                sessionStorage.setItem(Session.USERNAME, username);
                this.props.history.push(Routes.FORGOT_PASSWORD_SUBMIT);
            })
            .catch(err => {
                this.setState({ error: err.message });
            });
    };

    render() {
        const { classes } = this.props;
        const { username, error } = this.state;
        return (
            <Grid container spacing={24}>
                <Header title="Already have an account?" linkText="Login" />
                <Grid item xs={12} sm={12} md={12} lg={12} className={classes.forgotPwdContent}>
                    <h2>Forgot your pasword?</h2>
                    <p>We'll email you instructions on how to reset it.</p>
                    <form noValidate autoComplete="off" className={classes.forgotPwdForm}>
                        <TextField
                            id="outlined-username-input"
                            label="Email"
                            className={classes.textField}
                            type="text"
                            name="username"
                            margin="normal"
                            variant="outlined"
                            value={username}
                            onChange={this.handleUsername}
                        />
                        <ErrorMsgBox errorMsg={error} showErr={error} />
                        <StyledButton type="blue" btnText="reset password" onClick={this.handleSubmit} />
                    </form>
                </Grid>
            </Grid>
        );
    }
}
export default withStyles(useStyles)(ForgotPassword);
