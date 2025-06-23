import React from "react";
import Grid from "@mui/material/Grid";
import { withStyles } from "@mui/styles";
import { useStyles } from "./styles";
import DemoToggler from "./DemoToggler";
import ServiceOverview from "./ServiceOverview";
import CreatorDetails from "../CreatorDetails";
import ProjectDetails from "../ProjectDetails";
import PromoBox from "./PromoBox";
import Card from "../../common/Card";

const AboutService = ({ classes, isTrainingAvailable }) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={12} md={8} lg={8} className={classes.section}>
        <ServiceOverview isTrainingAvailable={!!isTrainingAvailable} />
        <Card header="Service Demo" children={<DemoToggler />} />
        {/* <RenderExistingModel /> */}
        {!process.env.REACT_APP_SANDBOX && (
          <div className={classes.showOnNrmalResolution}>
            <PromoBox />
          </div>
        )}
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} className={classes.section}>
        <Card header="Provider" children={<CreatorDetails />} />
        <ProjectDetails />
        {/* <MediaGallery data={service.media} /> */}
        {!process.env.REACT_APP_SANDBOX && (
          <div className={classes.showInResponsive}>
            <PromoBox />
          </div>
        )}
      </Grid>
    </Grid>
  );
};

export default withStyles(useStyles)(AboutService);
