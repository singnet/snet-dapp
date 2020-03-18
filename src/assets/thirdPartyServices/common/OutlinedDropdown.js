import React from "react";
import PropTypes from "prop-types";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import InfoIcon from "@material-ui/icons/Info";
import Tooltip from "@material-ui/core/Tooltip";

class OutlinedDropDown extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const { id, label, name, helperTxt, fullWidth, htmlTooltip, list, value, onChange } = this.props;

    return (
      <div style={{ width: "100%" }}>
        {htmlTooltip ? (
          <div style={{ paddingTop: 33, textAlign: "right", width: "25px", float: "left" }}>
            <Tooltip title={<React.Fragment>{htmlTooltip}</React.Fragment>} placement="top">
              <InfoIcon
                style={{
                  color: "#D6D6D6",
                  "&:hover": { color: "#008BF9" },
                  verticalAlign: "middle",
                }}
              />
            </Tooltip>
          </div>
        ) : null}

        <div
          style={{
            width: htmlTooltip ? `calc(100% - 25px)` : "100%",
            float: htmlTooltip ? "right" : "none",
          }}
        >
          <TextField
            id={id}
            select
            name={name}
            label={label ? label : null}
            value={value}
            style={{ width: fullWidth ? "100%" : "auto" }}
            onChange={onChange}
            helperText={helperTxt ? helperTxt : null}
            margin="normal"
            variant="outlined"
          >
            {list ? (
              list.map(option => {
                return (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                );
              })
            ) : (
              <MenuItem key={0} value={0}>
                Items not found
              </MenuItem>
            )}
          </TextField>
        </div>
        <span style={{ clear: "both" }} />
      </div>
    );
  }
}

OutlinedDropDown.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  helperTxt: PropTypes.string,
  value: PropTypes.string,
  list: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      label: PropTypes.string,
    })
  ),
  onChange: PropTypes.func,
  htmlTooltip: PropTypes.instanceOf(Element),
  fullWidth: PropTypes.bool,
};

export default OutlinedDropDown;
