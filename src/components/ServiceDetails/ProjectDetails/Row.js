import React from "react";
import { withStyles } from "@mui/styles";

import { useStyles } from "./styles";

const Row = ({ header, content, className }) => {
  return (
    <div className={className}>
      {header ? <h5>{header}</h5> : null}
      <div>{content}</div>
    </div>
  );
};

export default withStyles(useStyles)(Row);
