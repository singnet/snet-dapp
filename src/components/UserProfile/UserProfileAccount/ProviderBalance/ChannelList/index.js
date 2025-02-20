import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { withStyles } from "@mui/styles";

import { useStyles } from "./styles";
import SingularityLogo from "../../../../../assets/images/avatar.png";
import { cogsToAgi } from "../../../../../utility/PricingStrategy";

const ChannelList = ({ classes, linkedProviders }) => {
  return (
    <>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Grid item xs={12} sm={12} md={12} lg={12} className={classes.columnTitle}>
          <Grid item xs={12} sm={12} md={7} lg={7}>
            <Typography>provider channels</Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={5} lg={5}>
            <Typography>available tokens</Typography>
          </Grid>
        </Grid>
        {linkedProviders.map((provider) => {
          const { org_name, org_id, hero_image, groups } = provider;
          const firstGroup = groups[0];
          const firstChannel = firstGroup && firstGroup.channels[0];
          const balance_in_cogs = firstChannel && firstChannel.balance_in_cogs;
          return (
            <Grid item xs={12} sm={12} md={12} lg={12} className={classes.tableData} key={org_id}>
              <Grid item xs={12} sm={12} md={7} lg={7} className={classes.providerChannelDetails}>
                <div className={classes.avatarContainer}>
                  <Avatar alt="Singularity" src={hero_image || SingularityLogo} className={classes.avatar} />
                  <Typography className={classes.channelName}>{org_name}</Typography>
                </div>
              </Grid>
              <Grid item xs={12} sm={12} md={5} lg={5}>
                <span className={classes.availableTokenCount}>{cogsToAgi(balance_in_cogs || 0)} AGIX</span>
              </Grid>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default withStyles(useStyles)(ChannelList);
