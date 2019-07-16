import React from "react";
import PropTypes from "prop-types";
import { useStyles } from "./styles";

const ErrorMsgText = ({ error }) => {
  const classes = useStyles();

  if (error) {
    return <p className={classes.errorMsg}>{error}</p>;
  }
  return null;
};

ErrorMsgText.propTypes = {
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};

export default ErrorMsgText;
