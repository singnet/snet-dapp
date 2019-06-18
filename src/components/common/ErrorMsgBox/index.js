import React, { Component, Fragment } from "react";
// material ui imports
import { withStyles } from "@material-ui/styles";

const useStyles = theme => ({
  errorText: {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: theme.backgroundColor.red,
    padding: "13px 20px",
    backgroundColor: theme.backgroundColor.red,
    color: theme.palette.text.gray2,
    fontSize: "14px !important",
    fontFamily: theme.typography.secondary.main,
    textAlign: "left"
  }
});

class ErrorMsgBox extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        {this.props.showErr ? (
          <p className={classes.errorText}>{this.props.errorMsg}</p>
        ) : null}
      </Fragment>
    );
  }
}

export default withStyles(useStyles)(ErrorMsgBox);
