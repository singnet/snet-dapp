import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/styles";

import StyledTabs from "../StyledTabs";
import Python from "./Python";
import CLanguage from "./CLanguage";
import Java from "./Java";
import Go from "./Go";
import ProjectDetails from "../ProjectDetails";
import { useStyles } from "./styles";

class InstallAndRunService extends Component {
  state = {
    activeTab: 0,
  };

  handleTabChange = activeTab => {
    this.setState({ activeTab });
  };

  render() {
    const { classes } = this.props;
    const { activeTab } = this.state;
    const tabs = [
      { name: "Python", activeIndex: 0, component: <Python /> },
      { name: "C++", activeIndex: 1, component: <CLanguage /> },
      { name: "Java", activeIndex: 2, component: <Java /> },
      { name: "Go", activeIndex: 3, component: <Go /> },
    ];
    return (
      <Grid container spacing={24} className={classes.installAndRunContainer}>
        <Grid item xs={12} sm={12} md={8} lg={8} className={classes.leftSideSection}>
          <div className={classes.integrationSetupContainer}>
            <h3>Integration Setup</h3>
            <div className={classes.integrationContent}>
              <StyledTabs tabs={tabs} onTabChange={this.handleTabChange} activeTab={activeTab} />
            </div>
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4}>
          <ProjectDetails />
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(useStyles)(InstallAndRunService);
