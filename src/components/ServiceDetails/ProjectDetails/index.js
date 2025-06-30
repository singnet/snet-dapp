import React from "react";
import { withStyles } from "@mui/styles";
import PropTypes from "prop-types";
import isEmpty from "lodash/isEmpty";

import { useStyles } from "./styles";
import ProjectURL from "./ProjectURL";
import Contributors from "./Contibutors";
import { Grid } from "@mui/material";
import Card from "../../common/Card";
import { useSelector } from "react-redux";

const ProjectDetails = ({ classes }) => {
  const {
    url: projectURL,
    contributors,
    org_id: orgId,
    service_id: serviceId,
  } = useSelector((state) => state.serviceDetailsReducer.details);

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
  classes: PropTypes.object,
};

export default withStyles(useStyles)(ProjectDetails);
