import React from "react";
import { withStyles } from "@material-ui/styles";
import PropTypes from "prop-types";

import ProgressSection, { ProgressStatusList } from "./ProgressSection";
import { status } from "../../../utility/constants/Status";
import { useStyles } from "./styles";

const ProgressBar = ({ classes, activeSection, progressText }) => {
  const computeProgressStatus = (progressNumber, activeSection, progressStatus) => {
    if (progressNumber < activeSection || progressStatus === status.SUCCESS) {
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
            progressText={text.label}
            progressStatus={computeProgressStatus(index + 1, activeSection, text.status)}
            key={text}
          />
        ))}
      </ul>
    </div>
  );
};

ProgressBar.propTypes = {
  activeSection: PropTypes.number,
  progressText: PropTypes.arrayOf(PropTypes.string),
};

export default withStyles(useStyles)(ProgressBar);
