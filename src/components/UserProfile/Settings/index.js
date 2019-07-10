import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { connect } from "react-redux";
import validator from "validator";

import ErrorMsgBox from "../../common/ErrorMsgBox";
import StyledButton from "../../common/StyledButton";
import { useStyles } from "./styles";
import Session from "../../../utility/constants/Session";
import { userActions } from "../../../Redux/actionCreators";
import Routes from "../../../utility/constants/Routes";

class Settings extends Component {
  state = {
    email: "",
    acceptNotification: false,
    error: undefined,
  };

  handleEmailChange = event => {
    this.setState({
      email: event.target.value,
    });
  };

  handleAcceptNotification = () => {
    this.setState(prevState => ({ acceptNotification: !prevState.acceptNotification }));
  };

  handleDelete = async () => {
    const deleteUserResponse = await this.props.deleteUserAccount();
    if (deleteUserResponse == "user deleted") {
      this.props.history.push(`/${Routes.AI_MARKETPLACE}`);
    }
  };

  handleSubmit = () => {
    const { name, email } = this.state;
    if (!validator.isEmail(email)) {
      this.handleErrorMessage("Email provided is not valid");
    }
    if (!validator.isAlpha(name)) {
      this.handleErrorMessage("");
    }
  };

  handleErrorMessage = error => {
    this.setState({ error });
    setTimeout(() => this.setState({ error: undefined }), 2000);
  };

  shouldSaveButtonBeEnabled = () => {
    return false;
  };

  render() {
    const { classes } = this.props;
    const { email, acceptNotification } = this.state;
    const userName = sessionStorage.getItem(Session.USERNAME);
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
                value={userName}
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
                value={email}
                onChange={this.handleEmailChange}
                margin="normal"
                variant="outlined"
              />
            </div>
            <div>
              <h4>Password</h4>
              <Link>Change Password</Link>
            </div>
            <div className={classes.notification}>
              <h4>Notifications</h4>
              <FormControlLabel
                control={
                  <Checkbox
                    className={classes.checkkBox}
                    checked={acceptNotification}
                    onChange={this.handleAcceptNotification}
                    value=""
                    color="primary"
                  />
                }
                label="Receive notifications via email"
              />
              <p>
                This includes notifications about algorithms, comments, etc. Account related information will still be
                sent to your email.
              </p>
            </div>

            <ErrorMsgBox showErr={true} errorMsg="undefined" />

            <div className={classes.btnContainer}>
              <StyledButton btnText="save changes" disabled={!this.shouldSaveButtonBeEnabled()} />
              <StyledButton btnText="delete account" type="red" onClick={this.handleDelete} />
            </div>
          </div>
        </Grid>
      </Grid>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  deleteUserAccount: () => dispatch(userActions.deleteUserAccount()),
});

export default connect(
  null,
  mapDispatchToProps
)(withStyles(useStyles)(Settings));
