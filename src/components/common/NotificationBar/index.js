import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import clsx from "clsx";

import { useStyles } from "./styles";

export const notificationBarTypes = {
  WARNING: "WARNING",
  INFORMATION: "INFORMATION",
};

const NotificationBar = ({ classes, showNotification, icon: Icon, message, type }) => {
  if (!showNotification) return null;
  return (
    <Grid container className={classes.NotificationBar}>
      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        lg={12}
        className={clsx(classes.notificationText, classes[notificationBarTypes[type]])}
      >
        <Icon />
        <span>{message}</span>
      </Grid>
    </Grid>
  );
};

NotificationBar.propTypes = {
  type: PropTypes.oneOf(["warning", "information"]),
};

export default withStyles(useStyles)(NotificationBar);
