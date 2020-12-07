import React from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/styles";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import StyledButton from "../common/StyledButton";
import MainSection from "./MainSection";
import { useStyles } from "./styles";
import Routes from "../../utility/constants/Routes";
import SeoMetadata from "../common/SeoMetadata";

const seoData = {
  title: "SingularityNET Beta Dapp",
  description:
    "The SingularityNET Marketplace hosts AI services. Services offer free calls to try before you use AGI or Paypal to purchase",
  image: `${process.env.REACT_APP_SNET_CDN}/assets/images/SEO/singularitynet-marketplace.png`,
  twitterImage: `${process.env.REACT_APP_SNET_CDN}/assets/images/SEO/singularitynet-marketplace-twitter.png`,
  url: `${process.env.REACT_APP_BASE_URL}`,
};

const AiMarketplace = ({ classes, isLoggedIn }) => {
  return (
    <React.Fragment>
      <SeoMetadata
        title={seoData.title}
        description={seoData.description}
        image={seoData.image}
        url={seoData.url}
        twitterImage={seoData.twitterImage}
      />
      <div className={classes.aiMarketPlaceContainer}>
        <div className={classes.mainWrapper}>
          <Grid container spacing={24} className={classes.topSectionCotainer}>
            <Grid item xs={12} sm={3} md={3} lg={3} className={classes.titleContainer}>
              <h2 className={classes.title}>AI Marketplace</h2>
            </Grid>
            <Grid item xs={12} sm={9} md={9} lg={9} className={classes.descriptionContainer}>
              <div className={classes.description}>
                <span> Built for you, powered by open collaboration.</span>
                <p>
                  Never be limited by in-house machine learning and AI capabilities again. Explore and connect to the
                  largest open AI marketplace in the world.
                </p>
              </div>
              <Link to={Routes.SIGNUP} className={classes.signupLink}>
                {!isLoggedIn && <StyledButton type="blue" btnText="Sign up for the free trial" />}
              </Link>
            </Grid>
          </Grid>
          <div>
            <MainSection />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = state => ({
  isLoggedIn: state.userReducer.login.isLoggedIn,
});

export default connect(mapStateToProps)(withStyles(useStyles)(AiMarketplace));
