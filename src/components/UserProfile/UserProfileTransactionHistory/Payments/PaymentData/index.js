import React from "react";
import { withStyles } from "@mui/styles";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import AlertText from "../../../../common/AlertText";
import { useStyles } from "./styles";
import { alertTypes } from "../../../../common/AlertBox";

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
  const paymentStatusType = {
    PENDING: alertTypes.WARNING,
    PROCESSING: alertTypes.WARNING,
    NOT_SUBMITTED: alertTypes.INFO,
    SUCCESS: alertTypes.SUCCESS,
  };

  return (
    <Grid item xs={12} sm={12} md={12} lg={12} className={classes.paymentsDataRow}>
      <Grid item xs={1} sm={1} md={1} lg={1}>
        <div className={classes.dateTime}>
          <Typography>{date}</Typography>
          <Typography>{time}</Typography>
        </div>
      </Grid>
      <Grid item xs={4} sm={4} md={4} lg={4}>
        <div className={classes.providerNameID}>
          <Typography>{organizationName}</Typography>
          <Typography className={classes.providersId}>ID-{orderId}</Typography>
        </div>
      </Grid>
      {/* <Grid item xs={2} sm={2} md={2} lg={2}>
        <Typography>{paymentChannel}</Typography>
      </Grid> */}
      <Grid item xs={3} sm={3} md={3} lg={3}>
        <Typography>{orderType}</Typography>
      </Grid>
      <Grid item xs={2} sm={2} md={2} lg={2} className={classes.alertBox}>
        <AlertText type={paymentStatusType[statusType]} message={statusType} />
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
