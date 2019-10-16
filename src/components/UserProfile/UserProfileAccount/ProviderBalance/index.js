import React from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";

import { useStyles } from "./styles";
import ChannelList from "./ChannelList";

const ProviderBalance = ({ classes, linkedProviders }) => {
  return (
    <Grid container spacing={10} className={classes.providerBalContent}>
      <h3>Provider Balances</h3>
      <Grid xs={12} sm={12} md={12} lg={12} className={classes.description}>
        <Typography>
          Message explaining about wallets and how tokens are locked to channels in each wallet. Lorem ipsum dolor sit
          amet, mel debet dissentiet philosophia ut. Sed nibh solum temporibus in. An insolens electram pro, qui nobis
          ornatus consectetuer an. Pro atqui labore saperet id. In qui sanctus definiebas, ut vidit assum mel.{" "}
        </Typography>
      </Grid>
      <ChannelList linkedProviders={linkedProviders} />
    </Grid>
  );
};

export default withStyles(useStyles)(ProviderBalance);
