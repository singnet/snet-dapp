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

class Login extends Component {
  state = {
    username: "",
    password: "",
  };

  handleUsername = event => {
    this.setState({ username: event.currentTarget.value });
  };

  handlePassword = event => {
    this.setState({ password: event.currentTarget.value });
  };

  handleSubmit = event => {
    const { history } = this.props;
    let route = `/${Routes.ONBOARDING}`;
    if (history.location.state && history.location.state.sourcePath) {
      route = history.location.state.sourcePath;
    }
    this.setState({ error: undefined });
    const { username, password } = this.state;
    event.preventDefault();
    event.stopPropagation();
    this.props.login({ username, password, history, route });
  };

  render() {
    const { classes, loginError } = this.props;
    const { username, password } = this.state;
    return (
      <Grid container spacing={24}>
        <Grid item xs={12} sm={12} md={12} lg={12} className={classes.loginDetails}>
          <h2>Welcome Back</h2>
          <form noValidate autoComplete="off" className={classes.loginForm}>
            <TextField
              id="outlined-user-name"
              label="Username or Email"
              className={classes.textField}
              margin="normal"
              variant="outlined"
              value={username}
              autoFocus
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
            <AlertBox type="error" message={loginError} />
            <StyledButton type="blue" btnText="login" onClick={this.handleSubmit} />
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
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(Login));
