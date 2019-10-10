import React from "react";
import { withStyles } from "@material-ui/styles";
import TextField from "@material-ui/core/TextField";

import { useStyles } from "./styles";

const StyledTextField = ({ classes, className, label, handleChange, value, ...restProps }) => {
  return (
    <TextField
      id="outlined-name"
      label={label}
      className={`${classes.styledTextField} ${className}`}
      value={value}
      onChange={handleChange}
      margin="normal"
      variant="outlined"
      {...restProps}
    />
  );
};

export default withStyles(useStyles)(StyledTextField);
