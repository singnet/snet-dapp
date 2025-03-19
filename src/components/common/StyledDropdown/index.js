import React from "react";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import PropTypes from "prop-types";

import { useStyles } from "./styles";

const StyledDropdown = ({ labelTxt, name, list, value, onChange, formControlProps, inputLabel, disabled }) => {
  const classes = useStyles();
  if (!list) {
    return null;
  }

  return (
    <FormControl variant="outlined" className={classes.formControl} {...formControlProps}>
      {inputLabel && <InputLabel htmlFor="age-simple">{inputLabel}</InputLabel>}
      <Select
        value={value || ""}
        onChange={onChange}
        name={name}
        MenuProps={{ disableScrollLock: true }}
        variant="outlined"
        disabled={disabled}
        className={classes.selectEmpty}
      >
        {labelTxt && <MenuItem value="default">{labelTxt}</MenuItem>}
        {list.map((item) => (
          <MenuItem key={item.value} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

StyledDropdown.propTypes = {
  inputLabel: PropTypes.string,
  labelTxt: PropTypes.string,
  list: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      label: PropTypes.string,
    })
  ),
  onChange: PropTypes.func,
};

export default StyledDropdown;
