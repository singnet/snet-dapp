import React from "react";
import { withStyles } from "@material-ui/styles";
import clsx from "clsx";
import Icon from "@material-ui/core/Icon";
import Grid from "@material-ui/core/Grid";

import StyledButton from "../StyledButton";
import { useStyles } from "./styles";

const NotificationBar = ({ classes, showNotification }) => {
  if (!showNotification) return null;
  return (
    <Grid container className={classes.NotificationBar}>
      <Grid item xs={12} sm={12} md={6} lg={6} className={classes.notificationText}>
        <Icon className={clsx(classes.icon, "fas fa-exclamation")} />
        <span>Service temporarily offline by the owner. Please check back later</span>
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6} className={classes.notificationActions}>
        <StyledButton type="transparent" btnText="Notified Me when Service is online" />
        <StyledButton type="transparent" btnText="Submit Feedback" />
      </Grid>
    </Grid>
  );
};

export default withStyles(useStyles)(NotificationBar);
