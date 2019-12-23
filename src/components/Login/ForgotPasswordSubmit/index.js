import React, { useState } from "react";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";

import Routes from "../../../utility/constants/Routes";
import { userActions, errorActions } from "../../../Redux/actionCreators";
import AlertBox from "../../common/AlertBox";
import { useStyles } from "./styles";
import StyledButton from "../../common/StyledButton";
import snetValidator from "../../../utility/snetValidator";
import { forgotPassworSubmitConstraints } from "./validationConstraints";

const ForgotPasswordSubmit = ({ classes, history, error, email, forgotPasswordSubmit, updateError, resetError }) => {
  const [showEmailSentAlert, setShowEmailSentAlert] = useState(true);
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleEnterOtp = event => {
    event.preventDefault();
    setShowEmailSentAlert(false);
  };

  const handleCode = event => {
    setCode(event.currentTarget.value);
  };

  const handlePassword = event => {
    setPassword(event.currentTarget.value);
  };

  const handleConfirmPassword = event => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    resetError();
    const isNotValid = snetValidator({ password, confirmPassword, code }, forgotPassworSubmitConstraints);
    if (isNotValid) {
      updateError(isNotValid[0]);
      return;
    }
    const route = `/${Routes.AI_MARKETPLACE}`;
    forgotPasswordSubmit({ email, code, password, history, error, route });
  };

  if (showEmailSentAlert) {
    return (
      <section className={classes.resetPasswordContainer}>
        <span>Reset Password Email Sent.</span>
        <p>
          Click <a onClick={handleEnterOtp}>here</a> to enter the verification code.
        </p>
      </section>
    );
  }

  return (
    <Grid container spacing={24}>
      <Grid item xs={12} sm={12} md={12} lg={12} className={classes.forgotPwdContent}>
        <h2>Verification Code</h2>
        <p>Enter the verification code and new password.</p>
        <form className={classes.forgotPwdForm}>
          <TextField
            id="outlined-code-input"
            label="Code"
            className={classes.textField}
            type="text"
            name="code"
            margin="normal"
            variant="outlined"
            value={code}
            onChange={handleCode}
          />
          <TextField
            id="outlined-new-password-input"
            label="New Password"
            className={classes.textField}
            type="password"
            name="email"
            margin="normal"
            variant="outlined"
            value={password}
            onChange={handlePassword}
          />
          <TextField
            id="outlined-confirm-password-input"
            label="Confirm Password"
            className={classes.textField}
            type="password"
            name="email"
            margin="normal"
            variant="outlined"
            value={confirmPassword}
            onChange={handleConfirmPassword}
          />
          <AlertBox message={error} />
          <StyledButton type="blue" btnText="Reset Password" onClick={handleSubmit} btnType="submit" />
        </form>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = state => ({
  email: state.userReducer.email,
  error: state.errorReducer.forgotPasswordSubmit,
});

const mapDispatchToProps = dispatch => ({
  forgotPasswordSubmit: args => dispatch(userActions.forgotPasswordSubmit(args)),
  resetError: () => dispatch(errorActions.resetForgotPasswordSubmitError),
  updateError: error => dispatch(errorActions.updateForgotPasswordSubmitError(error)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(ForgotPasswordSubmit));
