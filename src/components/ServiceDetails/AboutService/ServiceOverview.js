import React from "react";
import { withStyles } from "@material-ui/styles";

import { useStyles } from "./styles";
import Tags from "./Tags";

const ServiceOverview = ({ classes, description, service_url, tags }) => {
  return (
    <div className={classes.overViewContainer}>
      <h3>Overview</h3>
      <p>{description}</p>
      <Tags className={classes.tagsContainer} tags={tags} />
    </div>
  );
};

export default withStyles(useStyles)(ServiceOverview);
