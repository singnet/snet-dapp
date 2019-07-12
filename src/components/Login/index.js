import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";

import StyledButton from "../common/StyledButton";
import ErrorMsgBox from "../common/ErrorMsgBox";
import Routes from "../../utility/constants/Routes";
import { useStyles } from "./styles";
import { userActions } from "../../Redux/actionCreators";

class Login extends Component {
  state = {
    username: "",
    password: "",
  };

  componentDidMount = () => {
    if (this.props.isLoggedIn) {
      this.props.history.push(Routes.ONBOARDING);
    }
  };

  componentDidUpdate = () => {
    if (this.props.isLoggedIn) {
      this.props.history.push(Routes.ONBOARDING);
    }
  };

  handleUsername = event => {
    this.setState({ username: event.currentTarget.value });
  };

  handlePassword = event => {
    this.setState({ password: event.currentTarget.value });
  };

  handleSubmit = event => {
    this.setState({ error: undefined });
    const { username, password } = this.state;
    event.preventDefault();
    event.stopPropagation();
    let credentials = { username, password };
    this.props.login(credentials);
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
              autoFocus={true}
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
            <ErrorMsgBox errorMsg={loginError} />
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
  setUserDetails: () => dispatch(userActions.setUserDetails),
  login: credentials => dispatch(userActions.login(credentials)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(Login));
