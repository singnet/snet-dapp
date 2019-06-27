import React from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";

import Logo from "../../../assets/images/LoginLogo.png";
import { useStyles } from "./styles";

const LoginOnboardingHeader = ({ classes, title, linkText, linkPath, linkClick }) => {
    console.log("loginOnboardingHeader", linkPath);
    return (
        <Grid container spacing={24}>
            <Grid container spacing={24} className={classes.loginHeader}>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                    <h1>
                        <a href="#" title="SingularityNET">
                            <img src={Logo} alt="SingularityNET" />
                        </a>
                    </h1>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6} className={classes.loginHeaderLink}>
                    <p>
                        {title}{" "}
                        <Link to={linkPath} onClick={linkClick}>
                            {linkText}
                        </Link>
                    </p>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default withStyles(useStyles)(LoginOnboardingHeader);
