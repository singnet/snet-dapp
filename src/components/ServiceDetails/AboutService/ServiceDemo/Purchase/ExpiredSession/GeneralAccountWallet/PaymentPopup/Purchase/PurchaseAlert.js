import React from "react";
import { withStyles } from "@material-ui/styles";

import AlertBox from "../../../../../../../../common/AlertBox";
import StyledButton from "../../../../../../../../common/StyledButton";
import { useStyles } from "./styles";

const PurchaseAlert = ({ classes, alert, handleCancel }) => {
  return (
    <div className={classes.purchaseErrorContainer}>
      <AlertBox type={alert.type} message={alert.message} />
      <div className={classes.btnContainer}>
        <StyledButton type="transparent" btnText="cancel" onClick={handleCancel} />
        <StyledButton type="transparent" btnText="support" />
        {/* <StyledButton type="blue" btnText="retry" /> */}
      </div>
    </div>
  );
};

export default withStyles(useStyles)(PurchaseAlert);
