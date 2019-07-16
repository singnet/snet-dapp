import React from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Icon from "@material-ui/core/Icon";

import { useStyles } from "./styles";
import DemoToggler from "./DemoToggler";
import ServiceOverview from "./ServiceOverview";
import Routes from "../../../utility/constants/Routes";

const AboutService = ({ classes, isLoggedIn, service }) => {
  return (
    <Grid container spacing={24} className={classes.aboutContainer}>
      <Grid item xs={12} sm={12} md={8} lg={8} className={classes.leftSideSection}>
        <ServiceOverview description={service.description} service_url={service.url} tags={service.tags} />

        <DemoToggler showDemo={isLoggedIn} classes={classes} service={service} />

        <div className={classes.backToLink}>
          <Icon className="fas fa-arrow-left" />
          <Link to={`/${Routes.AI_MARKETPLACE}`}>Back to AI Marketplace</Link>
        </div>
      </Grid>

      <Grid item xs={12} sm={12} md={4} lg={4} />
    </Grid>
  );
};

const mapStateToProps = state => ({
  isLoggedIn: state.userReducer.login.isLoggedIn,
});

export default connect(mapStateToProps)(withStyles(useStyles)(AboutService));
