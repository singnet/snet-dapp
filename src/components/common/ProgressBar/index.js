import React from "react";
import { withStyles } from "@material-ui/styles";

import ProgressSection, { ProgressStatusList } from "./ProgressSection";
import { useStyles } from "./styles";

const ProgressBar = ({ classes, activeSection, progressText }) => {
  const computeProgressStatus = (progressNumber, activeSection) => {
    if (progressNumber < activeSection) {
      return ProgressStatusList.COMPLETED;
    }
    if (progressNumber === activeSection) {
      return ProgressStatusList.ACTIVE;
    }
    if (progressNumber > activeSection) {
      return ProgressStatusList.IDLE;
    }
  };

  return (
    <div className={classes.tabsContainer}>
      <ul>
        {progressText.map((text, index) => (
          <ProgressSection
            progressNumber={index + 1}
            progressText={text}
            progressStatus={computeProgressStatus(index + 1, activeSection)}
            key={text}
          />
        ))}
      </ul>
    </div>
  );
};

export default withStyles(useStyles)(ProgressBar);
