import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/styles";

import { useStyles } from "./styles";

const ErrorMsgBox = ({ classes, showErr, errorMsg }) => {
  if (showErr) {
    return <p className={classes.errorText}>{errorMsg}</p>;
  }
  return null;
};

ErrorMsgBox.propTypes = {
  showErr: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  errorMsg: PropTypes.string,
};

export default withStyles(useStyles)(ErrorMsgBox);
