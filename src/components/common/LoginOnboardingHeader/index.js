import React from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import SnetSvgLogo from "../SnetSvgLogo";
import Routes from "../../../utility/constants/Routes";
import { headerData as masterHeaderData } from "../../../utility/constants/Header";
import { useStyles } from "./styles";
import { userActions } from "../../../Redux/actionCreators";

const LoginOnboardingHeader = ({ classes, headerData, history, signOut }) => {
  const { headerTitle, linkPath, headerText } = headerData;

  const handleHeaderTextClick = (headerText, linkPath) => {
    if (headerText === masterHeaderData.ONBOARDING.headerText) {
      signOut();
    }
    history.push(`${linkPath}`);
  };

  return (
    <Grid container spacing={24} className={classes.loginOnboardingHeaderContainer}>
      <Grid container spacing={24} className={classes.loginHeader}>
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <h1>
            <Link to={Routes.AI_MARKETPLACE}>
              <SnetSvgLogo />
            </Link>
          </h1>
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6} className={classes.loginHeaderLink}>
          <p>
            {headerTitle} &nbsp; <span onClick={() => handleHeaderTextClick(headerText, linkPath)}>{headerText}</span>
          </p>
        </Grid>
      </Grid>
    </Grid>
  );
};

const mapDispatchToProps = dispatch => ({
  signOut: () => dispatch(userActions.signOut),
});

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(withStyles(useStyles)(LoginOnboardingHeader))
);
