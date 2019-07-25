import React, { Component } from 'react';
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { withStyles } from '@material-ui/styles';

import FeatureMedia from "../FeatureMedia";
import { useStyles } from "./styles";


class VerticalTabs extends Component {
  render() {
    const { classes, activeIndex, handleChange } = this.props;
    return (
      <div className={classes.VerticalTabsContainer}>
        <Tabs
          value={activeIndex}
          onChange={handleChange}
          className={classes.TabsWrapper}
        >
          <Tab label='List or Card views' />
          <Tab label='Change Filter options' />
          <Tab label='Sort options' />
          <Tab label='Rating Ranking' />
          <Tab label='Feature Label 5' />
        </Tabs>       
    </div>
    )
  }
}

export default withStyles(useStyles)(VerticalTabs);