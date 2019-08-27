import React from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { withStyles } from "@material-ui/styles";

import { useStyles } from "./styles";

const VerticalTabs = ({ classes, activeIndex, handleChange, title }) => {
  const titles = title.map(tab => <Tab key={tab.title} label={tab.title} />);

  return (
    <div className={classes.VerticalTabsContainer}>
      <Tabs value={activeIndex} onChange={handleChange} className={classes.TabsWrapper}>
        {titles}
      </Tabs>
    </div>
  );
};

export default withStyles(useStyles)(VerticalTabs);
