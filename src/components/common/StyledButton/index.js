import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import clsx from "clsx";
import Icon from "@material-ui/core/Icon";

import { useStyles } from "./styles";

const buttonColor = {
  blue: "blueBg",
  gradient: "gradientBg",
  black: "blackBg",
  transparent: "transparentBg",
};

const StyledButton = props => {
  const classes = useStyles();

  return (
    <Button
      className={clsx(classes.styledButton, classes[buttonColor[props.type]])}
      disabled={props.disabled}
      onClick={props.onClick}
    >
      <Icon className={props.iconClass} />
      {props.btnText}
    </Button>
  );
};

StyledButton.propTypes = {
  type: PropTypes.oneOf(["blue", "gradient", "black", "transparent"]),
};

StyledButton.defaultProps = {
  type: "blue",
};

export default StyledButton;
