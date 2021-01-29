import React, { Fragment } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/styles";
import StarRateIcon from "@material-ui/icons/StarRate";

import { useStyles } from "./styles";
import StyledButton from "../../common/StyledButton";

const ServiceListingHeader = ({ classes }) => {
  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Fragment>
      <div className={classes.serviceListingHeaderContainer}>
        <div className={classes.headerWrapper}>
          <Slider {...settings} className={classes.sliderContainer}>
            <Grid container className={classes.headerContentDetails}>
              <Grid item xs={6} sm={6} md={6} lg={5} className={classes.headerMedia}>
                <img src="http://placehold.it/441x411" alt="alternate text" />
              </Grid>
              <Grid item xs={6} sm={6} md={6} lg={7} className={classes.details}>
                <div>
                  <div className={classes.featuredServiceContainer}>
                    <span>
                      <StarRateIcon /> Featured Service
                    </span>
                    <span>1/3</span>
                  </div>
                  <h2>Song/Splitter is the first mobile app to leverage SingularityNET AI services.</h2>
                  <p>
                    Song/Splitter is an AI-driven application for splitting music and vocals into separate tracks,
                    saving them as separate audio files. The app leverages the AI service of Deezer Spleeter which is
                    available for demo and integration.
                    <span>The android app is available on Google Play Store now. </span>
                  </p>
                  <div className={classes.headerButtons}>
                    <StyledButton type="blue" btnText="try ai demo" />
                    <StyledButton type="whiteBorder" btnText="read more" />
                  </div>
                </div>
              </Grid>
            </Grid>
            <Grid container className={classes.headerContentDetails}>
              <p>second slide</p>
            </Grid>
            <Grid container className={classes.headerContentDetails}>
              <span>third slide</span>
            </Grid>
          </Slider>
        </div>
        <Grid container className={classes.titleDescription}>
          <Grid item xs={6} sm={5} md={5} lg={5}>
            <h2>AI Marketplace</h2>
          </Grid>
          <Grid item xs={6} sm={7} md={7} lg={7}>
            <p>
              <span>Built for you, powered by open collaboration. </span>
              <span>Explore the largest open AI services in the world.</span>
            </p>
          </Grid>
        </Grid>
      </div>
    </Fragment>
  );
};

export default withStyles(useStyles)(ServiceListingHeader);
