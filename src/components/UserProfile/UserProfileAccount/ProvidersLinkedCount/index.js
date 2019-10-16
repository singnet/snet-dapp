import React from "react";
import { withStyles } from "@material-ui/styles";
import InfoIcon from "@material-ui/icons/Info";
import Typography from "@material-ui/core/Typography";

import { useStyles } from "./styles";

const ProvidersLinkedCount = ({ classes, providerCount }) => {
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

ProvidersLinkedCount.defaultProps = {
  providerCount: 0,
};

export default withStyles(useStyles)(ProvidersLinkedCount);
