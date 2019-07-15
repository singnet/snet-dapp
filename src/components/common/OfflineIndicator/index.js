import React from "react";
import { withStyles } from "@material-ui/styles";
import clsx from "clsx";
import Icon from "@material-ui/core/Icon";

import { useStyles } from "./styles";

const OfflineIndicator = ({ classes }) => {
  return (
    <div className={classes.offlineIndicator}>
      <Icon className={clsx(classes.icon, "fas fa-exclamation")} />
      <span>Currently Offline</span>
    </div>
  );
};

export default withStyles(useStyles)(OfflineIndicator);
