import React from "react";
import { Icon } from "@material-ui/core";

import { useStyles } from "./styles";
import { ProgressStatusList } from "./";

const StatusToggler = ({ progressNumber, progressStatus }) => {
  const classes = useStyles();

  if (progressStatus === ProgressStatusList.COMPLETED) {
    return (
      <span className={classes.completedIcon}>
        <Icon className="fas fa-check-circle" />
      </span>
    );
  }
  return <span className={classes.number}>{progressNumber}</span>;
};

export default StatusToggler;
