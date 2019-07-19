import React from "react";
import { withStyles } from "@material-ui/styles";

import Function from "./Function";
import Key from "./Key";
import ValueString from "./ValueString";
import ValueNumber from "./ValueNumber";

import { useStyles } from "./styles";

const CodeSnippet = ({ classes, children }) => {
  return (
    <div className={classes.codeSnippetContainer}>
      {children}
      {/* <Function text={"FunctionText"} />
      <Key text={"Ket Text"} />
      <ValueString text={"Value String"} />
      <ValueNumber number={"Value Number"} /> */}
    </div>
  );
};

export default withStyles(useStyles)(CodeSnippet);
