import React from "react";
import { withStyles } from "@material-ui/styles";

import AlertBox from "../../../../../../../../common/AlertBox";
import StyledButton from "../../../../../../../../common/StyledButton";
import { useStyles } from "./styles";

const generateSupportMail = (orderId, errorMsg) => {
  const subject = `Order id: ${orderId}`;
  const body = `Error: ${errorMsg}%0d%0aPlease brief your issue below:%0d%0a...`;
  return `mailto:${process.env.REACT_APP_SNET_SUPPORT_MAIL}?subject=${subject}&body=${body}`;
};

const PurchaseAlert = ({ classes, alert, handleCancel, orderId }) => {
  return (
    <div className={classes.purchaseErrorContainer}>
      <AlertBox type={alert.type} message={alert.message} />
      <div className={classes.btnContainer}>
        <StyledButton type="transparent" btnText="cancel" onClick={handleCancel} />
        <StyledButton
          type="transparent"
          btnText="support"
          href={generateSupportMail(orderId, alert.mailerErrContent)}
          newTab
        />
      </div>
    </div>
  );
};

export default withStyles(useStyles)(PurchaseAlert);
