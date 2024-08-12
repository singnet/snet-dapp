import React from "react";
import { withStyles } from "@mui/styles";
import InfoIcon from "@mui/icons-material/Info";
import Typography from "@mui/material/Typography";

import { useStyles } from "./styles";

const ProvidersLinkedCount = ({ classes, providerCount = 0 }) => {
  return (
    <div className={classes.totalProviderLinkedContainer}>
      <div className={classes.infoTitleContainer}>
        <InfoIcon className={classes.infoIcon} />
        <Typography className={classes.totalProviderLinkedTitle}>Total providers linked</Typography>
      </div>
      <div className={classes.totalProviderLinkedCount}>{providerCount}</div>
    </div>
  );
};

export default withStyles(useStyles)(ProvidersLinkedCount);
