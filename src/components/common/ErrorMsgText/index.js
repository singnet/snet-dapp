import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { useStyles } from "./styles";

const ErrorMsgText = ({ error }) => {
  const classes = useStyles();
  return <Fragment>{error ? <p className={classes.errorMsg}>{error}</p> : null}</Fragment>;
};

ErrorMsgText.propTypes = {
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};

export default ErrorMsgText;
