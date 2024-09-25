import React, { Component } from "react";
import { withStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import isEmpty from "lodash/isEmpty";

import { useStyles } from "./styles";
import PurchaseAlert from "./PurchaseAlert";
import { alertTypes } from "snet-dapp-components/components/AlertBox";

class Purchase extends Component {
  state = { alert: {} };

  componentDidMount = () => {
    if (!isEmpty(this.props.paypalInProgress)) {
      this.executePayment();
    }
  };

  executePayment = async () => {
    try {
      await this.props.executePayment();
    } catch (error) {
      this.setState({
        alert: {
          type: alertTypes.ERROR,
          message: "There was an error in communicating with PayPal. Please click contact support.",
          mailerErrContent: error.message,
        },
      });
    }
  };

  render() {
    const { classes, handleCancel, paypalInProgress } = this.props;
    const { alert } = this.state;
    if (!isEmpty(alert)) {
      return <PurchaseAlert alert={alert} handleCancel={handleCancel} orderId={paypalInProgress.orderId} />;
    }

    return (
      <div className={classes.purchaseContainer}>
        <div className={classes.circularProgressContainer}>
          <CircularProgress className={classes.circularProgress} />
        </div>
        <Typography variant="body1" className={classes.purchaseDesc}>
          Please wait while your transaction is being processed within the blockchain. Do not close or refresh the
          window, the transaction request will proceed automatically once completed.
        </Typography>
      </div>
    );
  }
}
export default withStyles(useStyles)(Purchase);
