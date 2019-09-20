import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/styles";

import FeatureMedia from "./FeatureMedia";
import VerticalTabs from "./VerticalTabs";
import { useStyles } from "./styles";

const Category = ({ classes, icon: Icon, title, description, tabs, rightAlign }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleChange = (event, selectedTabIndex) => {
    setActiveIndex(selectedTabIndex);
  };

  const activeFeatureMedia = () => {
    if (tabs[activeIndex]) {
      return tabs[activeIndex].media;
    }
    return {};
  };

  return (
    <Grid
      container
      spacing={24}
      className={`${classes.CategoryWrapper} ${rightAlign ? classes.reverseDirection : null}`}
    >
      <Grid item xs={12} sm={6} md={6} lg={6} className={classes.CategoryContent}>
        <div className={classes.Title}>
          <Icon />
          <h3>{title}</h3>
        </div>
        <p>{description}</p>
        <VerticalTabs activeIndex={activeIndex} handleChange={handleChange} title={tabs} />
      </Grid>
      <Grid item xs={12} sm={6} md={6} lg={6} className={classes.CategoryMedia}>
        <FeatureMedia media={activeFeatureMedia()} />
      </Grid>
    </Grid>
  );
};

export default withStyles(useStyles)(Category);
