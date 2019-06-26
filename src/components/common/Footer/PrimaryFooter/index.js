import React from "react";

import FooterLinks from "./FooterLinks";
import { useStyles } from "./styles";
import FooterLink from "../FooterLink";

const PrimaryFooter = ({ leftData, mainData }) => {
    const classes = useStyles();
    return (
        <div className={classes.PrimaryFooter}>
            <ul className={classes.footerLogoSection}>
                {leftData.map(item => (
                    <FooterLink key={item.label} image={item.image} link={item.link} label={item.label} />
                ))}
            </ul>
            <FooterLinks data={mainData} />
        </div>
    );
};

export default PrimaryFooter;
