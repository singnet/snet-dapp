import React from "react";
import Grid from "@mui/material/Grid";
import { withStyles } from "@mui/styles";
import { connect } from "react-redux";
import { useStyles } from "./styles";
import DemoToggler from "./DemoToggler";
import ServiceOverview from "./ServiceOverview";
import CreatorDetails from "../CreatorDetails";
import ProjectDetails from "../ProjectDetails";
import MediaGallery from "../MediaGallery";
import PromoBox from "./PromoBox";
import ExistingModel from "../ExistingModel";
import Card from "../../common/Card";

const AboutService = ({
  classes,
  isLoggedIn,
  service,
  serviceAvailable,
  // scrollToView,
  demoComponentRequired,
  training,
  editModel,
}) => {
  const RenderExistingModel = () => {
    if (process.env.REACT_APP_TRAINING_ENABLE === "true" && Object.keys(training).length && isLoggedIn) {
      return (
        <ExistingModel
          showReqNewModelBtn
          haveANewModel={training?.training_methods?.length || false}
          training={training}
          editModel={editModel}
        />
      );
    }
    return null;
  };

  return (
    <Grid container spacing={2} className={classes.aboutContainer}>
      <Grid item xs={12} sm={12} md={8} lg={8} className={classes.section}>
        <Card
          header="Overview"
          children={<ServiceOverview description={service.description} service_url={service.url} tags={service.tags} />}
        />
        <Card
          header="Service Demo"
          children={
            <DemoToggler
              showDemo={isLoggedIn}
              classes={classes}
              service={service}
              serviceAvailable={serviceAvailable}
              // scrollToView={scrollToView}
              demoComponentRequired={demoComponentRequired}
            />
          }
        />
        <RenderExistingModel />
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
        <Card
          header="Project Details"
          children={
            <ProjectDetails
              projectURL={service.url}
              contributors={service.contributors}
              orgId={service.org_id}
              serviceId={service.service_id}
            />
          }
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

const mapStateToProps = (state) => ({
  isLoggedIn: state.userReducer.login.isLoggedIn,
});

export default connect(mapStateToProps)(withStyles(useStyles)(AboutService));
