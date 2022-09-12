import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import { useStyles } from "./styles";
import DemoToggler from "./DemoToggler";
import ServiceOverview from "./ServiceOverview";
import CreatorDetails from "../CreatorDetails";
import ProjectDetails from "../ProjectDetails";
import MediaGallery from "../MediaGallery";
import PromoBox from "./PromoBox";
import ExistingModel from "../ExistingModel";
import { alertTypes } from "../../common/AlertBox";
import { LoaderContent } from "../../../utility/constants/LoaderContent";
import { loaderActions, userActions } from "../../../Redux/actionCreators";

const AboutService = ({
  classes,
  isLoggedIn,
  service,
  history,
  serviceAvailable,
  demoExampleRef,
  scrollToView,
  demoComponentRequired,
  haveTrainingModel,
  training,
  haveANewModel
}) => {
  const RenderExistingModel = () => {
    if ((process.env.REACT_APP_TRAINING_ENABLE === "true") && (haveTrainingModel === true)) {
      return <ExistingModel showReqNewModelBtn haveANewModel={haveANewModel}/>;
    }
    return null;
  };

  return (
    <Grid container spacing={24} className={classes.aboutContainer}>
      <Grid item xs={12} sm={12} md={8} lg={8} className={classes.leftSideSection}>
        <ServiceOverview description={service.description} service_url={service.url} tags={service.tags} />
        <DemoToggler
          showDemo={isLoggedIn}
          classes={classes}
          service={service}
          history={history}
          serviceAvailable={serviceAvailable}
          demoExampleRef={demoExampleRef}
          scrollToView={scrollToView}
          demoComponentRequired={demoComponentRequired}
        />
        <RenderExistingModel />
        <div className={classes.showOnNrmalResolution}>
          <PromoBox />
        </div>
      </Grid>

      <Grid item xs={12} sm={12} md={4} lg={4} className={classes.rightSideSection}>
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
        <div className={classes.showInResponsive}>
          <PromoBox />
        </div>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = state => ({
  isLoggedIn: state.userReducer.login.isLoggedIn,
  wallet: state.userReducer.wallet,
});

const mapDispatchToProps = dispatch => ({
  startMMconnectLoader: () => dispatch(loaderActions.startAppLoader(LoaderContent.CONNECT_METAMASK)),
  updateWallet: ({ type, address }) => dispatch(userActions.updateWallet({ type, address })),
  registerWallet: (address, type) => dispatch(userActions.registerWallet(address, type)),
  fetchAvailableUserWallets: () => dispatch(userActions.fetchAvailableUserWallets()),
  stopLoader: () => dispatch(loaderActions.stopAppLoader),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(AboutService));
