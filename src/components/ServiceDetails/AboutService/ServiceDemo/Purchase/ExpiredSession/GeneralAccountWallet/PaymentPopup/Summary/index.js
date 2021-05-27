import React from "react";
import { withStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
// import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import StyledButton from "../../../../../../../../common/StyledButton";
import { useStyles } from "./styles";
import StyledTable from "../../../../../../../../common/StyledTable";
import InfoIcon from "@material-ui/icons/Info";
import { agiInDecimal } from "../../../../../../../../../utility/PricingStrategy";
import { currentServiceDetails } from "../../../../../../../../../Redux/reducers/ServiceDetailsReducer";
import { orderTypes } from "../../../../../../../../../utility/constants/PaymentConstants";

const successMessage = {
  [orderTypes.CREATE_WALLET]: "Successfully Created Wallet for :",
  [orderTypes.TOPUP_WALLET]: "Successfully Topped Up the Wallet for :",
  [orderTypes.CREATE_CHANNEL]: "Successfully Linked the Wallet for :",
};

const Summary = props => {
  const { classes, amount, item, quantity, handlePaymentComplete, serviceDetails, orderType } = props;

  const columns = [
    { key: "item", label: "Total $USD spent" },
    { key: "amount", label: `$${amount}` },
  ];

  const rows = [
    {
      key: 1,
      values: [{ label: "Total AGIX tokens", icon: InfoIcon }, { label: `${agiInDecimal(quantity)} ${item}` }],
      highlight: true,
    },
  ];

  return (
    <div className={classes.summaryContainer}>
      <Typography variant="body2" className={classes.successMsg}>
        {successMessage[orderType]} {serviceDetails.organization_name}
      </Typography>
      <StyledTable title="Transaction Receipt" columns={columns} rows={rows} />
      <div className={classes.btnContainer}>
        <StyledButton type="blue" btnText="finish" onClick={handlePaymentComplete} />
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  serviceDetails: currentServiceDetails(state),
});

export default connect(mapStateToProps)(withStyles(useStyles)(Summary));
