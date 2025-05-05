import React, { useEffect, useState } from "react";
import { withStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import isEmpty from "lodash/isEmpty";

import StyledButton from "../../../../../../../../common/StyledButton";
import { useStyles } from "./styles";
import { isValidCurrencyInput } from "./validationConstraints";
import AlertBox, { alertTypes } from "../../../../../../../../common/AlertBox";
import { USDToAgi } from "../../../../../../../../../Redux/reducers/PaymentReducer";
import { orderPayloadTypes, orderTypes } from "../../../../../../../../../utility/constants/PaymentConstants";
import AGITokens from "./AGITokens";

import { ReactComponent as PayPal } from "../../../../../../../../../assets/images/PayPal.svg";
import TextField from "@mui/material/TextField";
import { pickBy } from "lodash";
import { paymentActions } from "../../../../../../../../../Redux/actionCreators";
import { useParams } from "react-router-dom";
import { walletTypes } from "../../../../../../../../../Redux/actionCreators/UserActions";

export const paymentTypes = [{ value: "paypal", label: "Paypal" }];

const description = {
  [orderTypes.CREATE_WALLET]: `Please enter the payment type in the box below, along with the amount you would 
  like to enter into the payment channel.`,
  [orderTypes.TOPUP_WALLET]: `Please enter the payment type in the box below, along with the amount you would like to top up.`,
  [orderTypes.CREATE_CHANNEL]: `Please enter the payment type in the box below, along with the amount you would like to enter into the payment channel.`,
};

const Details = ({ classes, handleClose, orderType, handleNextSection }) => {
  const dispatch = useDispatch();
  const { orgId, serviceId } = useParams();

  const walletList = useSelector((state) => state.userReducer.walletList);
  const generalWallet = walletList.find((wallet) => wallet.type === walletTypes.GENERAL);
  const { usd_agi_rate, agi_divisibility } = useSelector((state) => state.paymentReducer);
  const groupInfo = useSelector((state) => {
    return state.serviceDetailsReducer.details.groups.find((group) => {
      return !isEmpty(group.endpoints.find((endpoint) => endpoint.is_available === 1));
    });
  });

  useEffect(() => {
    dispatch(paymentActions.fetchUSDConversionRate());
  }, [dispatch]);

  const payType = "paypal";
  const currency = "USD";

  const [amount, setAmount] = useState("");
  const [alert, setAlert] = useState({});
  const [amountError, setAmountError] = useState();

  const initiatePayment = async (amount, currency, item, quantity, address) => {
    const itemDetails = {
      item,
      quantity: Number(quantity),
      org_id: orgId,
      service_id: serviceId,
      group_id: groupInfo.group_id,
      recipient: groupInfo.payment.payment_address,
      order_type: orderPayloadTypes[orderType],
      wallet_address: address,
    };

    const enhancedItemDetails = pickBy(itemDetails, (el) => el !== undefined); // removed all undefined fields

    const paymentObj = {
      price: { amount: Number(amount), currency },
      item_details: enhancedItemDetails,
      payment_method: payType,
    };

    return await dispatch(paymentActions.initiatePayment(paymentObj));
  };

  const handleAmountChange = (event) => {
    const { value } = event.target;
    if (!value) {
      setAmountError();
      setAmount("");
      return;
    }

    if (!isValidCurrencyInput(value)) {
      return;
    }

    setAmountError();
    setAmount(value.trim());
  };

  let initiateInProcess = false;
  const handleContinue = async () => {
    if (!groupInfo?.group_id) {
      setAlert({ type: alertTypes.ERROR, message: "The group id is undefined. Please try later" });
      return;
    }

    setAlert({});
    try {
      if (initiateInProcess) return;
      const amountInAGI = USDToAgi(amount, usd_agi_rate, agi_divisibility);

      initiateInProcess = true;
      await initiatePayment(amount, currency, process.env.REACT_APP_TOKEN_NAME, amountInAGI, generalWallet?.address);
      handleNextSection();
    } catch (error) {
      setAlert({ type: alertTypes.ERROR, message: `${error.message}. Please try again` });
    } finally {
      initiateInProcess = false;
    }
  };

  return (
    <div className={classes.paymentContainer}>
      <Typography className={classes.deatilsTabDesc}>{description[orderType]}</Typography>
      <div className={classes.paymentTypeContainer}>
        <PayPal />
      </div>
      <div className={classes.purchaseAmtTextfield}>
        <TextField
          label="Select an Amount"
          value={amount}
          placeholder="0"
          onChange={(e) => handleAmountChange(e)}
          helperText={
            amountError ? amountError : <AGITokens amount={USDToAgi(amount, usd_agi_rate, agi_divisibility)} />
          }
          InputProps={{ startAdornment: <span className={classes.currencyAdornment}>$</span> }}
          error={Boolean(amountError)}
        />
      </div>

      <AlertBox type={alert.type} message={alert.message} />
      <div className={classes.btnContainer}>
        <StyledButton btnText="cancel" type="transparent" onClick={handleClose} />
        <StyledButton
          btnText="Continue"
          type="blue"
          disabled={!Boolean(Number(amount)) || !usd_agi_rate}
          onClick={handleContinue}
        />
      </div>
    </div>
  );
};

export default withStyles(useStyles)(Details);
