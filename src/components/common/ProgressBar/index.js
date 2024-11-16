import React from "react";
import { withStyles } from "@mui/styles";
import PropTypes from "prop-types";

import ProgressSection, { ProgressStatusList } from "./ProgressSection";
import { useStyles } from "./styles";

export const progressTabStatus = { SUCCESS: "SUCCESS" };

const ProgressBar = ({ classes, activeSection, progressText }) => {
  const computeProgressStatus = (progressNumber, activeSection, progressStatus) => {
    if (progressNumber < activeSection || progressStatus === progressTabStatus.SUCCESS) {
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
            key={index}
            progressNumber={index + 1}
            progressText={text.label}
            progressStatus={computeProgressStatus(index + 1, activeSection, text.status)}
          />
        ))}
      </ul>
    </div>
  );
};

ProgressBar.propTypes = {
  activeSection: PropTypes.number,
  progressText: PropTypes.arrayOf(PropTypes.object),
};

export default withStyles(useStyles)(ProgressBar);
