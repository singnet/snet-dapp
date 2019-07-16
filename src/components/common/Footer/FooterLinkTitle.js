import React from "react";
import { useStyles } from "./styles";

const FooterLinkTitle = ({ title }) => {
  const classes = useStyles();

  return <span className={classes.footerLinksTitle}>{title}</span>;
};

export default FooterLinkTitle;
