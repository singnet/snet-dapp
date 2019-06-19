import React from "react";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  number: {
    borderRadius: 25,
    padding: "3px 10px",
    marginRight: 10,
    backgroundColor: theme.palette.text.secondary,
    color: theme.palette.text.white
  },
  TabTitle: {
    color: theme.palette.text.secondary,
    fontSize: 14,
    fontFamily: theme.typography.secondary.main
  }
}));

export const ProgressStatusList = {
  IDLE: "idle",
  ACTIVE: "active",
  COMPLETED: "completed"
};

const ProgressSection = ({ progressNumber, progressText, progressStatus }) => {
  console.log(progressText, progressStatus);
  const classes = useStyles();
  return (
    <li>
      {progressStatus === ProgressStatusList.COMPLETED ? (
        <span>
          <i className="fas fa-check-circle"></i>
        </span>
      ) : (
        <span className={classes.number}>{progressNumber}</span>
      )}
      <span className={classes.TabTitle}>{progressText}</span>
    </li>
  );
};

ProgressSection.propTypes = {
  progressNumber: PropTypes.number.isRequired,
  progressText: PropTypes.string.isRequired,
  progressStatus: PropTypes.oneOf(Object.values(ProgressStatusList))
};

export default ProgressSection;
