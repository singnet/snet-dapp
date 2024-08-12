import React from "react";
import Grid from "@mui/material/Grid";
import { withStyles } from "@mui/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import { useStyles } from "./styles";

const StyledTabs = ({ classes, tabs, onTabChange, activeTab }) => {
  const activeComponent = tabs.filter((el) => el.activeIndex === activeTab)[0].component;

  return (
    <Grid item xs={12} sm={12} md={12} lg={12}>
      <AppBar position="static" className={classes.tabsHeader}>
        <Tabs value={activeTab}>
          {tabs.map((value) => (
            <Tab key={value.name} label={value.name} onClick={() => onTabChange(value.activeIndex)} />
          ))}
        </Tabs>
      </AppBar>
      {activeComponent}
    </Grid>
  );
};

export default withStyles(useStyles)(StyledTabs);
