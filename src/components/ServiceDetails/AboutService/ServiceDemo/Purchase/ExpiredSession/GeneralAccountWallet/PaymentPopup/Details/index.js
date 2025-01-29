import React, { useState } from "react";
import { withStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import Web3 from "web3";
import isEmpty from "lodash/isEmpty";
import MPEContract from "singularitynet-platform-contracts/networks/MultiPartyEscrow";

import PaymentInfoCard from "../../../../PaymentInfoCard";
import StyledButton from "../../../../../../../../common/StyledButton";
import { useStyles } from "./styles";
import snetValidator from "../../../../../../../../../utility/snetValidator";
import { paymentGatewayConstraints } from "./validationConstraints";
import AlertBox, { alertTypes } from "../../../../../../../../common/AlertBox";
import { tenYearBlockOffset } from "../../../../../../../../../utility/PricingStrategy";
import { groupInfo as getGroupInfo } from "../../../../../../../../../Redux/reducers/ServiceDetailsReducer";
import { channelInfo as getChannelInfo } from "../../../../../../../../../Redux/reducers/UserReducer";
import { decodeGroupId } from "../../../../../../../../../utility/sdk";
import {
  USDToAgi as getUSDToAgi,
  USDToCogs as getUSDToCogs,
} from "../../../../../../../../../Redux/reducers/PaymentReducer";
import { orderPayloadTypes, orderTypes } from "../../../../../../../../../utility/constants/PaymentConstants";
import AGITokens from "./AGITokens";

import { ReactComponent as PayPal } from "../../../../../../../../../assets/images/PayPal.svg";
import TextField from "@mui/material/TextField";
import { pickBy } from "lodash";
import { paymentActions } from "../../../../../../../../../Redux/actionCreators";
import { useParams } from "react-router-dom";

export const paymentTypes = [{ value: "paypal", label: "Paypal" }];

const web3 = new Web3(process.env.REACT_APP_WEB3_PROVIDER, null, {});

const description = {
  [orderTypes.CREATE_WALLET]: `Please enter the payment type in the box below, along with the amount you would 
  like to enter into the paymentchannel.`,
  [orderTypes.TOPUP_WALLET]: `Please enter the payment type in the box below, along with the amount you would like to top up.`,
  [orderTypes.CREATE_CHANNEL]: `Please enter the payment type in the box below, along with the amount you would like to enter into the payment channel.`,
};

const Details = ({ classes, handleClose, orderType, userProvidedPrivateKey: privateKey }) => {
  const groupInfo = useSelector((state) => getGroupInfo(state));
  const USDToAgi = useSelector((state) => getUSDToAgi(state));
  const USDToCogs = useSelector((state) => getUSDToCogs(state));
  const channelInfo = useSelector((state) => getChannelInfo(state));

  const dispatch = useDispatch();
  const { orgId, serviceId } = useParams();

  const payType = "paypal";
  const currency = "USD";

  const [amount, setAmount] = useState(0);
  const [alert, setAlert] = useState({});
  const [amountError, setAmountError] = useState();

  const initiatePayment = (amount, currency, item, quantity, base64Signature, address, currentBlockNumber) => {
    const itemDetails = {
      item,
      quantity: Number(quantity),
      org_id: orgId,
      service_id: serviceId,
      group_id: groupInfo.group_id,
      recipient: groupInfo.payment.payment_address,
      order_type: orderPayloadTypes[orderType],
      signature: base64Signature,
      wallet_address: address,
      current_block_number: currentBlockNumber,
    };

    const enhancedItemDetails = pickBy(itemDetails, (el) => el !== undefined); // removed all undefined fields

    const paymentObj = {
      price: { amount: Number(amount), currency },
      item_details: enhancedItemDetails,
      payment_method: "paypal",
    };

    return dispatch(paymentActions.initiatePayment(paymentObj));
  };

  const handleAmountChange = (event) => {
    const { value } = event.target;
    if (!value) {
      setAmountError();
      setAmount(0);
      return;
    }
    const isNotValid = snetValidator({ amount: value }, paymentGatewayConstraints);
    if (isNotValid) {
      setAmountError(isNotValid[0]);
      return;
    }
    setAmountError();
    setAmount(value);
  };

  const generateSignature = async () => {
    const account = web3.eth.accounts.privateKeyToAccount(privateKey);
    const address = account.address;
    web3.eth.accounts.wallet.add(account);
    web3.eth.defaultAccount = address;
    const recipient = groupInfo.payment.payment_address;
    const hexGroupId = decodeGroupId(groupInfo.group_id);
    const amountInCogs = USDToCogs(amount);
    const currentBlockNumber = await web3.eth.getBlockNumber();
    const mpeContractAddress = web3.utils.toChecksumAddress(MPEContract[process.env.REACT_APP_ETH_NETWORK].address);
    // block no is mined in 15 sec on average, setting expiration as 10 years
    const expiration = currentBlockNumber + tenYearBlockOffset;
    const sha3Message = web3.utils.soliditySha3(
      { t: "string", v: "__openChannelByThirdParty" },
      { t: "address", v: mpeContractAddress },
      { t: "address", v: process.env.REACT_APP_EXECUTOR_WALLET_ADDRESS },
      { t: "address", v: process.env.REACT_APP_SNET_SIGNER_ADDRESS },
      { t: "address", v: recipient },
      { t: "bytes32", v: hexGroupId },
      { t: "uint256", v: amountInCogs },
      { t: "uint256", v: expiration },
      { t: "uint256", v: currentBlockNumber }
    );
    const { signature } = await web3.eth.accounts.sign(sha3Message, privateKey);
    return Promise.resolve({ signature, address, currentBlockNumber });
  };

  const handleContinue = async () => {
    setAlert({});
    try {
      const amountInAGI = USDToAgi(amount);
      if (orderType === orderTypes.CREATE_CHANNEL) {
        var { signature, address, currentBlockNumber } = await generateSignature();
      }
      await initiatePayment(payType, amount, currency, "AGIX", amountInAGI, signature, address, currentBlockNumber);
    } catch (error) {
      setAlert({ type: alertTypes.ERROR, message: `${error.message}. Please try again` });
    }
  };

  return (
    <div className={classes.paymentContainer}>
      <Typography className={classes.deatilsTabDesc}>{description[orderType]}</Typography>
      <PaymentInfoCard
        title="Channel Balance"
        show={!isEmpty(channelInfo)}
        value={channelInfo?.balanceInAgi}
        unit="AGIX"
      />
      <div className={classes.paymentTypeContainer}>
        <PayPal />
      </div>
      <div className={classes.purchaseAmtTextfield}>
        <TextField
          label="Select an Amount"
          value={amount}
          onChange={handleAmountChange}
          helperText={amountError ? amountError : <AGITokens amount={USDToAgi(amount)} />}
          InputProps={{ startAdornment: <span className={classes.currencyAdornment}>$</span> }}
          error={Boolean(amountError)}
        />
      </div>

      <AlertBox type={alert.type} message={alert.message} />
      <div className={classes.btnContainer}>
        <StyledButton btnText="cancel" type="transparent" onClick={handleClose} />
        <StyledButton btnText="Continue" type="blue" disabled={!Boolean(Number(amount))} onClick={handleContinue} />
      </div>
    </div>
  );
};

export default withStyles(useStyles)(Details);
