import React, { useEffect, useState } from "react";
import { withStyles } from "@mui/styles";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useDispatch, useSelector } from "react-redux";

import StyledButton from "../../common/StyledButton";
import { useStyles } from "./styles";
import { userActions, loaderActions } from "../../../Redux/actionCreators";
import Routes from "../../../utility/constants/Routes";
import AlertBox, { alertTypes } from "../../common/AlertBox";
import ConfirmDelete from "./ConfirmDelete";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { isUndefined } from "lodash";

const UserProfileSettings = ({ classes }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userEmail = useSelector((state) => state.userReducer.email);
  const nickname = useSelector((state) => state.userReducer.nickname);
  const emailAlerts = useSelector((state) => state.userReducer.emailAlerts);

  const [isEmailAlerts, setIsEmailAlerts] = useState(emailAlerts || false);
  const [alert, setAlert] = useState({ message: "", type: alertTypes.ERROR });
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [confirmDeleteError, setConfirmDeleteError] = useState();

  useEffect(() => {
    setIsEmailAlerts(emailAlerts);
    if (isUndefined(emailAlerts)) {
      dispatch(userActions.fetchUserAlerts());
    }
  }, [dispatch, emailAlerts]);

  const handleEmailAlerts = () => {
    setIsEmailAlerts(!isEmailAlerts);
  };

  const handleDelete = () => {
    setShowConfirmDelete(true);
  };

  const handleChangePassword = () => {
    navigate(`/${Routes.FORGOT_PASSWORD}`);
  };

  const handleSubmit = async () => {
    setAlert({});
    try {
      await dispatch(userActions.updateUserProfile(isEmailAlerts));
      setAlert({ type: alertTypes.SUCCESS, message: "Changes saved successfully" });
    } catch (error) {
      setAlert({ type: alertTypes.ERROR, message: String(error) });
    }
  };

  const handleConfirmDeleteClose = () => {
    setShowConfirmDelete(false);
    setConfirmDeleteError(undefined);
  };

  const handleConfirmDeleteSubmit = async () => {
    const route = `/${Routes.AI_MARKETPLACE}`;
    try {
      await dispatch(userActions.deleteUserAccount(route));
    } catch (err) {
      let confirmDeleteError = String(err.message);
      if (err.response && err.response.status === 404) {
        confirmDeleteError = "The profile has already been deleted";
      }
      setConfirmDeleteError(confirmDeleteError);
      dispatch(loaderActions.stopAppLoader());
    }
  };

  return (
    <Grid container className={classes.settingMainContainer}>
      <Helmet>
        <meta
          name="description"
          content="Adjust your SingularityNET settings for an optimized AI service experience. Personalize notifications, privacy, and more."
        />
        <meta name="keywords" content="User Settings, AI Customization, SingularityNET, Platform Preferences" />
      </Helmet>
      <Grid item xs={12} sm={12} md={7} lg={7} className={classes.settingsContainer}>
        <h3>Settings</h3>
        <div className={classes.settingsContent}>
          <div>
            <TextField
              id="outlined-name"
              label="Nick Name (20 char max)"
              className={classes.styledTextField}
              value={nickname}
              margin="normal"
              variant="outlined"
              disabled
            />
            <p>Your nickname will be visible to other users when you post comments.</p>
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
            <StyledButton type="transparentBlueBorder" btnText="Change Password" onClick={handleChangePassword} />
          </div>
          <div className={classes.notification}>
            <h4>Notifications</h4>
            <FormControlLabel
              control={
                <Checkbox
                  className={classes.checkkBox}
                  color="primary"
                  checked={isEmailAlerts}
                  onChange={handleEmailAlerts}
                />
              }
              label="Receive notifications via email"
            />
            <p>
              This includes notifications about algorithms, comments, etc. Account related information will still be
              sent to your email.
            </p>
          </div>
          <AlertBox {...alert} />
          <div className={classes.btnContainer}>
            <StyledButton btnText="save changes" onClick={handleSubmit} />
            <StyledButton btnText="delete account" type="red" onClick={handleDelete} />
          </div>
        </div>
      </Grid>
      <ConfirmDelete
        open={showConfirmDelete}
        handleClose={handleConfirmDeleteClose}
        handleSubmit={handleConfirmDeleteSubmit}
        error={confirmDeleteError}
      />
    </Grid>
  );
};

export default withStyles(useStyles)(UserProfileSettings);
