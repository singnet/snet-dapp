import React from "react";
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

const channelTypeOptions = [{ value: "pay_pal", label: "Pay pal" }];

const Details = ({ classes }) => {
  const handlePayTypeChange = () => {
    // TODO
  };

  const handleContinue = () => {
    // this.props.handleNextSection();
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
              list={channelTypeOptions}
              value="default"
              onChange={handlePayTypeChange}
            />
          </div>
        </div>
        <div className={classes.purchaseAmtTextfield}>
          <StyledTextField label="Purchase Amount (in $USD)" />
          <Typography variant="body2">= 0.0 AGI Tokens</Typography>
        </div>
      </div>

      <div className={classes.btnContainer}>
        <StyledButton btnText="cancel" type="transparent" />
        <StyledButton btnText="Continue" type="blue" onClick={handleContinue} />
      </div>
    </div>
  );
};

export default withStyles(useStyles)(Details);
