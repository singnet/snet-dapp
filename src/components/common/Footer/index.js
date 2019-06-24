import React from "react";
import Grid from "@material-ui/core/Grid";

import PrimaryFooter from "./PrimaryFooter";
import SecondaryFooter from "./SecondaryFooter";
import { useStyles } from "./styles";

const Footer = () => {
    const classes = useStyles();
    return (
        <footer className={classes.footer}>
            <Grid container spacing={24} className={classes.footerWrapper}>
                <PrimaryFooter />
                <SecondaryFooter />
            </Grid>
        </footer>
    );
};

export default Footer;
