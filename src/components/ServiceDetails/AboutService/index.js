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
import CreatorDetails from "../CreatorDetails";
import ProjectDetails from "../ProjectDetails";

const AboutService = ({ classes, isLoggedIn, service, history, serviceAvailable }) => {
  return (
    <Grid container spacing={24} className={classes.aboutContainer}>
      <Grid item xs={12} sm={8} md={8} lg={8} className={classes.leftSideSection}>
        <ServiceOverview description={service.description} service_url={service.url} tags={service.tags} />
        <DemoToggler
          showDemo={isLoggedIn}
          classes={classes}
          service={service}
          history={history}
          serviceAvailable={serviceAvailable}
        />
      </Grid>

      <Grid item xs={12} sm={4} md={4} lg={4} className={classes.rightSideSection}>
        <CreatorDetails
          organizationName={service.organization_name}
          orgImg={service.org_assets_url && service.org_assets_url.hero_image}
          contacts={service.contacts}
        />
        <ProjectDetails projectURL={service.url} contributors={service.contributors} />
      </Grid>

      <div className={classes.backToLink}>
        <Icon className="fas fa-arrow-left" />
        <Link to={`/${Routes.AI_MARKETPLACE}`}>Back to AI Marketplace</Link>
      </div>
    </Grid>
  );
};

const mapStateToProps = state => ({
  isLoggedIn: state.userReducer.login.isLoggedIn,
});

export default connect(mapStateToProps)(withStyles(useStyles)(AboutService));
