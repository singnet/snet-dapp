import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";

import StyledButton from "../common/StyledButton";
import AlertBox from "../common/AlertBox";
import Routes from "../../utility/constants/Routes";
import { useStyles } from "./styles";
import { userActions } from "../../Redux/actionCreators";
import snetValidator from "../../utility/snetValidator";
import { loginConstraints } from "./validationConstraints";

class Login extends Component {
  state = {
    email: "",
    password: "",
  };

  componentDidMount = () => {
    this.props.resetError();
  };

  handleEmail = event => {
    this.setState({ email: event.currentTarget.value });
  };

  handlePassword = event => {
    this.setState({ password: event.currentTarget.value });
  };

  handleSubmit = async event => {
    const { history, updateError } = this.props;
    let route = `/${Routes.ONBOARDING}`;
    if (history.location.state && history.location.state.sourcePath) {
      route = history.location.state.sourcePath;
    }
    const isNotValid = snetValidator(this.state, loginConstraints);
    if (isNotValid) {
      updateError(isNotValid[0]);
      return;
    }
    const { email, password } = this.state;
    event.preventDefault();
    event.stopPropagation();
    await this.props.login({ email, password, history, route });
  };

  render() {
    const { classes, loginError } = this.props;
    const { email, password } = this.state;
    return (
      <Grid container spacing={24}>
        <Grid item xs={12} sm={12} md={12} lg={12} className={classes.loginDetails}>
          <h2>Welcome Back</h2>
          <form noValidate autoComplete="off" className={classes.loginForm}>
            <TextField
              id="outlined-user-name"
              label="Email"
              className={classes.textField}
              margin="normal"
              variant="outlined"
              value={email}
              autoFocus
              onChange={this.handleEmail}
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
            <AlertBox type="error" message={loginError} />
            <StyledButton type="blue" btnText="login" onClick={this.handleSubmit} btnType="submit" />
          </form>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.userReducer.login.isLoggedIn,
  loginError: state.userReducer.login.error,
});

const mapDispatchToProps = dispatch => ({
  fetchUserDetails: () => dispatch(userActions.fetchUserDetails),
  login: args => dispatch(userActions.login(args)),
  resetError: () => dispatch(userActions.resetLoginError),
  updateError: error => dispatch(userActions.updateLoginError(error)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(Login));
