import React from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/styles";
import { connect } from "react-redux";

import CreatorDetails from "../CreatorDetails";
import ProjectDetails from "../ProjectDetails";
import StyledGallery from "./StyledGallery";
import { useStyles } from "./styles";
import DemoToggler from "./DemoToggler";
import Overview from "./Overview";

const AboutService = ({ classes, isLoggedIn, service }) => {
  return (
    <Grid container spacing={24} className={classes.aboutContainer}>
      <Grid item xs={12} sm={12} md={8} lg={8} className={classes.leftSideSection}>
        <Overview description={service.description} service_url={service.url} tags={service.tags} />

        <DemoToggler showDemo={isLoggedIn} classes={classes} />

        <div className={classes.backToLink}>
          <i className="fas fa-arrow-left"></i>
          <a href="#" title="Back To">
            Back to AI Marketplace
          </a>
        </div>
      </Grid>

      <Grid item xs={12} sm={12} md={4} lg={4}>
        <CreatorDetails />
        <ProjectDetails />
        <StyledGallery />
      </Grid>
    </Grid>
  );
};

const mapStateToProps = state => ({
  isLoggedIn: state.userReducer.isLoggedIn,
});

export default connect(mapStateToProps)(withStyles(useStyles)(AboutService));
