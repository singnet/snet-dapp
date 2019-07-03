import React from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/styles";
import { connect } from "react-redux";

import CreatorDetails from "../CreatorDetails";
import ProjectDetails from "../ProjectDetails";
import StyledGallery from "./StyledGallery";
import { useStyles } from "./styles";
import DemoToggler from "./DemoToggler";

const AboutService = ({ classes, isLoggedIn }) => {
  return (
    <Grid container spacing={24} className={classes.aboutContainer}>
      <Grid item xs={12} sm={12} md={8} lg={8} className={classes.leftSideSection}>
        <div className={classes.overViewContainer}>
          <h3>Overview</h3>
          <p>
            Colorizes given black & white images. Input a black & white photo and let the AI comput the predicted color
            states of the original photo image.
          </p>
          <h4>Features</h4>
          <p>
            Lorem ipsum dolor sit amet, vix ut facer cetero meliore, an nibh veri adhuc duo. Ad mei facete detraxit, ad
            error cotidieque sea, pri graeci impetus efficiendi cu. Sea ei feugiat appareat pertinax, mei alii periculis
            ad, stet officiis sit cu.
          </p>
          <ul>
            <div>
              <li>Fully responsive</li>
              <li>Touch enabled</li>
              <li>Animated Layers</li>
              <li>Per-slide options</li>
            </div>
            <div>
              <li>Mobile optimized</li>
              <li>More than 30 options</li>
              <li>Literally unlimited transitions</li>
              <li>Easy installation</li>
            </div>
          </ul>
          <div className={classes.tagsContainer}>
            <h5>Tags</h5>
            <span className={classes.tags}>Tag Name</span>
            <span className={classes.tags}>Tag Name</span>
            <span className={classes.tags}>Tag Name</span>
          </div>
        </div>

        <div className={classes.demoContainer}>
          <h3>Demo Example</h3>
          <DemoToggler showDemo={isLoggedIn} />
        </div>

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
