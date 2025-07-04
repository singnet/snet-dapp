import React, { Fragment, useCallback, useEffect, useMemo, useRef, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { withStyles } from "@mui/styles";
import StyledButton from "../../../../../../common/StyledButton";
import PaymentInfoCard from "../../PaymentInfoCard";
import AlertBox, { alertTypes } from "../../../../../../common/AlertBox";
import { cogsToToken } from "../../../../../../../utility/PricingStrategy";
import { loaderActions } from "../../../../../../../Redux/actionCreators";
import { LoaderContent } from "../../../../../../../utility/constants/LoaderContent";
import { useStyles } from "./style";
import { isUndefined } from "lodash";

import { updateMetamaskWallet } from "../../../../../../../Redux/actionCreators/UserActions";
import { createPaymentChannelManagement, getSdk } from "../../../../../../../Redux/actionCreators/SDKActions";
import { payTypes, connectMMinfo, paymentInfoCardDatMpeBal, insufficientMpeError } from "./metadata";
import { isCallsMoreOrEqualThanMinimum } from "./helpers";
import ContinueButton from "./ContinueButton";
import DepositButton from "./DepositButton";
import PaymentOptions from "./PaymentOptions";

const MetamaskFlow = ({ classes, handleContinue, setIsLastPaidCall }) => {
  const dispatch = useDispatch();
  const paymentChannelManagementRef = useRef();
  const {
    orgId,
    serviceId,
    pricing,
    isAvailable: isServiceAvailable,
  } = useSelector((state) => state.serviceDetailsReducer.details);
  const { price_in_cogs } = pricing;
  const servicePriceInToken = useMemo(() => cogsToToken(price_in_cogs), [price_in_cogs]);
  const [mpeBalance, setMpeBalance] = useState("");
  const [selectedPayType, setSelectedPayType] = useState(payTypes.CHANNEL_BALANCE);
  const [noOfServiceCalls, setNoOfServiceCalls] = useState(1);
  const [totalPrice, setTotalPrice] = useState(servicePriceInToken);
  const [alert, setAlert] = useState({});
  const [channelBalance, setChannelBalance] = useState();
  const [isStartServiceDisable, setIsStartServiceDisable] = useState(false);

  useEffect(() => {
    try {
      dispatch(updateMetamaskWallet());
    } catch (err) {
      console.error(err);
    }
  }, [dispatch]);

  useEffect(() => {
    if (!paymentChannelManagementRef.current) return;
    const totalPriceInCogs = cogsToToken(paymentChannelManagementRef.current.noOfCallsToCogs(noOfServiceCalls));
    setTotalPrice(totalPriceInCogs);
  }, [noOfServiceCalls]);

  const handleContinueWithChanelBalance = useCallback(async () => {
    try {
      const isChannelNearToExpiry = await paymentChannelManagementRef.current.isChannelNearToExpiry();
      if (isChannelNearToExpiry) {
        await paymentChannelManagementRef.current.extendChannel();
      }
      handleContinue();
      return;
    } catch (e) {
      setAlert({ type: alertTypes.ERROR, message: e.message });
    } finally {
      dispatch(loaderActions.stopAppLoader());
    }
  }, [dispatch, handleContinue]);

  const getBalanceData = useCallback(async () => {
    setAlert({});
    dispatch(loaderActions.startAppLoader(LoaderContent.SETUP_CHANNEL_FOR_SERV_EXEC));
    try {
      const channelBalance = paymentChannelManagementRef.current.availableBalance();
      const channelBalanceInCogs = cogsToToken(channelBalance);

      if (channelBalanceInCogs >= totalPrice) {
        setIsLastPaidCall(channelBalanceInCogs === totalPrice);
        await handleContinueWithChanelBalance();
        return;
      }
      setChannelBalance(channelBalanceInCogs);
      setSelectedPayType(payTypes.MULTIPLE_CALLS);
    } catch (error) {
      console.error("get balance error: ", error);
      setAlert(connectMMinfo);
    } finally {
      dispatch(loaderActions.stopAppLoader());
    }
  }, [dispatch, handleContinueWithChanelBalance, setIsLastPaidCall, totalPrice]);

  const updateBalanceData = useCallback(async () => {
    try {
      setAlert({});
      dispatch(loaderActions.startAppLoader(LoaderContent.SETUP_CHANNEL_FOR_SERV_EXEC));
      paymentChannelManagementRef.current = await dispatch(createPaymentChannelManagement(orgId, serviceId));
      await paymentChannelManagementRef.current.updateChannelInfo();
      await getBalanceData();
      const sdk = await dispatch(getSdk());
      const escrowBalance = await sdk.account.escrowBalance();
      setMpeBalance(cogsToToken(escrowBalance));
      setIsStartServiceDisable(false);
    } catch (error) {
      console.error("error on initialize Metamask payment channel: ", error);
      setIsStartServiceDisable(true);
      setAlert(connectMMinfo);
    } finally {
      dispatch(loaderActions.stopAppLoader());
    }
  }, [dispatch, getBalanceData, orgId, serviceId]);

  const handleSubmit = useCallback(async () => {
    dispatch(loaderActions.startAppLoader(LoaderContent.SETUP_CHANNEL_FOR_SERV_EXEC));
    setAlert({});
    const paymentChannelManagement = paymentChannelManagementRef.current;
    if (noOfServiceCalls === 1) {
      setIsLastPaidCall(true);
    }

    try {
      if (mpeBalance < cogsToToken(paymentChannelManagement.noOfCallsToCogs(noOfServiceCalls))) {
        setAlert(insufficientMpeError);
        return;
      }
      !paymentChannelManagement.channel
        ? await paymentChannelManagement.openChannel(noOfServiceCalls)
        : await paymentChannelManagement.extendAndAddFunds(noOfServiceCalls);
      handleContinue();
    } catch (error) {
      console.error(error);
      setAlert({ type: alertTypes.ERROR, message: "Unable to execute the call" });
    } finally {
      dispatch(loaderActions.stopAppLoader());
    }
  }, [dispatch, noOfServiceCalls, setIsLastPaidCall, mpeBalance, handleContinue]);

  const isContinueEnabled = useMemo(() => {
    return (
      isCallsMoreOrEqualThanMinimum(noOfServiceCalls) &&
      selectedPayType &&
      isServiceAvailable &&
      (Number(mpeBalance) >= Number(totalPrice) || Number(channelBalance) >= Number(totalPrice))
    );
  }, [selectedPayType, noOfServiceCalls, isServiceAvailable, mpeBalance, channelBalance, totalPrice]);

  const shouldHighlightDeposit = useMemo(() => mpeBalance <= 0, [mpeBalance]);

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
          title={paymentInfoCardDatMpeBal.title}
          unit={paymentInfoCardDatMpeBal.unit}
          value={mpeBalance}
        />
      </div>
      <div className={classes.runServiceContainer}>
        <PaymentOptions
          totalPrice={totalPrice}
          mpeBalance={mpeBalance}
          selectedPayType={selectedPayType}
          channelBalance={channelBalance}
          setSelectedPayType={setSelectedPayType}
          setNoOfServiceCalls={setNoOfServiceCalls}
          noOfServiceCalls={noOfServiceCalls}
          servicePrice={servicePriceInToken}
        />
        <AlertBox type={alert.type} message={alert.message} />
        <div className={classes.buttonContainer}>
          <DepositButton isHighlight={shouldHighlightDeposit} />
          <ContinueButton
            handleSubmit={handleSubmit}
            isServiceAvailable={isServiceAvailable}
            isContinueEnabled={isContinueEnabled}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default withStyles(useStyles)(MetamaskFlow);

MetamaskFlow.propTypes = {
  classes: PropTypes.object.isRequired,
  handleContinue: PropTypes.func.isRequired,
  setIsLastPaidCall: PropTypes.func.isRequired,
};
