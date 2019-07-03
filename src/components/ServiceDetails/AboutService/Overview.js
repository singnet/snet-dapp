import React from "react";
import { withStyles } from "@material-ui/styles";

import { useStyles } from "./styles";
import Tags from "./Tags";

const Overview = ({ classes, description, service_url, tags }) => {
  return (
    <div className={classes.overViewContainer}>
      <h3>Overview</h3>
      <p>{description}</p>
      <h4>Service URL</h4>
      <p>
        <a href={service_url}>{service_url}</a>
      </p>
      <Tags tags={tags} />
    </div>
  );
};

export default withStyles(useStyles)(Overview);
