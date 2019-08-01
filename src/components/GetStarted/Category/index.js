import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/styles";

import FeatureMedia from "./FeatureMedia";
import VerticalTabs from "./VerticalTabs";
import { useStyles } from "./styles";

const Category = ({ classes, icon: Icon, title, description, tabs }) => {
  const [activeIndex, setActiveIndex] = useState();

  const handleChange = event => {
    setActiveIndex(event.target.value);
  };

  return (
    <Grid container spacing={24} className={classes.CategoryWrapper}>
      <Grid item xs={12} sm={12} md={6} lg={6} className={classes.CategoryContent}>
        <div className={classes.Title}>
          <Icon />
          <h3>{title}</h3>
        </div>
        <p>{description}</p>
        <VerticalTabs activeIndex={activeIndex} handleChange={handleChange} title={tabs} />
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6} className={classes.CategoryMedia}>
        <FeatureMedia content={tabs[activeIndex].media} />
      </Grid>
    </Grid>
  );
};

export default withStyles(useStyles)(Category);
