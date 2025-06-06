import React from "react";
import { withStyles } from "@mui/styles";
import clsx from "clsx";
import Icon from "@mui/material/Icon";
import PropTypes from "prop-types";

import { useStyles } from "./styles";

const OfflineIndicator = ({ classes, show }) => {
  if (show) {
    return (
      <div className={classes.offlineIndicator}>
        <Icon className={clsx(classes.icon, "fas fa-exclamation")} />
        <span>Currently Offline</span>
      </div>
    );
  }
  return null;
};

OfflineIndicator.propTypes = {
  show: PropTypes.bool,
};

export default withStyles(useStyles)(OfflineIndicator);
