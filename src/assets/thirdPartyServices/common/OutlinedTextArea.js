import React from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import InfoIcon from "@material-ui/icons/Info";
import Tooltip from "@material-ui/core/Tooltip";

class OutlinedTextArea extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.inputRef = React.createRef();
  }

  render() {
    const {
      id,
      label,
      name,
      type,
      value,
      min,
      max,
      helperTxt,
      multiline,
      rows,
      fullWidth,
      htmlTooltip,
      charLimit,
      onChange,
      onFocus,
      ref,
    } = this.props;

    return (
      <div style={{ width: "100%" }}>
        {htmlTooltip ? (
          <div style={{ paddingTop: 29, textAlign: "right", width: "25px", float: "left" }}>
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
            name={name}
            type={type}
            inputRef={this.inputRef}
            label={label ? label : null}
            value={value}
            multiline={multiline ? multiline : rows > 1 ? true : false}
            rows={rows ? rows : null}
            variant="outlined"
            margin="normal"
            fullWidth={fullWidth ? fullWidth : true}
            onChange={onChange}
            onFocus={onFocus}
            helperText={helperTxt ? helperTxt : null}
            inputProps={{
              maxLength: charLimit ? charLimit : 5000,
              min: typeof(min) === "number" ? min : null,
              max: typeof(max) === "number" ? max : null,
            }}
            ref={ref}
          />
        </div>
      </div>
    );
  }
}

OutlinedTextArea.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  min: PropTypes.number,
  max: PropTypes.number,
  multiline: PropTypes.bool,
  rows: PropTypes.number,
  fullWidth: PropTypes.bool,
  charLimit: PropTypes.number,
  helperTxt: PropTypes.string,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  htmlTooltip: PropTypes.instanceOf(Element),
  ref: PropTypes.any,
};

export default OutlinedTextArea;
