import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/styles";
import clsx from "clsx";
import Icon from "@material-ui/core/Icon";

import { useStyles } from "./styles";

const OfflineIndicator = ({ isOffline }) => {
  if (isOffline) {
    return (
      <div>
        <Icon className={clsx(classes.icon, "fa fa-search")} />
        <span>Currently Offline</span>
      </div>
    );
  }
  return null;
};

export default withStyles(useStyles)(OfflineIndicator);
