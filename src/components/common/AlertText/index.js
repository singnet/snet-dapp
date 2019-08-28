import React from "react";
import PropTypes from "prop-types";
import { useStyles } from "./styles";
import { alertTypes } from "../AlertBox";

const AlertText = ({ type, message, inline }) => {
  const classes = useStyles();

  if (message) {
    return <p className={classes.errorMsg}>{message}</p>;
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
