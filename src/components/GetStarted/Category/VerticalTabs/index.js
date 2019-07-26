import React, { Component } from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { withStyles } from "@material-ui/styles";

import { useStyles } from "./styles";

class VerticalTabs extends Component {
  render() {
    const { classes, activeIndex, handleChange, title } = this.props;

    var titles = title.map(label => {
      return <Tab label={label} />;
    });

    return (
      <div className={classes.VerticalTabsContainer}>
        <Tabs value={activeIndex} onChange={handleChange} className={classes.TabsWrapper}>
          {titles}
        </Tabs>
      </div>
    );
  }
}

export default withStyles(useStyles)(VerticalTabs);
