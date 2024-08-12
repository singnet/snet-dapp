import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { withStyles } from "@mui/styles";

import { useStyles } from "./styles";
import AlertLink from "./AlertLink";

export const alertTypes = {
  ERROR: "error",
  SUCCESS: "success",
  WARNING: "warning",
  INFO: "info",
};

const backgroundColor = {
  error: alertTypes.ERROR,
  success: alertTypes.SUCCESS,
  warning: alertTypes.WARNING,
  info: alertTypes.INFO,
};

const AlertBox = ({ classes, message, type = alertTypes.ERROR, link }) => {
  if (message) {
    return (
      <p className={clsx(classes.messageBox, classes[backgroundColor[type]])}>
        {message} <AlertLink link={link} />
      </p>
    );
  }
  return null;
};

AlertBox.propTypes = {
  type: PropTypes.oneOf(["error", "success", "warning", "info"]),
  message: PropTypes.string,
};

export default withStyles(useStyles)(AlertBox);
