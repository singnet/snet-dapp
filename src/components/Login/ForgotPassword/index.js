import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { withStyles } from "@mui/styles";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import AlertBox from "snet-dapp-components/components/AlertBox";
import StyledButton from "snet-dapp-components/components/StyledButton";
import Routes from "../../../utility/constants/Routes";
import { useStyles } from "./styles";
import { userActions, errorActions } from "../../../Redux/actionCreators";
import { forgotPasswordConstraints } from "./validationConstraints";
import snetValidator from "../../../utility/snetValidator";
import { useMatch } from "react-router-dom";

const ForgotPassword = ({ classes, email, error, handleForgotPassword, history, updateError, resetError }) => {
  const [localEmail, setEmail] = useState(email);

  useEffect(() => {
    setEmail(email);
  }, [email]);

  const handleEmail = (event) => {
    setEmail(event.target.value.toLowerCase());
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    resetError();
    const isNotValid = snetValidator({ email: localEmail }, forgotPasswordConstraints);
    if (isNotValid) {
      updateError(isNotValid[0]);
      return;
    }
    const route = `/${Routes.FORGOT_PASSWORD_SUBMIT}`;
    handleForgotPassword({ email: localEmail, history, route });
  };

  const isResetPasswordRoute = useMatch(`/${Routes.RESET_PASSWORD}`);

  const passwordChangeTitle = isResetPasswordRoute ? "Reset your password to login" : "Forgot your pasword?";
  const passwordChangeDescription = isResetPasswordRoute
    ? "To ensure your account's safety we need you to reset your password. We will email instructions to your registered email."
    : "We'll email you instructions on how to reset it.";

  return (
    <Grid container className={classes.forgotPwdMainContainer}>
      <Helmet>
        <meta
          name="description"
          content="Accessing your AI marketplace account is just a click away. Use our easy password reset option and get back to exploring SingularityNET's services."
        />
        <meta
          name="keywords"
          content="SingularityNET password reset, forgot password, account recovery, decentralized AI platform, secure access"
        />
      </Helmet>
      <Grid item xs={12} sm={12} md={12} lg={12} className={classes.forgotPwdContent}>
        <h2>{passwordChangeTitle}</h2>
        <p>{passwordChangeDescription}</p>
        <form noValidate autoComplete="off" className={classes.forgotPwdForm}>
          <TextField
            id="outlined-username-input"
            label="Email"
            className={classes.textField}
            type="text"
            name="email"
            margin="normal"
            variant="outlined"
            value={localEmail}
            onChange={handleEmail}
          />
          <AlertBox type="error" message={error} />
          <StyledButton type="blue" btnText="reset password" onClick={handleSubmit} btnType="submit" />
        </form>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  email: state.userReducer.email,
  error: state.errorReducer.forgotPassword,
});

const mapDispatchToProps = (dispatch) => ({
  updateEmail: (email) => dispatch(userActions.updateEmail(email)),
  handleForgotPassword: (args) => dispatch(userActions.forgotPassword(args)),
  resetError: () => dispatch(errorActions.resetForgotPasswordError),
  updateError: (error) => dispatch(errorActions.updateForgotPasswordError(error)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(ForgotPassword));
