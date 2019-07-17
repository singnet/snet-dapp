import React from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";

import Routes from "../../../utility/constants/Routes";
import Logo from "../../../assets/images/LoginLogo.png";
import { useStyles } from "./styles";

const LoginOnboardingHeader = ({ classes, headerData }) => {
  const { headerTitle, linkPath, headerText } = headerData;
  return (
    <Grid container spacing={24}>
      <Grid container spacing={24} className={classes.loginHeader}>
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <h1>
            <Link to={Routes.AI_MARKETPLACE}>
              <img src={Logo} alt="SingularityNET" />
            </Link>
          </h1>
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6} className={classes.loginHeaderLink}>
          <p>
            {headerTitle} &nbsp; <Link to={linkPath}>{headerText}</Link>
          </p>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default withStyles(useStyles)(LoginOnboardingHeader);
