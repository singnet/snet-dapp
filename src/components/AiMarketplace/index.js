import React from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/styles";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import StyledButton from "../common/StyledButton";
import MainSection from "./MainSection";
import { useStyles } from "./styles";
import Routes from "../../utility/constants/Routes";

const AiMarketplace = ({ classes, isLoggedIn }) => {
  return (
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
  );
};

const mapStateToProps = state => ({
  isLoggedIn: state.userReducer.login.isLoggedIn,
});

export default connect(mapStateToProps)(withStyles(useStyles)(AiMarketplace));
