import React from "react";
import { withStyles } from "@material-ui/styles";

import { PaymentInfoCardData } from "../../../../../../utility/constants/PurchaseFlow.js";

import AlertBox from "../../../../../common/AlertBox";
import StyledButton from "../../../../../common/StyledButton";
import PaymentInfoCard from "../PaymentInfoCard";
import ChannelSelectionBox from "../ChannelSelectionBox";
import { useStyles } from "./styles";

const ExpiredSession = ({ classes, handleComplete, metamask }) => {
  if (metamask) {
    return (
      <div className={classes.PurchaseFlowContainer}>
      <p className={classes.PurchaseFlowDescription}>Transfer the style of a “style Image” to a “content image” by choosing them in the boxes below.  You can upload a a file from your computer, URL, or select image from the gallery.  You can specify additional parameters in the panel below.  “Mouse over” for tool tips.</p>
        <div className={classes.paymentInfoCard}>
          {PaymentInfoCardData.map(item => (          
            <PaymentInfoCard
              title = {item.title}
              value = {item.value}
              unit = {item.unit}
            />
          ))}        
        </div>
        <div className={classes.ChannelSelectionBoxMainContainer}>
          <div>
            <span className={classes.channelSelectionTitle}>Recommended</span>
            <ChannelSelectionBox 
              title = "Channel Balance"
              description = "You have 0.065627 tokens in you channel. This can be used for running demos across all the services from this vendor." 
              checked = {true}
            />
          </div>
          <div>
            <span className={classes.channelSelectionTitle}>Best Value</span>
            <ChannelSelectionBox 
              title = "Multiple Calls"
              description = "Select the no of calls you want to make. The tokens are purchased from the available escrow balance. This  option helps save the gas cost." 
              checked = {false}
              hasInput
            />
            <ChannelSelectionBox 
              title = "Single Call"
              description = "Tokens are purchsed for a single call. The tokens are purchsed from the available escrow balance." 
              checked = {false}
              hasInput
            />
          </div>
        </div>
        <div className={classes.buttonContainer}>
          <StyledButton type="transparent" btnText="Deposit into Escrow" />
          <StyledButton type="blue" btnText="Continue" />
        </div>
      </div>
    )
  }
  return (
    <div className={classes.ExpiredSessionContainer}>
      <AlertBox
        type="warning"
        message="You have used all your free quota for this service.  Please add a payment method to continue using this service. To know more about adding credits to your acount "
        link="Click here"
      />
      <StyledButton type="blue" btnText="add payment" onClick={handleComplete} />
    </div>
  );
};

export default withStyles(useStyles)(ExpiredSession);
