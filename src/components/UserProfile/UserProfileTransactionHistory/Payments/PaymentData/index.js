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
  organizationName,
  orderId,
  paymentChannel,
  orderType,
  statusType,
  cost,
  itemQuantity,
  itemUnit,
}) => {
  return (
    <Grid item xs={12} sm={12} md={12} lg={12} className={classes.paymentsDataRow}>
      <Grid item xs={2} sm={2} md={2} lg={2}>
        <div className={classes.dateTime}>
          <Typography>{date}</Typography>
          <Typography>{time}</Typography>
        </div>
      </Grid>
      <Grid item xs={2} sm={2} md={2} lg={2}>
        <div className={classes.providerNameID}>
          <Typography>{organizationName}</Typography>
          <Typography className={classes.providersId}>ID-{orderId}</Typography>
        </div>
      </Grid>
      <Grid item xs={2} sm={2} md={2} lg={2}>
        <Typography>{paymentChannel}</Typography>
      </Grid>
      <Grid item xs={3} sm={3} md={3} lg={3}>
        <Typography>{orderType}</Typography>
      </Grid>
      <Grid item xs={1} sm={1} md={1} lg={1} className={classes.alertBox}>
        <AlertText type={statusType} message={statusType} />
      </Grid>
      <Grid item xs={1} sm={1} md={1} lg={1}>
        <Typography>${cost}</Typography>
      </Grid>
      <Grid item xs={1} sm={1} md={1} lg={1}>
        <Typography>{`${itemQuantity} ${itemUnit}`}</Typography>
      </Grid>
    </Grid>
  );
};

export default withStyles(useStyles)(PaymentData);
