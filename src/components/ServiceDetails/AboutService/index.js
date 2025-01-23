import React from "react";
import Grid from "@mui/material/Grid";
import { withStyles } from "@mui/styles";
import { useStyles } from "./styles";
import DemoToggler from "./DemoToggler";
import ServiceOverview from "./ServiceOverview";
import CreatorDetails from "../CreatorDetails";
import ProjectDetails from "../ProjectDetails";
import MediaGallery from "../MediaGallery";
import PromoBox from "./PromoBox";
import Card from "../../common/Card";

const AboutService = ({
  classes,
  service,
  serviceAvailable,
  // scrollToView,
  demoComponentRequired,
  isTrainingAvailable,
}) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={12} md={8} lg={8} className={classes.section}>
        <ServiceOverview
          description={service.description}
          service_url={service.url}
          tags={service.tags}
          isTrainingAvailable={isTrainingAvailable}
        />
        <Card
          header="Service Demo"
          children={
            <DemoToggler
              classes={classes}
              service={service}
              serviceAvailable={serviceAvailable}
              // scrollToView={scrollToView}
              demoComponentRequired={demoComponentRequired}
            />
          }
        />
        {/* <RenderExistingModel /> */}
        {!process.env.REACT_APP_SANDBOX && (
          <div className={classes.showOnNrmalResolution}>
            <PromoBox />
          </div>
        )}
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} className={classes.section}>
        <Card
          header="Provider"
          children={
            <CreatorDetails
              organizationName={service.organization_name}
              orgImg={service.org_assets_url && service.org_assets_url.hero_image}
              contacts={service.contacts}
            />
          }
        />
        <ProjectDetails
          projectURL={service.url}
          contributors={service.contributors}
          orgId={service.org_id}
          serviceId={service.service_id}
        />
        <MediaGallery data={service.media} />
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
