import React, { useCallback, useEffect, useState } from "react";
import { withStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import isEmpty from "lodash/isEmpty";

import { useStyles } from "./styles";
import PurchaseAlert from "./PurchaseAlert";
import { alertTypes } from "../../../../../../../../common/AlertBox";
import { useDispatch, useSelector } from "react-redux";
import { paymentActions } from "../../../../../../../../../Redux/actionCreators";

const Purchase = ({ classes, handleCancel, handleNext, executePaymentCompleted }) => {
  const dispatch = useDispatch();
  const paypalInProgress = useSelector((state) => state.paymentReducer.paypalInProgress);

  const [alert, setAlert] = useState({});

  const executePayment = useCallback(async () => {
    const paymentExecObj = {
      order_id: paypalInProgress.orderId,
      payment_id: paypalInProgress.paymentId,
      payment_details: {
        payer_id: paypalInProgress.PayerID,
        payment_id: paypalInProgress.paypalPaymentId,
      },
    };

    try {
      const { data } = await dispatch(paymentActions.executePayment(paymentExecObj));
      await executePaymentCompleted(data);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.data && error.response.data.data.private_key) {
        await executePaymentCompleted(error.response.data.data);
        return;
      }
      setAlert({
        type: alertTypes.ERROR,
        message: "There was an error in communicating with PayPal. Please click contact support.",
        mailerErrContent: error.message,
      });
    }
  }, [dispatch, executePaymentCompleted, paypalInProgress]);

  useEffect(() => {
    if (!isEmpty(paypalInProgress)) {
      executePayment();
    } else {
      handleNext();
    }
  }, [executePayment, handleNext, paypalInProgress]);

  if (!isEmpty(alert)) {
    return <PurchaseAlert alert={alert} handleCancel={handleCancel} orderId={paypalInProgress.orderId} />;
  }

  return (
    <div className={classes.purchaseContainer}>
      <div className={classes.circularProgressContainer}>
        <CircularProgress className={classes.circularProgress} />
      </div>
      <Typography variant="body1" className={classes.purchaseDesc}>
        Please wait while your transaction is being processed within the blockchain. Do not close or refresh the window,
        the transaction request will proceed automatically once completed.
      </Typography>
    </div>
  );
};
export default withStyles(useStyles)(Purchase);
