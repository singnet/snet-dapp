import React from "react";
import Typography from "@material-ui/core/Typography";
import { Tooltip, IconButton } from "@material-ui/core";
import PropTypes from "prop-types";
import { blue, grey } from "@material-ui/core/colors";

export default class HoverIcon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false,
    };
    this.renderIconButton = this.renderIconButton.bind(this);
  }

  renderIconButton() {
    let { children } = this.props;
    return (
      <IconButton
        onMouseEnter={function() {
          this.setState({ hover: true });
        }.bind(this)}
        onMouseLeave={function() {
          this.setState({ hover: false });
        }.bind(this)}
        style={this.state.hover ? { color: this.props.onColor } : { color: this.props.offColor }}
        target="_blank"
        href={this.props.href}
      >
        {children}
      </IconButton>
    );
  }

  render() {
    return this.props.text ? (
      <Tooltip
        title={
          <Typography
            style={{
              fontFamily: this.props.fontFamily,
              fontSize: this.props.fontSize,
              color: this.props.textColor,
            }}
          >
            {this.props.text}
          </Typography>
        }
      >
        {this.renderIconButton()}
      </Tooltip>
    ) : (
      this.renderIconButton()
    );
  }
}

HoverIcon.propTypes = {
  text: PropTypes.string,
  textColor: PropTypes.string,
  fontFamily: PropTypes.string,
  fontSize: PropTypes.number,
  href: PropTypes.string,
  onColor: PropTypes.string,
  offColor: PropTypes.string,
};

HoverIcon.defaultProps = {
  text: null,
  fontFamily: "Muli",
  fontSize: 14,
  textColor: "white",
  onColor: blue[500],
  offColor: grey[600],
};
