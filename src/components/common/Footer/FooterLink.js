import React from "react";

import SnetSvgLogo from "../SnetSvgLogo";

import { useStyles } from "./styles";

const FooterLink = ({ label, link, image, internalLink }) => {
  const classes = useStyles();
  return (
    <li className={classes.footerLinks}>
      <a
        href={link}
        className={classes.footerLinkText}
        title={label}
        target={internalLink ? "_self" : "_blank"}
        rel="noopener noreferrer"
      >
        {image ? <SnetSvgLogo /> : label}
      </a>
    </li>
  );
};

export default FooterLink;
