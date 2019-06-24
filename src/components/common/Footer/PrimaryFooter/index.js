import React from "react";
import { makeStyles } from "@material-ui/styles";

import FooterLinks from "./FooterLinks";
import Logo from "../../../../assets/images/Logo.png";

const useStyles = makeStyles(theme => ({
    PrimaryFooter: {
        width: "100%",
        display: "flex",
    },
    footerLogoSection: {
        textAlign: "right",
        borderRightWidth: 1,
        borderRightStyle: "solid",
        padding: "15px 35px 15px 0",
        margin: 0,
    },
    footerLinks: {
        listStyle: "none",
    },
    footerLinkText: {
        color: theme.palette.text.offWhite,
        textDecoration: "none",
        lineHeight: "25px",
    },
}));

const PrimaryFooter = () => {
    const classes = useStyles();
    return (
        <div className={classes.PrimaryFooter}>
            <ul className={classes.footerLogoSection}>
                <li className={classes.footerLinks}>
                    <a href="#" title="SingularityNET">
                        <img src={Logo} alt="SingularityNET" className={classes.footerLogoIcon} />
                    </a>
                </li>
                <li className={classes.footerLinks}>
                    <a href="#" className={classes.footerLinkText} title="Contact Us">
                        Contact Us
                    </a>
                </li>
                <li className={classes.footerLinks}>
                    <a href="#" className={classes.footerLinkText} title="Foundation Main Site">
                        Foundation Main Site
                    </a>
                </li>
                <li className={classes.footerLinks}>
                    <a href="#" className={classes.footerLinkText} title="Singularity Studio">
                        Singularity Studio
                    </a>
                </li>
                <li className={classes.footerLinks}>
                    <a href="#" className={classes.footerLinkText} title="White Paper">
                        White Paper
                    </a>
                </li>
                <li className={classes.footerLinks}>
                    <a href="#" className={classes.footerLinkText} title="Jobs">
                        Jobs
                    </a>
                </li>
            </ul>
            <FooterLinks />
        </div>
    );
};

export default PrimaryFooter;
