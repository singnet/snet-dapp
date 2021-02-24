import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/styles";
import StarRateIcon from "@material-ui/icons/StarRate";

import { useStyles } from "./styles";
import StyledButton from "../../common/StyledButton";
import { uiContentActions } from "../../../Redux/actionCreators";

class ServiceListingHeader extends Component {
  componentDidMount = () => {
    const { fetchCarousel } = this.props;
    fetchCarousel();
  };

  render() {
    const { classes, carousel } = this.props;

    const IMAGE_ALIGNMENT = { RIGHT: "RIGHT", LEFT: "LEFT" };

    const settings = {
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };

    if (!carousel.length > 0) {
      return null;
    }

    return (
      <Fragment>
        <div className={classes.serviceListingHeaderContainer}>
          <div className={classes.headerWrapper}>
            <Slider {...settings} className={classes.sliderContainer}>
              {carousel.map((item, index) => (
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
                        <span>
                          <StarRateIcon /> Featured Service
                        </span>
                        <span>
                          {index + 1}/{carousel.length}
                        </span>
                      </div>
                      <h2>{item.title}</h2>
                      <p>{item.description}</p>
                      <div className={classes.headerButtons}>
                        {item.cta.map(button => (
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
              ))}
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
  }
}

const mapStateToProps = state => ({
  carousel: state.uiContentReducer.carousel,
});

const mapDispatchToProps = dispatch => ({
  fetchCarousel: () => dispatch(uiContentActions.fetchCarousel()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(ServiceListingHeader));
