import React, { useState } from "react";
import { withStyles } from "@mui/styles";

import AlertBox from "../../../../../../../../common/AlertBox";
import StyledButton from "../../../../../../../../common/StyledButton";
import { useStyles } from "./styles";
import { sendFeedbackSnetAPI } from "../../../../../../../../../config/SupportAPI";
import FeedbackFormModal from "../../../../../../../../FeedbackFormModal/FeedbackFormModal";

const PurchaseAlert = ({ classes, alert, handleCancel }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <div className={classes.purchaseErrorContainer}>
      <AlertBox type={alert.type} message={alert.message} />
      <div className={classes.btnContainer}>
        <StyledButton type="transparent" btnText="cancel" onClick={handleCancel} />
        <StyledButton type="transparent" btnText="support" onClick={() => setIsModalVisible(true)} />
      </div>
      <FeedbackFormModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        sendFeedbackAPI={sendFeedbackSnetAPI}
      />
    </div>
  );
};

export default withStyles(useStyles)(PurchaseAlert);
