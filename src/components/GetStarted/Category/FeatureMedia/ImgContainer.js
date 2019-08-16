import React from "react";

import DummyGetStarted from "../../../../assets/images/DummyGetStarted.png";

const ImgContainer = ({ content, classes }) => {
  return <img src={DummyGetStarted} alt="DummyImage" className={classes.FullWidth} />;
};

export default ImgContainer;
