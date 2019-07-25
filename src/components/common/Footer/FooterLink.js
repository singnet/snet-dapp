import React from "react";

import SnetSvgLogo from "../SnetSvgLogo";

import { useStyles } from "./styles";

const FooterLink = ({ label, link, image }) => {
  const classes = useStyles();
  return (
    <li className={classes.footerLinks}>
      <a href={link} className={classes.footerLinkText} title={label}>
        {image ? <SnetSvgLogo /> : label}
      </a>
    </li>
  );
};

export default FooterLink;
