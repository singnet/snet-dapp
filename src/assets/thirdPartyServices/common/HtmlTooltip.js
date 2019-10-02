import React from "react";
import PropTypes from "prop-types";
import Tooltip from "@material-ui/core/Tooltip/index";
import InfoIcon from "@material-ui/icons/Info";

class HtmlTooltip extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.inputRef = React.createRef();
  }

  render() {
    const { placement, children } = this.props;

    return (
      <Tooltip
        title={
          <React.Fragment>
            {children}
          </React.Fragment>
        }
        placement={placement}
      >
        <InfoIcon style={{
          color: "#D6D6D6",
          "&:hover": {color: "#008BF9",},
          verticalAlign: "middle"
        }}/>
      </Tooltip>
    );
  }
}

HtmlTooltip.propTypes = {
  placement: PropTypes.oneOf(["top", "right", "bottom", "left"]),
};

HtmlTooltip.defaultProps = {
  placement: "top",
};

export default HtmlTooltip;
