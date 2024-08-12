import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { withStyles } from "@mui/styles";

import { useStyles } from "./styles";

const VerticalTabs = ({ classes, activeIndex, handleChange, title }) => {
  const titles = title.map((tab) => <Tab key={tab.title} label={tab.title} />);

  return (
    <div className={classes.VerticalTabsContainer}>
      <Tabs value={activeIndex} onChange={handleChange} className={classes.TabsWrapper}>
        {titles}
      </Tabs>
    </div>
  );
};

export default withStyles(useStyles)(VerticalTabs);
