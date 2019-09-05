import React from "react";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import PropTypes from "prop-types";

import { useStyles } from "./styles";

const StyledDropdown = ({ labelTxt, list, value, onChange, formControlProps, inputLabel }) => {
  const classes = useStyles();

  return (
    <FormControl className={classes.formControl} {...formControlProps}>
      {inputLabel ? <InputLabel htmlFor="age-simple">{inputLabel}</InputLabel> : null}
      <Select value={value} onChange={onChange} name={labelTxt} className={classes.selectEmpty}>
        <MenuItem value="default">Select a value</MenuItem>
        {list &&
          list.map(item => (
            <MenuItem key={item.value} value={item.value}>
              {item.label}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
};

StyledDropdown.propTypes = {
  labelTxt: PropTypes.string,
  list: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      label: PropTypes.string,
    })
  ),
};

StyledDropdown.defaultProps = {
  labelTxt: "",
};

export default StyledDropdown;
