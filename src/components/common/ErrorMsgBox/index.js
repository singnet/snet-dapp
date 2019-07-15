import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/styles";

import { useStyles } from "./styles";

const ErrorMsgBox = ({ classes, errorMsg }) => {
  if (errorMsg) {
    return <p className={classes.errorText}>{errorMsg}</p>;
  }
  return null;
};

ErrorMsgBox.propTypes = {
  errorMsg: PropTypes.string,
};

export default withStyles(useStyles)(ErrorMsgBox);
