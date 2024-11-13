import React, { useEffect, useState } from "react";
import { withStyles } from "@mui/styles";
import Modal from "@mui/material/Modal";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import CardContent from "@mui/material/CardContent";
import { useDispatch, useSelector } from "react-redux";
import isEmpty from "lodash/isEmpty";
import pickBy from "lodash/pickBy";

import { paymentActions, userActions } from "../../../../../../../../Redux/actionCreators";
import { groupInfo as getGroupInfo } from "../../../../../../../../Redux/reducers/ServiceDetailsReducer";
import { channelInfo as getChannelInfo } from "../../../../../../../../Redux/reducers/UserReducer";

import Details from "./Details";
import Purchase from "./Purchase";
import PrivateKey from "./PrivateKey";
import Summary from "./Summary";
import PopupDetails from "../PopupDetails";
import { useStyles } from "./styles";
import Routes from "../../../../../../../../utility/constants/Routes";
import VerifyKey from "./VerifyKey";
import { orderTypes } from "../../../../../../../../utility/constants/PaymentConstants";
import { useNavigate, useParams } from "react-router-dom";

const indexOfPurchaseSection = {
  [orderTypes.CREATE_WALLET]: 2,
  [orderTypes.TOPUP_WALLET]: 2,
  [orderTypes.CREATE_CHANNEL]: 3,
};

const PaymentPopup = ({ classes, visible, orderType, title, handleLostPrivateKey, updateSignature }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orgId, serviceId } = useParams();

  const paypalInProgress = useSelector((state) => state.paymentReducer.paypalInProgress);
  const group = useSelector((state) => getGroupInfo(state));
  const channelInfo = useSelector((state) => getChannelInfo(state));

  const [activeSection, setActiveSection] = useState(1);
  const [privateKeyGenerated, setPrivateKeyGenerated] = useState();
  const [userProvidedPrivateKey, setUserProvidedPrivateKey] = useState();
  const [amount, setAmount] = useState("");
  const [item, setItem] = useState("");
  const [quantity, setQuantity] = useState("");

  const progressText = [{ label: "Details" }, { label: "Purchase" }, { label: "Summary" }];

  const purchaseWallet = () => {
    if (paypalInProgress.orderType === orderType) {
      setActiveSection(indexOfPurchaseSection[orderType]);
    }
  };

  useEffect(() => {
    if (!isEmpty(paypalInProgress)) {
      purchaseWallet();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePaymentComplete = () => {
    dispatch(paymentActions.updatePaypalCompleted());
    handleClose();
  };

  const handleClose = () => {
    if (activeSection === indexOfPurchaseSection[orderType]) {
      return;
    }
    handleCancel();
  };

  const handleCancel = () => {
    dispatch(paymentActions.updatePaypalCompleted());
    resetPaymentPopup();
  };

  const resetPaymentPopup = () => {
    handleClose();
    setActiveSection(1);
    navigate(`/${Routes.SERVICE_DETAILS}/org/${orgId}/service/${serviceId}`);
  };

  const handleNextSection = () => {
    setActiveSection(activeSection + 1);
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
      order_type: orderType,
      signature: base64Signature,
      wallet_address: address,
      current_block_number: currentBlockNumber,
    };

    const enhancedItemDetails = pickBy(itemDetails, (el) => el !== undefined);

    const paymentObj = {
      price: { amount: Number(amount), currency },
      item_details: enhancedItemDetails,
      payment_method: payType,
    };

    return dispatch(paymentActions.initiatePayment(paymentObj));
  };

  const executePaymentCompleted = async (data, orgId, group_id) => {
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
  };

  const handleExecutePayment = async () => {
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
      await executePaymentCompleted(data, orgId, group.group_id);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.data && error.response.data.data.private_key) {
        await executePaymentCompleted(error.response.data.data, orgId, group.group_id);
        return;
      }
      throw error;
    }
  };

  const PopupProgressBarComponents = [
    {
      key: "details",
      component: (
        <Details
          handleNextSection={handleNextSection}
          initiatePayment={handleInitiatePayment}
          handleClose={handleClose}
          channelInfo={channelInfo}
          userProvidedPrivateKey={userProvidedPrivateKey}
          orderType={orderType}
        />
      ),
    },
    {
      key: "purchase",
      component: (
        <Purchase
          paypalInProgress={paypalInProgress}
          executePayment={handleExecutePayment}
          handleCancel={handleCancel}
        />
      ),
    },
    {
      key: "summary",
      component: (
        <Summary
          amount={amount}
          item={item}
          quantity={quantity}
          handlePaymentComplete={handlePaymentComplete}
          orderType={orderType}
        />
      ),
    },
  ];

  if (orderType === orderTypes.CREATE_WALLET) {
    progressText.splice(2, 0, { label: "Verify Key" });
    PopupProgressBarComponents.splice(2, 0, {
      key: "privateKey",
      component: <PrivateKey privateKey={privateKeyGenerated} handleNextSection={handleNextSection} />,
    });
  }

  if (orderType === orderTypes.CREATE_CHANNEL) {
    progressText.splice(0, 0, { label: "Verify Key" });
    PopupProgressBarComponents.splice(0, 0, {
      key: "verifyKey",
      component: (
        <VerifyKey
          handleNextSection={handleNextSection}
          handleLostPrivateKey={handleLostPrivateKey}
          updateSignature={updateSignature}
          handleUserProvidedPrivateKey={() => setUserProvidedPrivateKey(userProvidedPrivateKey)}
        />
      ),
    });
  }

  return (
    <div className={classes.generalAccWalletContainer}>
      <Modal open={visible} onClose={handleClose} className={classes.Modal}>
        <Card className={classes.card}>
          <CardHeader
            className={classes.CardHeader}
            title={title}
            action={
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            }
          />
          <CardContent className={classes.CardContent}>
            {PopupProgressBarComponents.map((item, index) => (
              <PopupDetails
                item={item}
                key={item.key}
                active={activeSection === index + 1}
                activeSection={activeSection}
                progressText={progressText}
              />
            ))}
          </CardContent>
        </Card>
      </Modal>
    </div>
  );
};

export default withStyles(useStyles)(PaymentPopup);
