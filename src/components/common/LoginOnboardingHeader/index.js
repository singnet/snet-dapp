import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { withStyles } from "@mui/styles";
import Grid from "@mui/material/Grid";
import { useDispatch } from "react-redux";

import SnetSvgLogo from "../SnetSvgLogo";
import Routes from "../../../utility/constants/Routes";
import { headerData as masterHeaderData } from "../../../utility/constants/Header";
import { useStyles } from "./styles";
import { userActions } from "../../../Redux/actionCreators";

const LoginOnboardingHeader = ({ classes, headerData }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { headerTitle, linkPath, headerText } = headerData;

  const handleHeaderTextClick = (headerText, linkPath) => {
    if (headerText === masterHeaderData.ONBOARDING.headerText) {
      dispatch(userActions.signOut());
    }
    return navigate(`/${linkPath}`, { replace: true });
  };

  return (
    <Grid container className={classes.loginOnboardingHeaderContainer}>
      <Grid container className={classes.loginHeader}>
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <Link to={`/${Routes.AI_MARKETPLACE}`} replace>
            <SnetSvgLogo />
          </Link>
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

export default withStyles(useStyles)(LoginOnboardingHeader);
