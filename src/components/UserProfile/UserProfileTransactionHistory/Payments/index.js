import React from "react";
import { withStyles } from "@mui/styles";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import PaymentData from "./PaymentData";
import { useStyles } from "./styles";
import { agiInDecimal } from "../../../../utility/PricingStrategy";

const Payments = ({ classes, transactionHistory }) => {
  return (
    <Grid container className={classes.paymentsContainer}>
      <Grid item xs={12} sm={12} md={12} lg={12} className={classes.paymentsHeaders}>
        <Grid item xs={1} sm={1} md={1} lg={1}>
          <Typography>date</Typography>
        </Grid>
        <Grid item xs={4} sm={4} md={4} lg={4}>
          <Typography>description</Typography>
        </Grid>
        {/* <Grid item xs={2} sm={2} md={2} lg={2}>
          <Typography>payment channel</Typography>
        </Grid> */}
        <Grid item xs={3} sm={3} md={3} lg={3}>
          <Typography>type</Typography>
        </Grid>
        <Grid item xs={2} sm={2} md={2} lg={2}>
          <Typography>status</Typography>
        </Grid>
        <Grid item xs={1} sm={1} md={1} lg={1}>
          <Typography>cost ($ USD)</Typography>
        </Grid>
        <Grid item xs={1} sm={1} md={1} lg={1}>
          <Typography>item received</Typography>
        </Grid>
      </Grid>
      <Grid container className={classes.paymentsDataContainer}>
        {transactionHistory.map((transaction) => (
          <PaymentData
            key={transaction.orderId}
            date={transaction.date}
            time={transaction.time}
            organizationName={transaction.organizationName}
            orderId={transaction.orderId}
            paymentChannel={transaction.paymentChannel}
            orderType={transaction.orderType}
            statusType={transaction.status}
            cost={transaction.cost}
            itemQuantity={agiInDecimal(transaction.itemQuantity)}
            itemUnit={transaction.itemUnit}
          />
        ))}
      </Grid>
    </Grid>
  );
};

export default withStyles(useStyles)(Payments);
