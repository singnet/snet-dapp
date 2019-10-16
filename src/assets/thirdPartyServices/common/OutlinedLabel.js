import React from "react";
import PropTypes from "prop-types";
import InfoIcon from "@material-ui/icons/Info";
import Tooltip from "@material-ui/core/Tooltip";

class OutlinedLabel extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const { infoTitle, value, htmlValue, variant, htmlTooltip } = this.props;

    return (
      <div style={{
          display: "flex",
          alignItems: "flex-start",
          textAlign: "left",
          width: "100%",
          backgroundColor: "none",
          padding: 6,
          borderColor: "#DDD",
          borderStyle: "solid",
          borderRadius: variant === "outlined" ? 5 : variant === "bottomLine" ? 0 : 0,
          borderTopWidth: variant === "outlined" ? 1 : 0,
          borderBottomWidth: variant === "outlined" || variant === "bottomLine" ? 1 : 0,
          borderLeftWidth: variant === "outlined" ? 1 : 0,
          borderRightWidth: variant === "outlined" ? 1 : 0,
        }}
      >

        <div style={{
          float: "left",
          height: "auto",
          width: "180px",
          backgroundColor: "none",
          display: "flex",
          alignItems: "flex-start",
          textAlign: "left",
        }}>
          {htmlTooltip ? (
              <Tooltip
                  title={
                      <React.Fragment>
                          {htmlTooltip}
                      </React.Fragment>
                  }
                  placement="top"
              >
                  <InfoIcon
                      style={{
                          color: "#D6D6D6",
                          "&:hover": {color: "#008BF9",},
                          verticalAlign: "middle"
                      }}
                  />
              </Tooltip>
          ) : null}
          {infoTitle ? (
            <span style={{ color: "#212121", marginLeft: htmlTooltip ? 7 : 3, paddingTop: 2 }}>{infoTitle}</span>
          ) : null}
        </div>

        <div style={{
          float: htmlTooltip ? "right" : "none",
          height: "auto",
          width: htmlTooltip ? `calc(100% - 180px)` : "100%",
          backgroundColor: "none",
          display: "flex",
          alignItems: "flex-start",
          textAlign: "left",
          paddingLeft: 10, paddingTop: 2
        }}
        >
          {htmlValue ? htmlValue : (<span style={{color: "#666"}}>{value}</span>)}
        </div>

      </div>
    );
  }
}

OutlinedLabel.propTypes = {
  infoTitle: PropTypes.string,
  value: PropTypes.string,
  htmlValue: PropTypes.instanceOf(Element),
  variant: PropTypes.oneOf(["none", "outlined", "bottomLine", "flat"]),
  htmlTooltip: PropTypes.instanceOf(Element),
};

OutlinedLabel.defaultProps = {
  variant: "none",
};

export default OutlinedLabel;
