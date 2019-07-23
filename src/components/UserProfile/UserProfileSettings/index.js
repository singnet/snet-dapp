import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { connect } from "react-redux";

import StyledButton from "../../common/StyledButton";
import { useStyles } from "./styles";
import { userActions } from "../../../Redux/actionCreators";
import Routes from "../../../utility/constants/Routes";
import AlertBox from "../../common/AlertBox";

class UserProfileSettings extends Component {
  state = {
    error: undefined,
    emailAlerts: this.props.emailAlerts,
  };

  handleEmailChange = event => {
    this.setState({
      email: event.target.value,
    });
  };

  handleEmailAlerts = () => {
    this.setState(prevState => ({ emailAlerts: !prevState.emailAlerts }));
  };

  handleDelete = async () => {
    const { history } = this.props;
    const route = `/${Routes.AI_MARKETPLACE}`;
    try {
      await this.props.deleteUserAccount({ history, route });
    } catch (err) {
      this.setState({ error: String(err) });
    }
  };

  handleChangePassword = () => {
    this.props.history.push(`/${Routes.FORGOT_PASSWORD}`);
  };

  handleSubmit = () => {
    const { username, updateUserProfile } = this.props;
    const updatedUserData = { username, email_alerts: this.state.emailAlerts };
    updateUserProfile(updatedUserData);
  };

  shouldSubmitBeEnabled = () => {
    return this.state.emailAlerts !== this.props.emailAlerts;
  };

  render() {
    const { classes, userEmail, username } = this.props;
    const { error, emailAlerts } = this.state;
    return (
      <Grid container spacing={24} className={classes.settingMainContainer}>
        <Grid item xs={12} sm={12} md={8} lg={8} className={classes.settingsContainer}>
          <h3>Settings</h3>
          <div className={classes.settingsContent}>
            <div>
              <TextField
                id="outlined-name"
                label="User Name (20 char max)"
                className={classes.styledTextField}
                value={username}
                margin="normal"
                variant="outlined"
                disabled
              />
              <p>Your username will be visible to other users when you post comments.</p>
            </div>
            <div>
              <TextField
                id="outlined-name"
                label="Email"
                className={classes.styledTextField}
                value={userEmail}
                margin="normal"
                variant="outlined"
                disabled
              />
            </div>
            <div>
              <h4>Password</h4>
              <StyledButton
                type="transparentBlueBorder"
                btnText="Change Password"
                onClick={this.handleChangePassword}
              />
            </div>
            <div className={classes.notification}>
              <h4>Notifications</h4>
              <FormControlLabel
                control={
                  <Checkbox
                    className={classes.checkkBox}
                    value=""
                    color="primary"
                    checked={emailAlerts}
                    onChange={this.handleEmailAlerts}
                  />
                }
                label="Receive notifications via email"
              />
              <p>
                This includes notifications about algorithms, comments, etc. Account related information will still be
                sent to your email.
              </p>
            </div>
            <AlertBox message={error} />
            <div className={classes.btnContainer}>
              <StyledButton
                btnText="save changes"
                disabled={!this.shouldSubmitBeEnabled()}
                onClick={this.handleSubmit}
              />
              <StyledButton btnText="delete account" type="red" onClick={this.handleDelete} />
            </div>
          </div>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  userEmail: state.userReducer.email,
  username: state.userReducer.username,
  emailAlerts: state.userReducer.emailAlerts,
});

const mapDispatchToProps = dispatch => ({
  deleteUserAccount: ({ history, route }) => dispatch(userActions.deleteUserAccount({ history, route })),
  fetchUserProfile: () => dispatch(userActions.fetchUserProfile()),
  updateUserProfile: updatedUserData => dispatch(userActions.updateUserProfile(updatedUserData)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(UserProfileSettings));
