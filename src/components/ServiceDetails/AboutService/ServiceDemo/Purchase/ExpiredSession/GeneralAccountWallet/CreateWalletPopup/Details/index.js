import React, { useState } from "react";
import { withStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import InfoIcon from "@material-ui/icons/Info";
import Avatar from "@material-ui/core/Avatar";

import PaymentInfoCard from "../../../../PaymentInfoCard";
import StyledDropdown from "../../../../../../../../common/StyledDropdown";
import StyledButton from "../../../../../../../../common/StyledButton";
import StyledTextField from "../../../../../../../../common/StyledTextField";
import SingularityLogo from "../../../../../../../../../assets/images/avatar.png";
import { useStyles } from "./styles";
import snetValidator from "../../../../../../../../../utility/snetValidator";
import { paymentGatewayConstraints } from "./validationConstraints";
import AlertBox, { alertTypes } from "../../../../../../../../common/AlertBox";
import { USDToAgi } from "../../../../../../../../../utility/PricingStrategy";

export const paymentTypes = [{ value: "paypal", label: "Pay pal" }];

const Details = ({ classes, initiatePayment }) => {
  const [payType, setPayType] = useState("default");
  const [amount, setAmount] = useState(null);
  const [alert, setAlert] = useState({});
  const [currency] = useState("USD");

  const handlePayTypeChange = event => {
    const { value } = event.target;
    if (value !== "default") {
      setPayType(value);
    }
  };

  const handleAmountChange = event => setAmount(event.target.value);

  const handleContinue = () => {
    setAlert({});
    const isNotValid = snetValidator({ payType, amount }, paymentGatewayConstraints);
    if (isNotValid) {
      setAlert({ type: alertTypes.ERROR, message: isNotValid[0] });
      return;
    }
    initiatePayment(payType, amount, currency, "AGI", USDToAgi(amount));
  };

  return (
    <div className={classes.deatilsTabContainer}>
      <Typography variant="body1" className={classes.deatilsTabDesc}>
        Information about the Payment type and Amount. Lorem ipsum dolor sita am et, at euismod tincidunt per. Vix case
        discere ne, ea erant singulis vels. Nibhas aliquip prompta quo ex, hinc nobis no his.
      </Typography>

      <div className={classes.providerAndBalanceInfo}>
        <div className={classes.providerDetails}>
          <Avatar alt="Singularity" src={SingularityLogo} className={classes.avatar} />
          <div>
            <Typography variant="body2" className={classes.providerName}>
              Service Provider 1
            </Typography>
            <Typography variant="body2" className={classes.noOfService}>
              3 AI Services
            </Typography>
          </div>
        </div>
        <PaymentInfoCard title="Channel Balance" value=".00000000" unit />
      </div>

      <div className={classes.dropDownTextfield}>
        <div className={classes.paymentTypeDropDownContainer}>
          <InfoIcon className={classes.infoIconContainer} />
          <div className={classes.paymentTypeDropDown}>
            <Typography className={classes.dropDownTitle} variant="subtitle1">
              Payment Channel
            </Typography>
            <StyledDropdown
              labelTxt="Select a Payment Gateway"
              list={paymentTypes}
              value={payType}
              onChange={handlePayTypeChange}
            />
          </div>
        </div>
        <div className={classes.purchaseAmtTextfield}>
          <StyledTextField label="Purchase Amount (in $USD)" value={amount} onChange={handleAmountChange} />
          <Typography variant="body2">{USDToAgi(amount) || 0} AGI Tokens</Typography>
        </div>
      </div>
      <AlertBox type={alert.type} message={alert.message} />

      <div className={classes.btnContainer}>
        <StyledButton btnText="cancel" type="transparent" />
        <StyledButton btnText="Continue" type="blue" onClick={handleContinue} />
      </div>
    </div>
  );
};

export default withStyles(useStyles)(Details);
