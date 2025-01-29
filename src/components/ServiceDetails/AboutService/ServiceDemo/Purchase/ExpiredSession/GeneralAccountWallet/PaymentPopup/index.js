import React, { useCallback, useEffect, useState } from "react";
import { withStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import pickBy from "lodash/pickBy";

import { paymentActions, userActions } from "../../../../../../../../Redux/actionCreators";
import { groupInfo as getGroupInfo } from "../../../../../../../../Redux/reducers/ServiceDetailsReducer";

import Details from "./Details";
import Purchase from "./Purchase";
import PrivateKey from "./PrivateKey";
import Summary from "./Summary";
import { useStyles } from "./styles";
import Routes from "../../../../../../../../utility/constants/Routes";
import VerifyKey from "./VerifyKey";
import {
  orderPayloadTypes,
  orderTypes,
  paymentTitles,
} from "../../../../../../../../utility/constants/PaymentConstants";
import { useNavigate, useParams } from "react-router-dom";
import SNETDialog from "../../../../../../../common/SNETDialog";
import ProgressBar from "../../../../../../../common/ProgressBar";

// const indexOfPurchaseSection = {
//   [orderTypes.CREATE_WALLET]: 1,
//   [orderTypes.TOPUP_WALLET]: 2,
//   [orderTypes.CREATE_CHANNEL]: 3,
// };

const PaymentPopup = ({ classes, isVisible, handleClose, paymentModalType }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orgId, serviceId } = useParams();

  const group = useSelector((state) => getGroupInfo(state));

  const [activeSection, setActiveSection] = useState(0); //indexOfPurchaseSection[paymentModalType] || 1);
  const [userProvidedPrivateKey, setUserProvidedPrivateKey] = useState();
  const [amount, setAmount] = useState("");
  const [item, setItem] = useState("");
  const [quantity, setQuantity] = useState("");
  const [privateKeyGenerated, setPrivateKeyGenerated] = useState();

  useEffect(() => {
    dispatch(paymentActions.fetchUSDConversionRate());
  }, [dispatch]);

  const title = paymentTitles[paymentModalType];

  // const purchaseWallet = () => {
  //   if (paypalInProgress.orderType === orderType) {
  //     setActiveSection(indexOfPurchaseSection[orderType]);
  //   }
  // };

  // useEffect(() => {
  //   if (!isEmpty(paypalInProgress)) {
  //     purchaseWallet();
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const handleCancel = () => {
    // if (activeSection === indexOfPurchaseSection[paymentModalType]) {
    //   return;
    // }
    dispatch(paymentActions.updatePaypalCompleted());
    resetPaymentPopup();
  };

  const resetPaymentPopup = () => {
    handleClose();
    setActiveSection(0);
    navigate(`/${Routes.SERVICE_DETAILS}/org/${orgId}/service/${serviceId}/tab/0`);
  };

  const handleNextSection = useCallback(() => {
    setActiveSection(activeSection + 1);
  }, [activeSection]);

  const handlePreviousSection = () => {
    if (activeSection > 0) {
      setActiveSection(activeSection - 1);
    }
  };

  const handleInitiatePayment = (
    payType,
    amount,
    currency,
    item,
    quantity,
    base64Signature,
    address,
    currentBlockNumber
  ) => {
    const itemDetails = {
      item,
      quantity: Number(quantity),
      org_id: orgId,
      service_id: serviceId,
      group_id: group.group_id,
      recipient: group.payment.payment_address,
      order_type: orderPayloadTypes[paymentModalType],
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

  const executePaymentCompleted = useCallback(
    async (data, orgId, group_id) => {
      await dispatch(userActions.fetchWallet(orgId, group_id));
      const {
        private_key: privateKeyGenerated,
        item_details: { item, quantity },
        price: { amount },
      } = data;
      setPrivateKeyGenerated(privateKeyGenerated);
      setAmount(amount);
      setQuantity(quantity);
      setItem(item);
      handleNextSection();
      return;
    },
    [dispatch, handleNextSection]
  );

  const progressBarDataCreateWallet = [
    {
      key: "details",
      label: "Details",
      component: (
        <Details
          handleNextSection={handleNextSection}
          initiatePayment={handleInitiatePayment}
          handleClose={handleCancel}
          userProvidedPrivateKey={userProvidedPrivateKey}
          orderType={paymentModalType}
        />
      ),
    },
    {
      key: "purchase",
      label: "Purchase",
      component: (
        <Purchase
          handleCancel={handleCancel}
          handleNext={handleNextSection}
          executePaymentCompleted={executePaymentCompleted}
        />
      ),
    },
    {
      key: "privateKey",
      label: "Key",
      component: <PrivateKey privateKey={privateKeyGenerated} handleNextSection={handleNextSection} />,
    },
    {
      key: "verifyKey",
      label: "Key",
      component: (
        <VerifyKey
          handleNextSection={handleNextSection}
          handleLostPrivateKey={handlePreviousSection}
          handleUserProvidedPrivateKey={() => setUserProvidedPrivateKey(userProvidedPrivateKey)}
        />
      ),
    },
    {
      key: "summary",
      label: "Summary",
      component: (
        <Summary
          amount={amount}
          item={item}
          quantity={quantity}
          handlePaymentComplete={handleCancel}
          orderType={paymentModalType}
        />
      ),
    },
  ];

  const progressBarDataTopUp = progressBarDataCreateWallet.filter((el) => !el.key.includes("Key"));

  const progressBarData = {
    [orderTypes.CREATE_WALLET]: progressBarDataCreateWallet,
    [orderTypes.TOPUP_WALLET]: progressBarDataTopUp,
    [orderTypes.CREATE_CHANNEL]: progressBarDataTopUp,
  };

  const progressBarDataByType = progressBarData[paymentModalType];

  if (!paymentModalType) {
    return null;
  }

  return (
    <SNETDialog isDialogOpen={isVisible} onDialogClose={handleCancel} showCloseButton={true} title={title}>
      <div className={classes.paymentPopupContainer}>
        <ProgressBar activeSection={activeSection} progressText={progressBarDataByType} />
        <div className={classes.paymentComponentContainer}>{progressBarDataByType[activeSection].component}</div>
      </div>
    </SNETDialog>
  );
};

export default withStyles(useStyles)(PaymentPopup);
