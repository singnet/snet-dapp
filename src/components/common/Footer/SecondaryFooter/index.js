import React from "react";
import Grid from "@material-ui/core/Grid";

import { useStyles } from "./styles";
import SocialIcon from "../SocialIcon";

const SecondaryFooter = ({ data }) => {
  const classes = useStyles();
  return (
    <Grid container spacing={24} className={classes.secondaryFooter}>
      <Grid item xs={12} sm={12} md={6} lg={6}>
        <p className={classes.copyrightText}>Copyright © 2019 SingularityNET All rights reserved.</p>
        <p className={classes.copyrightText}>
          Stichting SingularityNET Barbara Strozzilaan 362 1083 HN Amsterdam The Netherlands
        </p>
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6}>
        <ul className={classes.socialIconsList}>
          {data.map(item => (
            <SocialIcon key={item.title} item={item} />
          ))}
        </ul>
      </Grid>
    </Grid>
  );
};

export default SecondaryFooter;
