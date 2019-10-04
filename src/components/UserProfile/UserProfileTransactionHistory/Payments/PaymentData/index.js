import React from "react";
import { withStyles } from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import AlertText from "../../../../common/AlertText";
import { useStyles } from "./styles";

const PaymentData = ({ classes }) => {
  return (
    <Grid container spacing={24} className={classes.paymentsDataContainer}>
      <Grid item xs={12} sm={12} md={12} lg={12} className={classes.paymentsDataRow}>
        <Grid item xs={12} sm={12} md={2} lg={2}>
          <div className={classes.dateTime}>
            <Typography>08 Sep 2019</Typography>
            <Typography>02:32 AM EST</Typography>
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={2} lg={2}>
          <div className={classes.providerNameID}>
            <Typography>Provider Name 1</Typography>
            <Typography className={classes.providersId}>ID-8783As670D</Typography>
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={2} lg={2}>
          <Typography>General Account Wallet</Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={1} lg={1}>
          <Typography>Paypal</Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={1} lg={1} className={classes.alertBox}>
          <AlertText type="success" message="success" />
        </Grid>
        <Grid item xs={12} sm={12} md={2} lg={2}>
          <Typography>$12.00</Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={2} lg={2}>
          <Typography>+ 0.98352378</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default withStyles(useStyles)(PaymentData);
