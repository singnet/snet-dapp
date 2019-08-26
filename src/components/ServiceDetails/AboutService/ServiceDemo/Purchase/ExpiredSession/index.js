import React from "react";
import { withStyles } from "@material-ui/styles";
import { withRouter } from "react-router-dom";

import AlertBox from "../../../../../common/AlertBox";
import StyledButton from "../../../../../common/StyledButton";
import { useStyles } from "./styles";
import MetamaskFlow from "./MetamaskFlow";
import Routes from "../../../../../../utility/constants/Routes";

const ExpiredSession = ({ classes, handleComplete, metamask, groupInfo, history, handlePurchaseError }) => {
  const handleAddPayment = () => {
    history.push(`/${Routes.USER_PROFILE}`);
  };

  if (metamask) {
    return (
      <MetamaskFlow
        handleContinue={handleComplete}
        classes={classes}
        groupInfo={groupInfo}
        handlePurchaseError={handlePurchaseError}
      />
    );
  }
  return (
    <div className={classes.ExpiredSessionContainer}>
      <AlertBox
        type="warning"
        message="You have used all your free quota for this service.  Please add a payment method to continue using this service. "
        link="Click here"
      />
      <StyledButton type="blue" btnText="add payment" onClick={handleAddPayment} />
    </div>
  );
};

export default withRouter(withStyles(useStyles)(ExpiredSession));
