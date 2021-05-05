import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import clsx from "clsx";
import isEmpty from "lodash/isEmpty";
import CloseIcon from "@material-ui/icons/Close";

import { useStyles } from "./styles";

export const notificationBarTypes = {
  WARNING: "WARNING",
  INFORMATION: "INFORMATION",
  UPDATE: "UPDATE",
};

const NotificationBar = ({ classes, showNotification, icon: Icon, message, type, showCloseButton, onCloseClick }) => {
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
        {showCloseButton ? <CloseIcon className={classes.closeIcon} onClick={onCloseClick} /> : null}
      </Grid>
    </Grid>
  );
};

NotificationBar.propTypes = {
  type: PropTypes.oneOf(["WARNING", "INFORMATION", "UPDATE"]),
  message: PropTypes.string,
  showNotification: PropTypes.bool,
  icon: PropTypes.object,
  showCloseButton: PropTypes.bool,
  onCloseClick: PropTypes.func,
};

export default withStyles(useStyles)(NotificationBar);
