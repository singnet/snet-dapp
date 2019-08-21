import React from "react";

import FooterLinks from "./FooterLinks";
import { useStyles } from "./styles";
import FooterLink from "../FooterLink";
import FooterLogo from "./FooterLogo";

const PrimaryFooter = ({ leftData, mainData }) => {
  const classes = useStyles();
  return (
    <div className={classes.PrimaryFooter}>
      <div className={classes.LeftData}>
        <FooterLogo />
        <ul className={classes.footerLogoSection}>
          {leftData.map(item => (
            <FooterLink
              key={item.label}
              image={item.image}
              link={item.link}
              label={item.label}
              internalLink={item.internalLink}
            />
          ))}
        </ul>
      </div>
      <FooterLinks data={mainData} />
    </div>
  );
};

export default PrimaryFooter;
