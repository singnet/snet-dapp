import React from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";

import { useStyles } from "./styles";
import ChannelList from "./ChannelList";

const ProviderBalance = ({ classes, linkedProviders }) => {
  return (
    <Grid container spacing={24} className={classes.providerBalContent}>
      <h3>Provider Balances</h3>
      <Grid item xs={12} sm={12} md={12} lg={12} className={classes.description}>
        <Typography>
          Below is a list of service providers you have opened payment channels to. It is important to note that you
          cannot transfer balances between wallets and tokens in the payment channel are locked to that channel.
        </Typography>
      </Grid>
      <ChannelList linkedProviders={linkedProviders} />
    </Grid>
  );
};

export default withStyles(useStyles)(ProviderBalance);
