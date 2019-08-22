import React from "react";
import { withStyles } from "@material-ui/styles";

import { useStyles } from "./styles";
import DummyGetStarted from "../../../../assets/images/DummyGetStarted.png";

const ImgContainer = ({ content, classes }) => {
  return <img src={content || DummyGetStarted} alt="DummyImage" className={classes.FullWidth} />;
};

export default withStyles(useStyles)(ImgContainer);
