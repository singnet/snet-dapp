import React from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

import { useStyles } from "./styles";
import DemoToggler from "./DemoToggler";
import ServiceOverview from "./ServiceOverview";
import Routes from "../../../utility/constants/Routes";
import CreatorDetails from "../CreatorDetails";
import ProjectDetails from "../ProjectDetails";
import MediaGallery from "../MediaGallery";

const AboutService = ({
  classes,
  isLoggedIn,
  service,
  history,
  serviceAvailable,
  demoExampleRef,
  scrollToView,
  noDemoComponent,
}) => {
  return (
    <Grid container spacing={24} className={classes.aboutContainer}>
      <Grid item xs={12} sm={8} md={8} lg={8} className={classes.leftSideSection}>
        <ServiceOverview description={service.description} service_url={service.url} tags={service.tags} />
        <DemoToggler
          showDemo={isLoggedIn}
          classes={classes}
          service={service}
          history={history}
          serviceAvailable={serviceAvailable}
          demoExampleRef={demoExampleRef}
          scrollToView={scrollToView}
          noDemoComponent={noDemoComponent}
        />
        <div className={classes.backToLink}>
          <ArrowBackIcon />
          <Link to={`/${Routes.AI_MARKETPLACE}`}>Back to AI Marketplace</Link>
        </div>
        <div className={classes.promoContainer}>
          <img src="http://placehold.it/100x100" alt="Looking for New AI Service" />
          <div>
            <span>Looking for a different AI Service?</span>
            <p>
              If you have a need for a specific AI service, we would love to know! We will discuss the details with you
              or use the suggestion to incentivize our network.
            </p>
            <a href={`/${Routes.AI_REQUEST_FORM}`} title="Request AI Form" target="_blank">
              request ai form
            </a>
          </div>
        </div>
      </Grid>

      <Grid item xs={12} sm={4} md={4} lg={4} className={classes.rightSideSection}>
        <CreatorDetails
          organizationName={service.organization_name}
          orgImg={service.org_assets_url && service.org_assets_url.hero_image}
          contacts={service.contacts}
        />
        <ProjectDetails
          projectURL={service.url}
          contributors={service.contributors}
          orgId={service.org_id}
          serviceId={service.service_id}
        />
        <MediaGallery data={service.media} />
      </Grid>
    </Grid>
  );
};

const mapStateToProps = state => ({
  isLoggedIn: state.userReducer.login.isLoggedIn,
});

export default connect(mapStateToProps)(withStyles(useStyles)(AboutService));
