import React from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/styles";

import StyledButton from "../common/StyledButton";
import { GetStartedCategoriesData } from "../../utility/constants/GetStarted";
import Category from "./Category";
import Features from "./Features";
import { useStyles } from "./styles";

const GetStarted = ({ classes }) => {
  return (
    <Grid container spacing={24} className={classes.GetStartedMainContaienr}>
      <Grid item xs={12} sm={12} md={12} lg={12} className={classes.TopSection}>
        <h2>One Powerful AI Marketplace Solution</h2>
        <p>
          The AI Marketplace is a secure and distributed platform for using and building AI applications. This radically
          compresses time-to-deployment while also democratizing the use of AI throughout your organization.
        </p>
      </Grid>
      {GetStartedCategoriesData.map(item => (
        <Category
          icon={item.categoryIcon}
          title={item.categoryTitle}
          description={item.categoryDescription}
          tabsTitle={item.categoryTabs}
          tabsContent={item.categoryTabsContent}
        />
      ))}
      <Grid item xs={12} sm={12} md={12} lg={12} className={classes.SignUpFree}>
        <h2>Get Started</h2>
        <p>
          We've made it fast and easy to experience the AI Marketplace.
          <br />
          Start with our free account and start demoing our cateloge of AI services in matter of minutes.
        </p>
        <StyledButton btnText="Sign up Free" type="blue" />
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} className={classes.FeaturesMainContainer}>
        <Features />
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} className={classes.FreeTrialSignUp}>
        <span>No commitment. No credit card required.</span>
        <StyledButton btnText="Start your Free Trial" type="blue" />
      </Grid>
    </Grid>
  );
};

export default withStyles(useStyles)(GetStarted);
