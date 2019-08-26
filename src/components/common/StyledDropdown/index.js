import React from "react";
import FormControl from "@material-ui/core/FormControl";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem'
import PropTypes from "prop-types";

import { useStyles } from "./styles";

const StyledDropdown = ({ labelTxt, list, value, onChange, formControlProps, nativeSelectProps }) => {
  const classes = useStyles();

  return (
    <FormControl className={classes.formControl} {...formControlProps}>
        <Select
          value={value}
          onChange={onChange}
          name={labelTxt}
          className={classes.selectEmpty}
        >
          <MenuItem value="">None</MenuItem>
          {list.map(item => (
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
  list: [{ value: "", label: "" }],
};

export default StyledDropdown;
