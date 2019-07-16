import React, { Fragment } from "react";

import ProgressBar from "../common/ProgressBar";

const OnboardingContainer = ({ item, classes, active, activeSection, progressText }) => {
  if (!active) {
    return null;
  }
  return (
    <Fragment>
      <div className={classes.topSection}>
        <h2>{item.title}</h2>
        <span> {item.description}</span>
      </div>
      <ProgressBar activeSection={activeSection} progressText={progressText} />
      {item.component}
    </Fragment>
  );
};

export default OnboardingContainer;
