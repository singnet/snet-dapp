import React from "react";
import { withStyles } from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import isEmpty from "lodash/isEmpty";

import { useStyles } from "./styles";
import ProjectURL from "./ProjectURL";
import Contributors from "./Contibutors";

const ProjectDetails = ({ classes, projectURL, contributors, orgId, serviceId }) => {
  return (
    <div className={classes.projectDetailsContainer}>
      <h2>Project Details</h2>
      <Grid container>
        <Grid item lg={5} md={7} sm={7} className={classes.projectDetailsHeadings}>
          <h5>Project URL</h5>
          <h5>Organization ID</h5>
          <h5>Service ID</h5>
          {!isEmpty(contributors) ? <h5>Contributors</h5> : null}
        </Grid>
        <Grid item lg={7} md={5} sm={5} className={classes.projectDetailsValue}>
          <ProjectURL URL={projectURL} />
          <span className={classes.orgIdValue}>{orgId}</span>
          <span className={classes.serviceIdValue}>{serviceId}</span>
          <Contributors contributors={contributors} />
        </Grid>
      </Grid>
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
