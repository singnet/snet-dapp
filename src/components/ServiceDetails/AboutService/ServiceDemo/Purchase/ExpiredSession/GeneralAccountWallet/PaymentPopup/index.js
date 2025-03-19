import React, { useCallback, useEffect, useState } from "react";
import { withStyles } from "@mui/styles";
import { useDispatch } from "react-redux";

import { paymentActions } from "../../../../../../../../Redux/actionCreators";

import Details from "./Details";
import Purchase from "./Purchase";
import PrivateKey from "./PrivateKey";
import Summary from "./Summary";
import { useStyles } from "./styles";
import Routes from "../../../../../../../../utility/constants/Routes";
import VerifyKey from "./VerifyKey";
import { orderTypes, paymentTitles } from "../../../../../../../../utility/constants/PaymentConstants";
import { useNavigate, useParams } from "react-router-dom";
import SNETDialog from "../../../../../../../common/SNETDialog";
import ProgressBar from "../../../../../../../common/ProgressBar";

const indexOfPurchaseSection = {
  [orderTypes.CREATE_WALLET]: 1,
  [orderTypes.TOPUP_WALLET]: 1,
  [orderTypes.CREATE_CHANNEL]: 2,
};

const PaymentPopup = ({
  classes,
  setCreateWalletType,
  isVisible,
  handleClose,
  paymentModalType,
  isPaypalInProgress,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orgId, serviceId } = useParams();

  const [activeSection, setActiveSection] = useState(0);
  const [userProvidedPrivateKey, setUserProvidedPrivateKey] = useState();
  const [priceInfo, setPriceInfo] = useState({ amount: "", item: "", quantity: "" });
  const [privateKeyGenerated, setPrivateKeyGenerated] = useState();

  const title = paymentTitles[paymentModalType];

  useEffect(() => {
    if (isPaypalInProgress) {
      setActiveSection(indexOfPurchaseSection[paymentModalType]);
    }
  }, [isPaypalInProgress, paymentModalType]);

  const handleCancel = () => {
    dispatch(paymentActions.updatePaypalCompleted());
    resetPaymentPopup();
  };

  const handleLostPrivateKey = () => {
    handleCancel();
    setCreateWalletType();
  };

  const resetPaymentPopup = () => {
    handleClose();
    setActiveSection(0);
    navigate(`/${Routes.SERVICE_DETAILS}/org/${orgId}/service/${serviceId}/tab/0`);
  };

  const handleNextSection = useCallback(() => {
    setActiveSection(activeSection + 1);
  }, [activeSection]);

  const progressBarDataAllFields = [
    {
      key: "verifyKey",
      label: "Key",
      component: (
        <VerifyKey
          handleNextSection={handleNextSection}
          handleUserProvidedPrivateKey={setUserProvidedPrivateKey}
          handleLostPrivateKey={handleLostPrivateKey}
        />
      ),
    },
    {
      key: "details",
      label: "Details",
      component: (
        <Details
          handleNextSection={handleNextSection}
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
          setAmount={setPriceInfo}
          setPrivateKeyGenerated={setPrivateKeyGenerated}
          handleCancel={handleCancel}
          handleNext={handleNextSection}
        />
      ),
    },
    {
      key: "privateKey",
      label: "Key",
      component: <PrivateKey privateKey={privateKeyGenerated} handleNextSection={handleNextSection} />,
    },
    {
      key: "summary",
      label: "Summary",
      component: (
        <Summary
          amount={priceInfo.amount}
          item={priceInfo.item}
          quantity={priceInfo.quantity}
          handlePaymentComplete={handleCancel}
          orderType={paymentModalType}
        />
      ),
    },
  ];

  const progressBarDataTopUp = progressBarDataAllFields.filter((el) => !el.key.includes("Key"));
  const progressBarDataCreateWallet = progressBarDataAllFields.filter((el) => !el.key.includes("verifyKey"));
  const progressBarDataCreateChannel = progressBarDataAllFields.filter((el) => !el.key.includes("privateKey"));

  const progressBarData = {
    [orderTypes.CREATE_WALLET]: progressBarDataCreateWallet,
    [orderTypes.TOPUP_WALLET]: progressBarDataTopUp,
    [orderTypes.CREATE_CHANNEL]: progressBarDataCreateChannel,
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
