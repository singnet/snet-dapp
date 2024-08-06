import React from "react";
import Grid from "@mui/material/Grid";
import { withStyles } from "@mui/styles";
import GetStartedDescription from "./GetStartedDescription";
import { Helmet } from "react-helmet";
import { GetStartedCategoriesData } from "../../utility/constants/GetStarted";
import Category from "./Category";
import { useStyles } from "./styles";
import SeoMetadata from "../common/SeoMetadata";

const seoData = {
  title: "SingularityNET Beta Dapp",
  description:
    "The SingularityNET Marketplace hosts AI services. Services offer free calls to try before you use AGIX or Paypal to purchase",
  image: `${process.env.REACT_APP_SNET_CDN}/dapp/assets/images/SEO/singularitynet-marketplace.png`,
  twitterImage: `${process.env.REACT_APP_SNET_CDN}/dapp/assets/images/SEO/singularitynet-marketplace-twitter.png`,
  url: `${process.env.REACT_APP_BASE_URL}/getstarted`,
};

const GetStarted = ({ classes, history }) => {
  return (
    <React.Fragment>
      <Helmet>
        <meta
          name="description"
          content="Ready to explore AI? Get started with SingularityNET and navigate through our suite of AI services effortlessly."
        />
        <meta name="keywords" content="Get Started, AI Services, SingularityNET, Introduction" />
      </Helmet>
      <SeoMetadata
        title={seoData.title}
        description={seoData.description}
        image={seoData.image}
        url={seoData.url}
        twitterImage={seoData.twitterImage}
      />
      <Grid container className={classes.GetStartedMainContaienr}>
        <Grid item xs={12} sm={12} md={12} lg={12} className={classes.TopSection}>
          <GetStartedDescription
            title="One AI Marketplace For All"
            description="The SingularityNET AI Marketplace is a distributed platform created to democratize the use and development of AI applications. Built for you, powered by open collaboration."
          />
        </Grid>
        {GetStartedCategoriesData.map((item, index) => (
          <Category
            key={item.categoryTitle}
            icon={item.categoryIcon}
            title={item.categoryTitle}
            description={item.categoryDescription}
            tabs={item.categoryTabs}
            rightAlign={(index + 1) % 2 === 0}
          />
        ))}
        <Grid item xs={12} sm={12} md={12} lg={12} className={classes.SignUpFree}>
          <GetStartedDescription
            title="Get Started"
            description="We’ve made the marketplace fast, secure, private and easy to use. Start with a free trial now!"
            button
            btnType="blue"
            btnText="Sign up free"
            history={history}
          />
        </Grid>
        {/*
      <Grid item xs={12} sm={12} md={12} lg={12} className={classes.FeaturesMainContainer}>
        <Features />
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} className={classes.FreeTrialSignUp}>
        <span>No commitment. No credit card required.</span>
        <StyledButton btnText="Start your Free Trial" type="blue" />
      </Grid>
      */}
      </Grid>
    </React.Fragment>
  );
};

export default withStyles(useStyles)(GetStarted);
