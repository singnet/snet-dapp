import React, { Fragment } from "react";
import { connect } from "react-redux";
import MainSection from "./MainSection";
import SeoMetadata from "../common/SeoMetadata";
import ServiceListingHeader from "./ServiceListingHeader";
import PromoComponent from "../PromoComponent";
import { Helmet } from "react-helmet";

const seoData = {
  title: "SingularityNET Beta Dapp",
  description:
    "The SingularityNET Marketplace hosts AI services. Services offer free calls to try before you use AGIX or Paypal to purchase",
  image: `${process.env.REACT_APP_SNET_CDN}/dapp/assets/images/SEO/singularitynet-marketplace.png`,
  twitterImage: `${process.env.REACT_APP_SNET_CDN}/dapp/assets/images/SEO/singularitynet-marketplace-twitter.png`,
  url: `${process.env.REACT_APP_BASE_URL}`,
};

const AiMarketplace = () => {
  return (
    <Fragment>
      <Helmet>
        <meta
          name="description"
          content="Dive into the AI Marketplace of SingularityNET and discover cutting-edge AI services and solutions."
        />
        <meta name="keywords" content="AI Marketplace, AI Services, Discover, Explore, SingularityNET" />
      </Helmet>
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
    </Fragment>
  );
};

export default AiMarketplace;
