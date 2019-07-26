import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/styles";

import FeatureMedia from "./FeatureMedia";
import VerticalTabs from "./VerticalTabs";
import { useStyles } from "./styles";

class Category extends Component {
  state = { activeIndex: 0 };

  handleChange = (_, activeIndex) => this.setState({ activeIndex });

  render() {
    const { activeIndex } = this.state;
    const { classes, icon: Icon, title, description, tabsTitle, tabsContent } = this.props;

    return (
      <Grid container spacing={24} className={classes.CategoryWrapper}>
        <Grid item xs={12} sm={12} md={6} lg={6} className={classes.CategoryContent}>
          <div className={classes.Title}>
            <Icon />
            <h3>{title}</h3>
          </div>
          <p>{description}</p>
          <VerticalTabs activeIndex={activeIndex} handleChange={this.handleChange} title={tabsTitle} />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} className={classes.CategoryMedia}>
          <FeatureMedia activeIndex={activeIndex} content={tabsContent} />
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(useStyles)(Category);
