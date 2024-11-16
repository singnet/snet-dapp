import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { withStyles } from "@mui/styles";
import Grid from "@mui/material/Grid";
// import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import SnetSvgLogo from "../SnetSvgLogo";
import Routes from "../../../utility/constants/Routes";
import { headerData as masterHeaderData } from "../../../utility/constants/Header";
import { useStyles } from "./styles";
import { userActions } from "../../../Redux/actionCreators";

const LoginOnboardingHeader = ({ classes, headerData, signOut }) => {
  const navigate = useNavigate();
  const { headerTitle, linkPath, headerText } = headerData;

  const handleHeaderTextClick = (headerText, linkPath) => {
    if (headerText === masterHeaderData.ONBOARDING.headerText) {
      signOut();
    }
    return navigate(`/${linkPath}`, { replace: true });
  };

  return (
    <Grid container className={classes.loginOnboardingHeaderContainer}>
      <Grid container className={classes.loginHeader}>
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

const mapDispatchToProps = (dispatch) => ({
  signOut: () => dispatch(userActions.signOut()),
});

export default connect(null, mapDispatchToProps)(withStyles(useStyles)(LoginOnboardingHeader));
