import React from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import InfoIcon from "@material-ui/icons/Info";
import ArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import Avatar from "@material-ui/core/Avatar";

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
          <Grid xs={12} sm={12} md={4} lg={4}>
            <div>
              <Avatar alt="Singularity" src={orgImg || SingularityLogo} className={classes.avatar} />
            </div>
            <div>
              <Typography>Singularitynetty</Typography>
              <Typography>30 Algorithms</Typography>
            </div>
          </Grid>
          <Grid xs={12} sm={12} md={1} lg={1}>
            <InfoIcon />
            <span>12</span>
          </Grid>
          <Grid xs={12} sm={12} md={3} lg={3} />
          <Grid xs={12} sm={12} md={3} lg={3}>
            <StyledButton btnText="link provider" type="transparent" />
          </Grid>
          <Grid xs={12} sm={12} md={1} lg={1}>
            <ArrowDownIcon />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default withStyles(useStyles)(ProviderBalance);
