import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/styles";
import { connect } from "react-redux";

import MessageBox from "../../common/MessageBox";
import StyledButton from "../../common/StyledButton";
import Routes from "../../../utility/constants/Routes";
import { useStyles } from "./styles";
import { userActions } from "../../../Redux/actionCreators";

const ForgotPassword = ({ classes, username, error, handleForgotPassword, history }) => {
  const [localUsername, setUsername] = useState(username);

  const handleUsername = event => {
    setUsername(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    event.stopPropagation();
    const route = `/${Routes.FORGOT_PASSWORD_SUBMIT}`;
    handleForgotPassword({ username: localUsername, history, route });
  };

  return (
    <Grid container spacing={24}>
      <Grid item xs={12} sm={12} md={12} lg={12} className={classes.forgotPwdContent}>
        <h2>Forgot your pasword?</h2>
        <p>We'll email you instructions on how to reset it.</p>
        <form noValidate autoComplete="off" className={classes.forgotPwdForm}>
          <TextField
            id="outlined-username-input"
            label="Username"
            className={classes.textField}
            type="text"
            name="username"
            margin="normal"
            variant="outlined"
            value={localUsername}
            onChange={handleUsername}
          />
          <MessageBox type="error" errorMsg={error} />
          <StyledButton type="blue" btnText="reset password" onClick={handleSubmit} />
        </form>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = state => ({
  username: state.userReducer.username,
  error: state.errorReducer.forgotPassword,
});

const mapDispatchToProps = dispatch => ({
  updateUsername: username => dispatch(userActions.updateUsername(username)),
  handleForgotPassword: args => dispatch(userActions.forgotPassword({ ...args })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(ForgotPassword));
