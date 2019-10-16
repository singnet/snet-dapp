import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import { withStyles } from "@material-ui/styles";
import map from "lodash/map";

import { useStyles } from "./styles";
import SingularityLogo from "../../../../../assets/images/avatar.png";
import { cogsToAgi } from "../../../../../utility/PricingStrategy";

const ChannelList = ({ classes, linkedProviders }) => {
  return (
    <React.Fragment>
      <Grid xs={12} sm={12} md={12} lg={12} className={classes}>
        <Grid xs={12} sm={12} md={12} lg={12} className={classes.columnTitle}>
          <Grid xs={12} sm={12} md={7} lg={7} className={classes}>
            <Typography>provider channels</Typography>
          </Grid>
          <Grid xs={12} sm={12} md={5} lg={5}>
            <Typography>available tokens</Typography>
          </Grid>
        </Grid>
        {map(linkedProviders, provider => {
          const { org_name, hero_image, groups } = provider;
          const firstGroup = groups[0];
          const firstChannel = firstGroup.channels[0];
          const balance_in_cogs = firstChannel.balance_in_cogs;
          return (
            <Grid xs={12} sm={12} md={12} lg={12} className={classes.tableData}>
              <Grid xs={12} sm={12} md={7} lg={7} className={classes.providerChannelDetails}>
                <div className={classes.avatarContainer}>
                  <Avatar alt="Singularity" src={hero_image || SingularityLogo} className={classes.avatar} />
                  <div>
                    <Typography className={classes.channelName}>{org_name}</Typography>
                  </div>
                </div>
              </Grid>
              <Grid xs={12} sm={12} md={5} lg={5}>
                <span className={classes.availableTokenCount}>{cogsToAgi(balance_in_cogs)} AGI</span>
              </Grid>
            </Grid>
          );
        })}
      </Grid>
    </React.Fragment>
  );
};

export default withStyles(useStyles)(ChannelList);
