import React from "react";
import Grid from "@material-ui/core/Grid";

import PrimaryFooter from "./PrimaryFooter";
import SecondaryFooter from "./SecondaryFooter";
import { useStyles } from "./styles";
import { FooterData } from "./data";

const Footer = () => {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <Grid container spacing={24} className={classes.footerWrapper}>
        <PrimaryFooter leftData={FooterData.PrimaryFooterLeft} mainData={FooterData.PrimaryFooterMain} />
        <SecondaryFooter data={FooterData.SecondaryFooter} />
      </Grid>
    </footer>
  );
};

export default Footer;
