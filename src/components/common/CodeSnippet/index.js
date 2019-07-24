import React from "react";
import { withStyles } from "@material-ui/styles";

import { useStyles } from "./styles";

const CodeSnippet = ({ classes, children }) => {
  return <div className={classes.codeSnippetContainer}>{children}</div>;
};

export default withStyles(useStyles)(CodeSnippet);
