import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@mui/styles";
import Grid from "@mui/material/Grid";
import clsx from "clsx";
import isEmpty from "lodash/isEmpty";

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
        {!isEmpty(Icon) && <Icon />}
        <span>{message}</span>
      </Grid>
    </Grid>
  );
};

NotificationBar.propTypes = {
  type: PropTypes.oneOf(["WARNING", "INFORMATION"]),
  message: PropTypes.string,
  showNotification: PropTypes.bool,
  icon: PropTypes.object,
};

export default withStyles(useStyles)(NotificationBar);
