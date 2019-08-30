import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import { useStyles } from "./styles";
import { alertTypes } from "../AlertBox";

const textColor = {
  error: alertTypes.ERROR,
  success: alertTypes.SUCCESS,
  warning: alertTypes.WARNING,
  info: alertTypes.INFO,
};

const AlertText = ({ type, message, inline }) => {
  const classes = useStyles();

  if (message) {
    return <p className={clsx(classes.errorMsg, classes[textColor[type]])}>{message}</p>;
  }
  return null;
};

AlertText.propTypes = {
  message: PropTypes.string,
  type: PropTypes.oneOf([...Object.values(alertTypes)]),
  inline: PropTypes.bool,
};

AlertText.defaultProps = {
  type: "error",
};

export default AlertText;
