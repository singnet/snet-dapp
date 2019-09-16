import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/styles";
import { connect } from "react-redux";

import AlertBox from "../../common/AlertBox";
import StyledButton from "../../common/StyledButton";
import Routes from "../../../utility/constants/Routes";
import { useStyles } from "./styles";
import { userActions, errorActions } from "../../../Redux/actionCreators";
import { forgotPasswordConstraints } from "./validationConstraints";
import snetValidator from "../../../utility/snetValidator";

const ForgotPassword = ({ classes, email, error, handleForgotPassword, history, updateError, resetError }) => {
  const [localEmail, setEmail] = useState(email);

  const handleEmail = event => {
    setEmail(event.target.value);
  };

  const handleSubmit = event => {
    resetError();
    event.preventDefault();
    event.stopPropagation();
    const isNotValid = snetValidator({ email: localEmail }, forgotPasswordConstraints);
    if (isNotValid) {
      updateError(isNotValid[0]);
      return;
    }
    const route = `/${Routes.FORGOT_PASSWORD_SUBMIT}`;
    handleForgotPassword({ email: localEmail, history, route });
  };

  return (
    <Grid container spacing={24} className={classes.forgotPwdMainContainer}>
      <Grid item xs={12} sm={12} md={12} lg={12} className={classes.forgotPwdContent}>
        <h2>Forgot your pasword?</h2>
        <p>We'll email you instructions on how to reset it.</p>
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
          <StyledButton type="blue" btnText="reset password" onClick={handleSubmit} />
        </form>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = state => ({
  email: state.userReducer.email,
  error: state.errorReducer.forgotPassword,
});

const mapDispatchToProps = dispatch => ({
  updateEmail: email => dispatch(userActions.updateEmail(email)),
  handleForgotPassword: args => dispatch(userActions.forgotPassword(args)),
  resetError: () => dispatch(errorActions.resetForgotPasswordError),
  updateError: error => dispatch(errorActions.updateForgotPasswordError(error)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(ForgotPassword));
