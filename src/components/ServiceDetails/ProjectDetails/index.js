import React from "react";
import { withStyles } from "@mui/styles";
import PropTypes from "prop-types";
import isEmpty from "lodash/isEmpty";

import { useStyles } from "./styles";
import ProjectURL from "./ProjectURL";
import Contributors from "./Contibutors";
import { Grid } from "@mui/material";
import Card from "../../common/Card";

const ProjectDetails = ({ classes, projectURL, contributors, orgId, serviceId }) => {
  const data = [
    { label: "Project URL", value: <ProjectURL URL={projectURL} /> },
    { label: "Organization ID", value: orgId },
    { label: "Service ID", value: serviceId },
  ];

  if (!isEmpty(contributors)) {
    const contributorsRow = { label: "Contributors", value: <Contributors contributors={contributors} /> };
    data.push(contributorsRow);
  }

  return (
    <Card
      header="Project Details"
      children={
        <div className={classes.projectDetailsContainer}>
          {data.map((dataRow) => (
            <Grid container alignItems="center" key={dataRow.label}>
              <Grid item sm={5} xs={12}>
                <h5>{dataRow.label}</h5>
              </Grid>
              <Grid item sm={7} xs={12} className={classes.projectDetailsValue}>
                <span>{dataRow.value}</span>
              </Grid>
            </Grid>
          ))}
        </div>
      }
    />
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
