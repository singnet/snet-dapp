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
  red: "red",
};

const StyledButton = ({ disabled, onClick, type, iconClass, btnText }) => {
  const classes = useStyles();

  return (
    <Button className={clsx(classes.styledButton, classes[buttonColor[type]])} disabled={disabled} onClick={onClick}>
      <Icon className={iconClass} />
      {btnText}
    </Button>
  );
};

StyledButton.propTypes = {
  type: PropTypes.oneOf(["blue", "gradient", "black", "transparent", "red"]),
};

StyledButton.defaultProps = {
  type: "blue",
};

export default StyledButton;
