import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import TextField from "@material-ui/core/TextField";

import { useStyles } from "./styles";

class StyledTextField extends Component {
  state = { name: "" };

  render() {
    const { classes, className } = this.props;
    const { name } = this.state;

    const handleChange = name => event => {
      this.setState({
        name: event.target.value,
      });
    };

    return (
      <TextField
        id="outlined-name"
        label={this.props.label}
        className={`${classes.styledTextField} ${className}`}
        value={name}
        onChange={handleChange("name")}
        margin="normal"
        variant="outlined"
        {...this.props}
      />
    );
  }
}

export default withStyles(useStyles)(StyledTextField);
