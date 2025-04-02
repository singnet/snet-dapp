import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Tooltip from "@mui/material/Tooltip";
import { withStyles } from "@mui/styles";
import StyledButton from "../../../../../../common/StyledButton";
import PaymentInfoCard from "../../PaymentInfoCard";
import PurchaseDialog from "../../PurchaseDialog";
import ChannelSelectionBox from "../../ChannelSelectionBox";
import AlertBox, { alertTypes } from "../../../../../../common/AlertBox";
import { cogsToAgi } from "../../../../../../../utility/PricingStrategy";
import { pricing as getPricing, groupInfo } from "../../../../../../../Redux/reducers/ServiceDetailsReducer";
import PaymentChannelManagement from "../../../../../../../utility/PaymentChannelManagement";
import { loaderActions } from "../../../../../../../Redux/actionCreators";
import { LoaderContent } from "../../../../../../../utility/constants/LoaderContent";
import { useStyles } from "./style";
import { isUndefined } from "lodash";

import { currentServiceDetails } from "../../../../../../../Redux/reducers/ServiceDetailsReducer";
import { updateChannelBalanceAPI, updateMetamaskWallet } from "../../../../../../../Redux/actionCreators/UserActions";
import { getSdk } from "../../../../../../../Redux/actionCreators/SDKActions";

const payTypes = {
  CHANNEL_BALANCE: "CHANNEL_BALANCE",
  MULTIPLE_CALLS: "MULTIPLE_CALLS",
  SINGLE_CALL: "SINGLE_CALL",
};

const connectMMinfo = {
  type: alertTypes.ERROR,
  message: `Please install Metamask and use your Metamask wallet to connect to SingularityNet. 
Click below to install and learn more about how to use Metamask and your AGIX credits with SinguarlityNet AI Marketplace.`,
};

const MIN_CALLS_NUMBER = 1;

const paymentInfoCardDatMpeBal = {
  title: "Escrow Balance",
  id: "mpeBal",
  unit: "AGIX",
};

let paymentChannelManagement;

const MetamaskFlow = ({ classes, handleContinue, setIsLastPaidCall, handlePurchaseError, isServiceAvailable }) => {
  const dispatch = useDispatch();
  const { price_in_cogs } = useSelector((state) => getPricing(state));
  const { org_id, service_id } = useSelector((state) => currentServiceDetails(state));
  const group_id = useSelector((state) => groupInfo(state).group_id);

  const [mpeBalance, setMpeBalance] = useState("0");
  const [selectedPayType, setSelectedPayType] = useState(payTypes.CHANNEL_BALANCE);
  const [disabledPayTypes, setDisabledPayTypes] = useState([]);
  const [showPurchaseDialog, setShowPurchaseDialog] = useState(false);
  const [noOfServiceCalls, setNoOfServiceCalls] = useState(1);
  const [totalPrice, setTotalPrice] = useState(cogsToAgi(price_in_cogs));
  const [alert, setAlert] = useState({});
  const [showTooltip, setShowTooltip] = useState(false);
  const [channelBalance, setChannelBalance] = useState();
  const [isStartServiceDisable, setIsStartServiceDisable] = useState(false);

  const updateBalanceData = async () => {
    try {
      await initializedPaymentChannel();
      await getPaymentChannelData();
      setIsStartServiceDisable(false);
    } catch (err) {
      setIsStartServiceDisable(true);
      setAlert({ type: alertTypes.ERROR, message: err.message });
    }
  };

  useEffect(() => {
    const handleDisabledPaytypes = () => {
      const disabledPayTypes = [];

      if (channelBalance <= 0 && !disabledPayTypes.includes(payTypes.CHANNEL_BALANCE)) {
        disabledPayTypes.push(payTypes.CHANNEL_BALANCE);
        setSelectedPayType("");
      }
      if (mpeBalance <= 0) {
        if (!disabledPayTypes.includes(payTypes.SINGLE_CALL)) {
          disabledPayTypes.push(payTypes.SINGLE_CALL);
        }
        if (!disabledPayTypes.includes(payTypes.MULTIPLE_CALLS)) {
          disabledPayTypes.push(payTypes.MULTIPLE_CALLS);
        }
      }
      setDisabledPayTypes(disabledPayTypes);
    };

    handleDisabledPaytypes();
  }, [channelBalance, mpeBalance]);

  const initializedPaymentChannel = async () => {
    try {
      setAlert({});
      dispatch(loaderActions.startAppLoader(LoaderContent.SETUP_CHANNEL_FOR_SERV_EXEC));
      const sdk = await dispatch(getSdk());
      const serviceClient = await sdk.createServiceClient(org_id, service_id);
      paymentChannelManagement = new PaymentChannelManagement(sdk, serviceClient);
      const escrowBalance = await sdk.account.escrowBalance();
      setMpeBalance(cogsToAgi(escrowBalance));
    } catch (error) {
      setAlert(connectMMinfo);
    } finally {
      dispatch(loaderActions.stopAppLoader());
    }
  };

  const getPaymentChannelData = async () => {
    setAlert({});
    try {
      dispatch(loaderActions.startAppLoader(LoaderContent.SETUP_CHANNEL_FOR_SERV_EXEC));
      await paymentChannelManagement.updateChannelInfo();
      await getBalanceData();
      await updateChannelBalance();
    } catch (error) {
      setAlert(connectMMinfo);
    } finally {
      dispatch(loaderActions.stopAppLoader());
    }
  };

  const updateChannelBalance = async () => {
    try {
      const channel = paymentChannelManagement._channel;
      await dispatch(
        updateChannelBalanceAPI(
          org_id,
          service_id,
          group_id,
          Number(channel._state.amountDeposited) - Number(channel._state.availableAmount),
          Number(channel._state.amountDeposited),
          Number(channel._channelId),
          Number(channel._state.nonce)
        )
      );
    } catch (error) {
      console.error("error: ", error);
    }
  };

  const getBalanceData = async () => {
    setAlert({});
    dispatch(loaderActions.startAppLoader(LoaderContent.SETUP_CHANNEL_FOR_SERV_EXEC));
    try {
      await dispatch(updateMetamaskWallet());
      const channelBalance = paymentChannelManagement.availableBalance();
      const channelBalanceInCogs = cogsToAgi(channelBalance);
      setChannelBalance(channelBalanceInCogs);
      if (channelBalanceInCogs === totalPrice) {
        setIsLastPaidCall(true);
        await handleSubmit();
        return;
      }
      if (channelBalanceInCogs > totalPrice) {
        setIsLastPaidCall(false);
        await handleSubmit();
        return;
      }
      setSelectedPayType(payTypes.MULTIPLE_CALLS);
    } catch (error) {
      console.error("get balance error: ", error);
      setAlert(connectMMinfo);
    } finally {
      dispatch(loaderActions.stopAppLoader());
    }
  };

  const handlePayTypeChange = (value) => {
    if (disabledPayTypes.includes(value) || selectedPayType === value) {
      return;
    }
    setSelectedPayType(value);
  };

  const handlePurchaseDialogOpen = () => {
    setShowPurchaseDialog(true);
  };

  const handlePurchaseDialogClose = () => {
    setShowPurchaseDialog(false);
  };

  const isValidCallsNumber = (numberOfCalls) => {
    const isInteger = numberOfCalls % 1 === 0;
    const isNumber = !isNaN(Number(numberOfCalls));
    return isInteger && isNumber;
  };

  const isCallsMoreOrEqualThanMinimum = () => {
    return noOfServiceCalls >= MIN_CALLS_NUMBER;
  };

  const formatValue = (value) => {
    let stringValue = String(value);
    if (stringValue[0] === "0" && stringValue.length > 1) {
      return stringValue.slice(1);
    }
    return value;
  };

  const handleNoOfCallsChange = (event) => {
    let noOfServiceCalls = event.target.value;
    if (!noOfServiceCalls || noOfServiceCalls === 0) {
      noOfServiceCalls = 0;
    }
    noOfServiceCalls = formatValue(noOfServiceCalls);
    setNoOfServiceCalls(noOfServiceCalls);
    if (!isValidCallsNumber(noOfServiceCalls)) {
      return;
    }
    const totalPriceInCogs = cogsToAgi(paymentChannelManagement.noOfCallsToCogs(noOfServiceCalls));
    setTotalPrice(totalPriceInCogs);
  };

  const handleSubmit = async () => {
    dispatch(loaderActions.startAppLoader(LoaderContent.SETUP_CHANNEL_FOR_SERV_EXEC));
    setAlert({});
    if (selectedPayType === payTypes.CHANNEL_BALANCE) {
      try {
        const isChannelNearToExpiry = await paymentChannelManagement.isChannelNearToExpiry();
        if (isChannelNearToExpiry) {
          await paymentChannelManagement.extendChannel();
        }
        handleContinue();
      } catch (e) {
        setAlert({ type: alertTypes.ERROR, message: e.message });
      } finally {
        dispatch(loaderActions.stopAppLoader());
      }
    }

    if (selectedPayType === payTypes.SINGLE_CALL) {
      setNoOfServiceCalls(1);
    }
    if (noOfServiceCalls === 1) {
      setIsLastPaidCall(true);
    }

    try {
      if (mpeBalance < cogsToAgi(paymentChannelManagement.noOfCallsToCogs(noOfServiceCalls))) {
        setAlert({
          type: alertTypes.ERROR,
          message: "Insufficient MPE balance. Please deposit some AGIX tokens to your escrow account",
        });
        return;
      }
      if (!paymentChannelManagement.channel) {
        await paymentChannelManagement.openChannel(noOfServiceCalls);
      } else {
        await paymentChannelManagement.extendAndAddFunds(noOfServiceCalls);
      }
      handleContinue();
    } catch (error) {
      setAlert({ type: alertTypes.ERROR, message: "Unable to execute the call" });
    } finally {
      dispatch(loaderActions.stopAppLoader());
    }
  };

  const shouldContinueBeEnabled = () => {
    return (
      // if pay type multiple calls the call number should be more than MIN_CALLS_NUMBER
      (selectedPayType !== payTypes.MULTIPLE_CALLS || isCallsMoreOrEqualThanMinimum()) &&
      selectedPayType &&
      isServiceAvailable &&
      (Number(mpeBalance) >= Number(totalPrice) || Number(channelBalance) >= Number(totalPrice))
    );
  };

  const shouldDepositToEscrowBeHighlighted = () => mpeBalance <= 0;

  const handleTooltipOpen = () => {
    if (!isServiceAvailable) {
      setShowTooltip(true);
    }
  };

  const handleTooltipClose = () => {
    setShowTooltip(false);
  };

  if (isUndefined(channelBalance) || isNaN(channelBalance)) {
    return (
      <>
        <StyledButton type="blue" btnText="run service" onClick={updateBalanceData} disabled={isStartServiceDisable} />
        <div className={classes.alertContainer}>
          <AlertBox type={alert.type} message={alert.message} />
        </div>
      </>
    );
  }

  return (
    <Fragment>
      <div className={classes.paymentInfoCard}>
        <PaymentInfoCard
          key={paymentInfoCardDatMpeBal.id}
          title={paymentInfoCardDatMpeBal.title}
          value={mpeBalance}
          unit={paymentInfoCardDatMpeBal.unit}
        />
      </div>
      <div className={classes.runServiceContainer}>
        <PurchaseDialog show={showPurchaseDialog} onClose={handlePurchaseDialogClose} />
        <ChannelSelectionBox
          title="Single Call"
          description="Tokens are purchsed for a single call. The tokens are purchsed from the available escrow balance."
          checked={selectedPayType === payTypes.SINGLE_CALL}
          value={payTypes.SINGLE_CALL}
          onClick={() => handlePayTypeChange(payTypes.SINGLE_CALL)}
          inputProps={{
            totalPrice: cogsToAgi(price_in_cogs),
            unit: "AGIX",
            noInput: true,
          }}
          disabled={disabledPayTypes.includes(payTypes.SINGLE_CALL)}
        />
        <div className={classes.bestValueContainer}>
          <div className={classes.channelSelectionTitle}>Best Value</div>
          <ChannelSelectionBox
            title="Multiple Calls"
            description="Select the no of calls you want to make. The tokens are purchased from the available escrow balance. This  option helps save the gas cost."
            checked={selectedPayType === payTypes.MULTIPLE_CALLS}
            value={payTypes.MULTIPLE_CALLS}
            onClick={() => handlePayTypeChange(payTypes.MULTIPLE_CALLS)}
            inputProps={{
              noOfServiceCalls,
              onChange: handleNoOfCallsChange,
              totalPrice,
              unit: "AGIX",
            }}
            disabled={disabledPayTypes.includes(payTypes.MULTIPLE_CALLS)}
          />
        </div>
        <AlertBox type={alert.type} message={alert.message} />
        <div className={classes.buttonContainer}>
          <StyledButton
            type={shouldDepositToEscrowBeHighlighted() ? "blue" : "transparent"}
            btnText="Deposit into Escrow"
            onClick={handlePurchaseDialogOpen}
          />
          <Tooltip
            title="Service is currently offline. Please try after sometime"
            aria-label="add-payment"
            open={showTooltip}
            onOpen={handleTooltipOpen}
            onClose={handleTooltipClose}
            className={classes.tooltip}
          >
            <div>
              <StyledButton
                type="blue"
                btnText="Continue"
                onClick={handleSubmit}
                disabled={!shouldContinueBeEnabled()}
              />
            </div>
          </Tooltip>
        </div>
      </div>
    </Fragment>
  );
};

export default withStyles(useStyles)(MetamaskFlow);
