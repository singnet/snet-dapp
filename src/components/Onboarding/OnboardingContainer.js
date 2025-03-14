import React from "react";

import ProgressBar from "../common/ProgressBar";

const OnboardingContainer = ({ item, classes, active, activeSection, progressText }) => {
  if (!active) {
    return null;
  }
  return (
    <div className={classes.onboardingComponentsContainer}>
      <div className={classes.topSection}>
        <h2>{item.title}</h2>
        {item.description}
      </div>
      <ProgressBar activeSection={activeSection} progressText={progressText} />
      {item.component}
    </div>
  );
};

export default OnboardingContainer;
