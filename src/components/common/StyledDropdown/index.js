import React from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import PropTypes from "prop-types";

import { useStyles } from "./styles";

const StyledDropdown = ({ labelTxt, list, value, onChange }) => {
  const classes = useStyles();

  return (
    <FormControl className={classes.formControl}>
      <InputLabel htmlFor="featured-label">{labelTxt}</InputLabel>
      <Select
        native
        value={value}
        onChange={onChange}
        inputProps={{
          name: "featured",
          id: "featured-label",
          placeholder: "labelTxt",
        }}
      >
        <option />
        {list.map(item => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
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
