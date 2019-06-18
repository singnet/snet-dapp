import React from "react";

// Material UI imports
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  errorText: {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "rgba(208,2,27,0.2)",
    padding: "13px 20px",
    margin: "20px 0 !important",
    backgroundColor: "rgba(208,2,27,0.2)",
    color: "rgba(0,0,0,.6)",
    fontSize: "14px !important",
    fontFamily: theme.typography.secondary.main,
    textAlign: "left"
  }
}));

function ErrorMsgBox(props) {
  const classes = useStyles();
  return <p className={classes.errorText}>{props.errorMsg}</p>;
}

export default ErrorMsgBox;
