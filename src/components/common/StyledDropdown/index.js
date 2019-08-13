import React from "react";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
import PropTypes from "prop-types";

import { useStyles } from "./styles";

const StyledDropdown = ({ labelTxt, list, value, onChange, formControlProps, nativeSelectProps }) => {
  const classes = useStyles();

  return (
    <FormControl className={classes.formControl} {...formControlProps}>
      <NativeSelect
        value={value}
        onChange={onChange}
        name={labelTxt}
        className={classes.selectEmpty}
        {...nativeSelectProps}
      >
        <option value="">{labelTxt}</option>
        {list.map(item => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </NativeSelect>
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
