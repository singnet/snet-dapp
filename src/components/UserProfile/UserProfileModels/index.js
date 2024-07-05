import React from "react";
import { withStyles } from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import { useStyles } from "./styles";
import RequestedModel from "./RequestedModel";
import RejectedRequestModel from "./RejectedRequestModel";

const UserProfileModels = ({ classes }) => {
  const [activeTab, setActiveTab] = React.useState(0);

  const onTabChange = (activeTab) => {
    setActiveTab(activeTab);
  };

  const tabs = [
    { name: "Requests", activeIndex: 0, component: <RequestedModel /> },
    { name: "Rejected Requests", activeIndex: 1, component: <RejectedRequestModel /> },
  ];

  const activeComponent = tabs.filter((el) => el.activeIndex === activeTab)[0].component;

  return (
    <Grid container className={classes.userProfileModelMainContainer}>
      <Grid item xs={12} sm={12} md={12} lg={12} className={classes.userProfileModelContainer}>
        <h3>Model Training</h3>
        <div className={classes.userProfileModelContent}>
          <AppBar position="static" className={classes.tabsHeader}>
            <Tabs value={activeTab}>
              {tabs.map((value) => (
                <Tab key={value.name} label={value.name} onClick={(value) => onTabChange(value.activeIndex)} />
              ))}
            </Tabs>
          </AppBar>
          {activeComponent}
        </div>
      </Grid>
    </Grid>
  );
};

export default withStyles(useStyles)(UserProfileModels);
