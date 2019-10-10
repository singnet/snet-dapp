import React from "react";
import { withStyles } from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import AlertText from "../../../../common/AlertText";
import { useStyles } from "./styles";

const PaymentData = ({
  classes,
  date,
  time,
  providerName,
  providerId,
  paymentChannel,
  type,
  statusType,
  statusMessage,
  cost,
  agiReceived,
}) => {
  return (
    <Grid item xs={12} sm={12} md={12} lg={12} className={classes.paymentsDataRow}>
      <Grid item xs={12} sm={12} md={2} lg={2}>
        <div className={classes.dateTime}>
          <Typography>{date}</Typography>
          <Typography>{time}</Typography>
        </div>
      </Grid>
      <Grid item xs={12} sm={12} md={2} lg={2}>
        <div className={classes.providerNameID}>
          <Typography>{providerName}</Typography>
          <Typography className={classes.providersId}>{providerId}</Typography>
        </div>
      </Grid>
      <Grid item xs={12} sm={12} md={2} lg={2}>
        <Typography>{paymentChannel}</Typography>
      </Grid>
      <Grid item xs={12} sm={12} md={1} lg={1}>
        <Typography>{type}</Typography>
      </Grid>
      <Grid item xs={12} sm={12} md={1} lg={1} className={classes.alertBox}>
        <AlertText type={statusType} message={statusMessage} />
      </Grid>
      <Grid item xs={12} sm={12} md={2} lg={2}>
        <Typography>{cost}</Typography>
      </Grid>
      <Grid item xs={12} sm={12} md={2} lg={2}>
        <Typography>{agiReceived})</Typography>
      </Grid>
    </Grid>
  );
};

export default withStyles(useStyles)(PaymentData);
