import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import { withStyles } from "@mui/styles";

import StyledTabs from "../StyledTabs";
import ProjectDetails from "../ProjectDetails";
import { useStyles } from "./styles";
import Card from "../../common/Card";
import FreecallToken from "./FreecallToken";
import { tabNames } from "./TabsMeta";
import IntegrationFilesActions from "./IntegrationFilesActions";

const InstallAndRunService = ({ classes, service, groupId }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (newActiveTab) => {
    setActiveTab(newActiveTab);
  };

  const tabs = [
    {
      name: tabNames.PYTHON,
      activeIndex: 0,
      component: <IntegrationFilesActions tabName={tabNames.PYTHON} />,
    },
    {
      name: tabNames.NODEJS,
      activeIndex: 1,
      component: <IntegrationFilesActions tabName={tabNames.NODEJS} />,
    },
  ];

  return (
    <Grid container className={classes.installAndRunContainer} spacing={3}>
      <Grid item xs={12} sm={12} md={8} lg={8} className={classes.overViewContainer}>
        <Card
          header="Integration Setup"
          children={<StyledTabs tabs={tabs} onTabChange={handleTabChange} activeTab={activeTab} />}
        />
        <Card
          header="Free Call Authentication Token"
          children={<FreecallToken service={service} groupId={groupId} />}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4}>
        <ProjectDetails
          projectURL={service.url}
          contributors={service.contributors}
          orgId={service.org_id}
          serviceId={service.service_id}
        />
      </Grid>
    </Grid>
  );
};

export default withStyles(useStyles)(InstallAndRunService);
