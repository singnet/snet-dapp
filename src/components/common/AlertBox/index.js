import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/styles";

import { useStyles } from "./styles";

const backgroundColor = {
  error: "error",
  success: "success",
};

const AlertBox = ({ classes, message, type }) => {
  if (message) {
    return <p className={clsx(classes.messageBox, classes[backgroundColor[type]])}>{message}</p>;
  }
  return null;
};

AlertBox.propTypes = {
  type: PropTypes.oneOf(["error", "success"]),
  message: PropTypes.string,
};

AlertBox.defaultProps = {
  type: "error",
};

export default withStyles(useStyles)(AlertBox);
