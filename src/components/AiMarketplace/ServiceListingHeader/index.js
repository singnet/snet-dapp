import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Grid from "@mui/material/Grid";
import { withStyles } from "@mui/styles";
import StarRateIcon from "@mui/icons-material/StarRate";

import { useStyles } from "./styles";
import StyledButton from "snet-dapp-components/components/StyledButton";
import { uiContentActions } from "../../../Redux/actionCreators";

const ServiceListingHeader = ({ classes }) => {
  const dispatch = useDispatch();
  const carousel = useSelector((state) => state.uiContentReducer.carousel);

  useEffect(() => {
    dispatch(uiContentActions.fetchCarousel(carousel));
  }, [carousel, dispatch]);

  const isMoreThanOneElement = () => {
    return carousel.length > 1;
  };

  const HeaderSlide = (item, index) => {
    const IMAGE_ALIGNMENT = { RIGHT: "RIGHT", LEFT: "LEFT" };

    return (
      <Grid
        key={item.id}
        container
        className={`${classes.headerContentDetails} ${
          item.image_alignment === IMAGE_ALIGNMENT.RIGHT ? classes.reverseDirection : null
        }`}
      >
        <Grid item xs={6} sm={6} md={6} lg={5} className={classes.headerMedia}>
          <img src={item.image} alt={item.alt_text} />
        </Grid>
        <Grid item xs={6} sm={6} md={6} lg={7} className={classes.details}>
          <div>
            <div className={classes.featuredServiceContainer}>
              <span className={classes.featuredServiceTitle}>
                <StarRateIcon />
                Featured Service
              </span>
              {isMoreThanOneElement() && (
                <span className={classes.slidesCounter}>
                  {index + 1}/{carousel.length}
                </span>
              )}
            </div>
            <h2>{item.title}</h2>
            <p>{item.description}</p>
            <div className={classes.headerButtons}>
              {item.cta.map((button) => (
                <StyledButton
                  key={button.id}
                  type={button.type}
                  btnText={button.text}
                  href={button.url}
                  newTab={button.text === "READ MORE"}
                />
              ))}
            </div>
          </div>
        </Grid>
      </Grid>
    );
  };

  const HeaderSlides = () => {
    return <>{carousel.map((item, index) => HeaderSlide(item, index))}</>;
  };

  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  if (!carousel?.length > 0) {
    return null;
  }

  return (
    <Fragment>
      <div className={classes.serviceListingHeaderContainer}>
        <div className={classes.headerWrapper}>
          {isMoreThanOneElement() ? (
            <Slider {...settings} className={classes.sliderContainer}>
              {HeaderSlides()}
            </Slider>
          ) : (
            HeaderSlides()
          )}
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
