import React from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import InfoIcon from "@material-ui/icons/Info";
import ArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import Avatar from "@material-ui/core/Avatar";

import StyledPagination from "../../../AiMarketplace/MainSection/ServiceCollection/StyledPagination";
import StyledButton from "../../../common/StyledButton";
import SingularityLogo from "../../../../assets/images/avatar.png";
import { useStyles } from "./styles";

const ProviderBalance = ({ classes, orgImg }) => {
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
      <Grid xs={12} sm={12} md={12} lg={12} className={classes.BalDetails}>
        <Grid xs={12} sm={12} md={12} lg={12} className={classes.columnTitle}>
          <Grid xs={12} sm={12} md={4} lg={4}>
            <Typography>provider channels</Typography>
          </Grid>
          <Grid xs={12} sm={12} md={1} lg={1}>
            <Typography>linked wallets</Typography>
          </Grid>
          <Grid xs={12} sm={12} md={3} lg={3}>
            <Typography>available tokens</Typography>
          </Grid>
        </Grid>
        <Grid xs={12} sm={12} md={12} lg={12} className={classes.tableData}>
          <Grid xs={12} sm={12} md={4} lg={4} className={classes.providerChannelDetails}>
            <div>
              <Avatar alt="Singularity" src={orgImg || SingularityLogo} className={classes.avatar} />
            </div>
            <div>
              <Typography className={classes.channelName}>Singularitynetty</Typography>
              <Typography className={classes.algorithmCount}>30 Algorithms</Typography>
            </div>
          </Grid>
          <Grid xs={12} sm={12} md={1} lg={1}>
            <InfoIcon className={classes.infoIcon} />
            <span className={classes.linkedWalletCount}>12</span>
          </Grid>
          <Grid xs={12} sm={12} md={3} lg={3}>
            <span className={classes.availableTokenCount}>0.00000000 AGI</span>
          </Grid>
          <Grid xs={12} sm={12} md={3} lg={3} className={classes.linkProviderBtn}>
            <StyledButton btnText="link provider" type="transparentBlueBorder" />
          </Grid>
          <Grid xs={12} sm={12} md={1} lg={1}>
            <ArrowDownIcon className={classes.downArrowIcon} />
          </Grid>
        </Grid>
      </Grid>
      <Grid xs={12} sm={12} md={12} lg={12} className={classes.paginationContainer}>
        <StyledPagination limit={4} offset={1} total_count={100} />
      </Grid>
    </Grid>
  );
};

export default withStyles(useStyles)(ProviderBalance);
