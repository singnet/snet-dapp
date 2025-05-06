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

const Purchase = ({ classes, handleCancel, handleNext, setAmount }) => {
  const dispatch = useDispatch();
  const paypalInProgress = useSelector((state) => state.paymentReducer.paypalInProgress);

  const [alert, setAlert] = useState({});
  const [isExecuteInProcess, setIsExecuteInProcess] = useState(false);

  const executePaymentCompleted = useCallback(
    (data) => {
      const {
        item_details: { item, quantity },
        price: { amount },
      } = data;

      setAmount({ amount, quantity, item });
      handleNext();
      return;
    },
    [setAmount, handleNext]
  );

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
      setIsExecuteInProcess(true);
      const { data } = await dispatch(paymentActions.executePayment(paymentExecObj));
      executePaymentCompleted(data);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.data && error.response.data.data.private_key) {
        executePaymentCompleted(error.response.data.data);
        return;
      }
      setAlert({
        type: alertTypes.ERROR,
        message: "There was an error in communicating with PayPal. Please click contact support.",
        mailerErrContent: error.message,
      });
    } finally {
      setIsExecuteInProcess(false);
    }
  }, [dispatch, executePaymentCompleted, paypalInProgress]);

  useEffect(() => {
    if (isExecuteInProcess) {
      return;
    }

    if (!isEmpty(paypalInProgress)) {
      executePayment();
    } else {
      handleNext();
    }
  }, [executePayment, handleNext, paypalInProgress, isExecuteInProcess]);

  if (!isEmpty(alert)) {
    return <PurchaseAlert alert={alert} handleCancel={handleCancel} />;
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
