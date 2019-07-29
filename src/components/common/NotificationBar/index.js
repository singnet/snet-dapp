import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import clsx from "clsx";

import { useStyles } from "./styles";

const notificationBar = {
	warning: 'warning',
	information: 'information'
}

const NotificationBar = ({ classes, showNotification, icon: Icon, notificationText, type }) => {
  if (!showNotification) return null;
  return (
    <Grid container className={classes.NotificationBar}>
      <Grid item xs={12} sm={12} md={12} lg={12} className={clsx(classes.notificationText, classes[notificationBar[type]])}>
        <Icon />
        <span>{notificationText}</span>
      </Grid>
    </Grid>
  );
};

NotificationBar.propTypes = {
	type: PropTypes.oneOf(["warning", "information"])
}

export default withStyles(useStyles)(NotificationBar);
