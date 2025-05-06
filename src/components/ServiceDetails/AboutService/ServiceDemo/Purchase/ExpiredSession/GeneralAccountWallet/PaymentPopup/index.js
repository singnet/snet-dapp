import React, { useCallback, useEffect, useState } from "react";
import { withStyles } from "@mui/styles";
import { useDispatch } from "react-redux";

import { paymentActions } from "../../../../../../../../Redux/actionCreators";

import Details from "./Details";
import Purchase from "./Purchase";
import Summary from "./Summary";
import { useStyles } from "./styles";
import Routes from "../../../../../../../../utility/constants/Routes";
import { paymentTitles } from "../../../../../../../../utility/constants/PaymentConstants";
import { useNavigate, useParams } from "react-router-dom";
import SNETDialog from "../../../../../../../common/SNETDialog";
import ProgressBar from "../../../../../../../common/ProgressBar";

const PaymentPopup = ({ classes, isVisible, handleClose, paymentModalType, isPaypalInProgress }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orgId, serviceId } = useParams();

  const [activeSection, setActiveSection] = useState(0);
  const [priceInfo, setPriceInfo] = useState({ amount: "", item: "", quantity: "" });

  const title = paymentTitles[paymentModalType];

  useEffect(() => {
    if (isPaypalInProgress) {
      setActiveSection(1);
    }
  }, [isPaypalInProgress, paymentModalType]);

  const handleCancel = () => {
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

  const progressBarData = [
    {
      key: "details",
      label: "Details",
      component: (
        <Details handleNextSection={handleNextSection} handleClose={handleCancel} orderType={paymentModalType} />
      ),
    },
    {
      key: "purchase",
      label: "Purchase",
      component: <Purchase setAmount={setPriceInfo} handleCancel={handleCancel} handleNext={handleNextSection} />,
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

  if (!paymentModalType) {
    return null;
  }

  return (
    <SNETDialog isDialogOpen={isVisible} onDialogClose={handleCancel} showCloseButton={true} title={title}>
      <div className={classes.paymentPopupContainer}>
        <ProgressBar activeSection={activeSection} progressText={progressBarData} />
        <div className={classes.paymentComponentContainer}>{progressBarData[activeSection].component}</div>
      </div>
    </SNETDialog>
  );
};

export default withStyles(useStyles)(PaymentPopup);
