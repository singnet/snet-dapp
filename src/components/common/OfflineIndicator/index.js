import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/styles";
import clsx from "clsx";
import Icon from "@material-ui/core/Icon";

import { useStyles } from "./styles";

const OfflineIndicator = ({ classes, showIndicator = "true" }) => {
  if (showIndicator)
    return (
      <div className={classes.offlineIndicator}>
        <Icon className={clsx(classes.icon, "fas fa-exclamation")} />
        <span>Currently Offline</span>
      </div>
    );
};

export default withStyles(useStyles)(OfflineIndicator);
