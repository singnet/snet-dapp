import React from "react";

import { useStyles } from "./styles";

const FooterLink = ({ label, link, image }) => {
  const classes = useStyles();
  return (
    <li className={classes.footerLinks}>
      <a href={link} className={classes.footerLinkText} title={label}>
        {image ? <span className="icon-logo"></span> : label}
      </a>
    </li>
  );
};

export default FooterLink;
