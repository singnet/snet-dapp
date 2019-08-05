import React from "react";
import { withStyles } from "@material-ui/styles";

import { useStyles } from "./styles";

const ProjectDetails = ({ classes, projectURL }) => {
  return (
    <div className={classes.projectDetailsContainer}>
      <h3>Project Details</h3>
      <div className={classes.projectDetailsContent}>
        <h5>Project URL</h5>
        <a href={projectURL} target="_blank" rel="noopener noreferrer" alt="URL">
          {projectURL}
        </a>
      </div>
    </div>
  );
};

export default withStyles(useStyles)(ProjectDetails);
