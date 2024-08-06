import React from "react";
import Grid from "@mui/material/Grid";
import { withStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";

import { useStyles } from "./styles";
import ChannelList from "./ChannelList";

const ProviderBalance = ({ classes, linkedProviders }) => {
  return (
    <Grid container className={classes.providerBalContent}>
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
