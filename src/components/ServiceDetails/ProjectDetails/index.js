import React from "react";
import { withStyles } from "@material-ui/styles";
import PropTypes from "prop-types";

import { useStyles } from "./styles";
import ProjectURL from "./ProjectURL";
import Contributors from "./Contibutors";

const ProjectDetails = ({ classes, projectURL, contributors }) => {
  return (
    <div className={classes.projectDetailsContainer}>
      <h3>Project Details</h3>
      <ProjectURL URL={projectURL} />
      <Contributors contributors={contributors} />
    </div>
  );
};

ProjectDetails.propTypes = {
  projectURL: PropTypes.string,
  contributors: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      email_id: PropTypes.string,
    })
  ),
};

export default withStyles(useStyles)(ProjectDetails);
