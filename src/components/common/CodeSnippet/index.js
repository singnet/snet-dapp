import React from "react";
import { withStyles } from "@material-ui/styles";

import FunctionText from "./FunctionText";
import Key from "./Key";
import ValueString from "./ValueString";
import ValueNumber from "./ValueNumber";

import { useStyles } from "./styles";

const CodeSnippet = ({ classes }) => {
  return (
    <div className={classes.codeSnippetContainer}>
      <FunctionText text={"FunctionText"} />
      <Key text={"Ket Text"} />
      <ValueString text={"Value String"} />
      <ValueNumber number={"Value Number"} />
    </div>
  );
};

export default withStyles(useStyles)(CodeSnippet);
