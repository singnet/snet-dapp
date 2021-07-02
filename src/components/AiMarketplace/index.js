import React from "react";
import { withStyles } from "@material-ui/styles";
import { connect } from "react-redux";

import MainSection from "./MainSection";
import { useStyles } from "./styles";
import SeoMetadata from "../common/SeoMetadata";
import ServiceListingHeader from "./ServiceListingHeader";
import PromoComponent from "../PromoComponent";

const seoData = {
  title: "SingularityNET Beta Dapp",
  description:
    "The SingularityNET Marketplace hosts AI services. Services offer free calls to try before you use AGIX or Paypal to purchase",
  image: `${process.env.REACT_APP_SNET_CDN}/dapp/assets/images/SEO/singularitynet-marketplace.png`,
  twitterImage: `${process.env.REACT_APP_SNET_CDN}/dapp/assets/images/SEO/singularitynet-marketplace-twitter.png`,
  url: `${process.env.REACT_APP_BASE_URL}`,
};

const AiMarketplace = ({ classes, isLoggedIn }) => {
  return (
    <React.Fragment>
      <ServiceListingHeader />
      <SeoMetadata
        title={seoData.title}
        description={seoData.description}
        image={seoData.image}
        url={seoData.url}
        twitterImage={seoData.twitterImage}
      />
      <MainSection />
      <PromoComponent />
    </React.Fragment>
  );
};

const mapStateToProps = state => ({
  isLoggedIn: state.userReducer.login.isLoggedIn,
});

export default connect(mapStateToProps)(withStyles(useStyles)(AiMarketplace));
