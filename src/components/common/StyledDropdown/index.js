import React from "react";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
import PropTypes from "prop-types";

import { useStyles } from "./styles";

const StyledDropdown = ({ labelTxt, list, value, onChange }) => {
  const classes = useStyles();

  return (
    <FormControl className={classes.formControl}>
      <NativeSelect value={value} onChange={onChange} name={labelTxt} className={classes.selectEmpty}>
        <option value="">{labelTxt}</option>
        <option value={10}>Ten</option>
        <option value={20}>Twenty</option>
        <option value={30}>Thirty</option>
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
