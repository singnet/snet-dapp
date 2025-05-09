import React from "react";
import Grid from "@mui/material/Grid";

import { useStyles } from "./styles";
import SocialIcon from "../SocialIcon";

const SecondaryFooter = ({ data }) => {
  const classes = useStyles();
  return (
    <Grid container className={classes.secondaryFooter}>
      <Grid item xs={12} sm={12} md={6} lg={6}>
        <p className={classes.copyrightText}>
          Copyright © {new Date().getFullYear()} SingularityNET All rights reserved.
        </p>
        <p className={classes.copyrightText}>
          Stichting SingularityNET Barbara Strozzilaan 362 1083 HN Amsterdam The Netherlands
        </p>
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6}>
        <ul className={classes.socialIconsList}>
          {data.map((item) => (
            <SocialIcon key={item.title} item={item} />
          ))}
        </ul>
      </Grid>
    </Grid>
  );
};

export default SecondaryFooter;
