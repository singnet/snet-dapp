import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/styles";

import { useStyles } from "./styles";

export const alertTypes = {
  ERROR: "error",
  SUCCESS: "success",
  WARNING: "warning",
};

const backgroundColor = {
  error: alertTypes.ERROR,
  success: alertTypes.SUCCESS,
  warning: alertTypes.WARNING,
};

const AlertBox = ({ classes, message, type }) => {
  if (message) {
    return <p className={clsx(classes.messageBox, classes[backgroundColor[type]])}>{message}</p>;
  }
  return null;
};

AlertBox.propTypes = {
  type: PropTypes.oneOf(Object.values(alertTypes)),
  message: PropTypes.string,
};

AlertBox.defaultProps = {
  type: "error",
};

export default withStyles(useStyles)(AlertBox);
