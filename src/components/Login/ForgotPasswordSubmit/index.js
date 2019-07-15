import React, { useState } from "react";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";

import Routes from "../../../utility/constants/Routes";
import { userActions } from "../../../Redux/actionCreators";
import MessageBox from "../../common/MessageBox";
import { useStyles } from "./styles";
import StyledButton from "../../common/StyledButton";

const ForgotPasswordSubmit = ({ classes, history, error, username, forgotPasswordSubmit }) => {
  const [code, setCode] = useState();
  const [password, setPassword] = useState();

  const handleCode = event => {
    setCode(event.currentTarget.value);
  };

  const handlePassword = event => {
    setPassword(event.currentTarget.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    const route = `/${Routes.AI_MARKETPLACE}`;
    forgotPasswordSubmit({ username, code, password, history, error, route });
  };

  return (
    <Grid container spacing={24}>
      <Grid item xs={12} sm={12} md={12} lg={12} className={classes.forgotPwdContent}>
        <h2>Verification Code</h2>
        <p>Enter the verification code and new passoword.</p>
        <form className={classes.forgotPwdForm}>
          <TextField
            id="outlined-code-input"
            label="Code"
            className={classes.textField}
            type="text"
            name="username"
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
            name="username"
            margin="normal"
            variant="outlined"
            value={password}
            onChange={handlePassword}
          />
          <StyledButton type="blue" btnText="Reset Password" onClick={handleSubmit} />
          <MessageBox errorMsg={error} />
        </form>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = state => ({
  username: state.userReducer.username,
  error: state.errorReducer.forgotPasswordSubmit,
});

const mapDispatchToProps = dispatch => ({
  forgotPasswordSubmit: args => dispatch(userActions.forgotPasswordSubmit({ ...args })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(ForgotPasswordSubmit));
