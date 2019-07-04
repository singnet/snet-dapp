import React from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/styles";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import StyledButton from "../common/StyledButton";
import MainSection from "./MainSection";
import UserProfile from "../UserProfile";
import { useStyles } from "./styles";
import Routes from "../../utility/constants/Routes";

const AiMarketplace = ({ classes, isLoggedIn }) => {
  return (
    <div className={classes.aiMarketPlaceContainer}>
      <div className={classes.mainWrapper}>
        <Grid container spacing={24}>
          <Grid item xs={12} sm={3} md={3} lg={3} className={classes.titleContainer}>
            <h2 className={classes.title}>AI Marketplace</h2>
          </Grid>
          <Grid item xs={12} sm={9} md={9} lg={9}>
            <p className={classes.description}>
              Want to find the right AI service for your project? You’ve come to the right place. <br />
              We’ve got a growing marketplace with hundreds of AI services for you to utilize. <br />
              They’re powered by a community of amazing developers from all over the globe.
            </p>
            <Link to={Routes.SIGNUP} className={classes.signupLink}>
              {!isLoggedIn && <StyledButton type="blue" btnText="Sign up for free credits" />}
            </Link>
          </Grid>
        </Grid>
        <div>
          <MainSection />
        </div>
        <UserProfile />
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  isLoggedIn: state.userReducer.login.isLoggedIn,
});

export default connect(mapStateToProps)(withStyles(useStyles)(AiMarketplace));
