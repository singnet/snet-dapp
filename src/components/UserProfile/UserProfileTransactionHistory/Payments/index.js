import React from "react";
import { withStyles } from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import truncate from "lodash/truncate";

import PaymentData from "./PaymentData";
// import StyledPagination from "../../../AiMarketplace/MainSection/ServiceCollection/StyledPagination";
import { useStyles } from "./styles";

const Payments = ({ classes, transactionHistory }) => {
  return (
    <Grid container spacing={24} className={classes.paymentsContainer}>
      <Grid item xs={12} sm={12} md={12} lg={12} className={classes.paymentsHeaders}>
        <Grid item xs={12} sm={12} md={2} lg={2}>
          <Typography>date</Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={2} lg={2}>
          <Typography>description</Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={2} lg={2}>
          <Typography>payment channel</Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={1} lg={1}>
          <Typography>type</Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={1} lg={1}>
          <Typography>status</Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={2} lg={2}>
          <Typography>cost ($ USD)</Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={2} lg={2}>
          <Typography>item received</Typography>
        </Grid>
      </Grid>
      <Grid container spacing={24} className={classes.paymentsDataContainer}>
        {transactionHistory.map((transaction, index) => (
          <PaymentData
            key={transaction.orderId}
            date={transaction.date}
            time={transaction.time}
            organizationName={transaction.organizationName}
            orderId={truncate(transaction.orderId, { length: 11 })}
            paymentChannel={transaction.paymentChannel}
            orderType={transaction.orderType}
            statusType={transaction.status}
            cost={transaction.cost}
            itemQuantity={transaction.itemQuantity}
            itemUnit={transaction.itemUnit}
          />
        ))}
      </Grid>
      {/* <StyledPagination 
        limit: pagination.limit,
        offset: pagination.offset,
        total_count: pagination.total_count,
        handleChange: this.handlePaginationChange,
      /> */}
    </Grid>
  );
};

export default withStyles(useStyles)(Payments);
