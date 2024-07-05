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
  transparentBlueBorder: "transparentBlueBorder",
  transparentBlueBorderDisable: "transparentBlueBorderDisable",
  red: "red",
  redBg: "redBg",
  whiteBorder: "whiteBorder",
};

const StyledButton = ({ disabled, onClick, type, btnType, iconClass, href, newTab, btnText, ...rest }) => {
  const classes = useStyles();

  return (
    <Button
      className={clsx(classes.styledButton, classes[buttonColor[type || "blue"]])}
      disabled={disabled}
      onClick={onClick}
      type={btnType || "button"}
      href={href}
      target={href && newTab ? "_blank" : ""}
      rel={href && newTab ? "noopener" : ""}
      {...rest}
    >
      {iconClass ? <Icon className={iconClass} /> : null}
      {btnText}
    </Button>
  );
};

StyledButton.propTypes = {
  type: PropTypes.oneOf([
    "blue",
    "gradient",
    "black",
    "transparent",
    "red",
    "redBg",
    "transparentBlueBorder",
    "transparentBlueBorderDisable",
    "whiteBorder",
  ]),
  btnType: PropTypes.oneOf(["submit", "reset", "button"]),
  btnText: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  iconClass: PropTypes.string,
  href: PropTypes.string,
  newTab: PropTypes.bool,
};

export default StyledButton;
