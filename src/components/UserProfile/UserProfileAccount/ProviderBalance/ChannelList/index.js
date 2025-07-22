import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { withStyles } from "@mui/styles";

import { useStyles } from "./styles";
import SingularityLogo from "../../../../../assets/images/avatar.png";
import { cogsToToken } from "../../../../../utility/PricingStrategy";

const ChannelList = ({ classes, linkedProviders }) => {
  return (
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
        const { orgName, orgId, heroImage, channels } = provider;
        return (
          <Grid item xs={12} sm={12} md={12} lg={12} className={classes.tableData} key={orgId}>
            <Grid item xs={12} sm={12} md={7} lg={7} className={classes.providerChannelDetails}>
              <div className={classes.avatarContainer}>
                <Avatar alt="Singularity" src={heroImage || SingularityLogo} className={classes.avatar} />
                <Typography className={classes.channelName}>{orgName}</Typography>
              </div>
            </Grid>
            <Grid item xs={12} sm={12} md={5} lg={5}>
              {Object.keys(channels).map((channel) => (
                <span key={channel} className={classes.availableTokenCount}>
                  {cogsToToken(channels[channel] || 0)} {process.env.REACT_APP_TOKEN_NAME}
                </span>
              ))}
            </Grid>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default withStyles(useStyles)(ChannelList);
