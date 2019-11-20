import React, { useState } from "react";
import { withStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import InfoIcon from "@material-ui/icons/Info";
import Avatar from "@material-ui/core/Avatar";
import { connect } from "react-redux";
import Web3 from "web3";
import isEmpty from "lodash/isEmpty";
import MPEContract from "singularitynet-platform-contracts/networks/MultiPartyEscrow";

import PaymentInfoCard from "../../../../PaymentInfoCard";
import StyledDropdown from "../../../../../../../../common/StyledDropdown";
import StyledButton from "../../../../../../../../common/StyledButton";
import SingularityLogo from "../../../../../../../../../assets/images/avatar.png";
import { useStyles } from "./styles";
import snetValidator from "../../../../../../../../../utility/snetValidator";
import { paymentGatewayConstraints } from "./validationConstraints";
import AlertBox, { alertTypes } from "../../../../../../../../common/AlertBox";
import { tenYearBlockOffset } from "../../../../../../../../../utility/PricingStrategy";
import { groupInfo, currentServiceDetails } from "../../../../../../../../../Redux/reducers/ServiceDetailsReducer";
import { decodeGroupId } from "../../../../../../../../../utility/sdk";
import { USDToAgi, USDToCogs } from "../../../../../../../../../Redux/reducers/PaymentReducer";
import { orderTypes } from "../../../../../../../../../utility/constants/PaymentConstants";
import AGITokens from "./AGITokens";

export const paymentTypes = [{ value: "paypal", label: "Paypal" }];
const paymentAmounts = [{ value: 2, label: "2" }, { value: 3, label: "3" }, { value: 5, label: "5" }];

const web3 = new Web3(process.env.REACT_APP_WEB3_PROVIDER, null, {});

const description = {
  [orderTypes.CREATE_WALLET]: `Please enter the payment type in the box below, along with the amount you would 
  like to enter into the paymentchannel.`,
  [orderTypes.TOPUP_WALLET]: `Please enter the payment type in the box below, along with the amount you would like to top up.`,
  [orderTypes.CREATE_CHANNEL]: `Please enter the payment type in the box below, along with the amount you would like to enter into the payment channel.`,
};

const Details = props => {
  const {
    classes,
    initiatePayment,
    handleClose,
    channelInfo,
    orderType,
    userProvidedPrivateKey: privateKey,
    groupInfo,
    serviceDetails,
    USDToAgi,
    USDToCogs,
  } = props;

  const [payType, setPayType] = useState("default");
  const [amount, setAmount] = useState(undefined);
  const [alert, setAlert] = useState({});
  const [currency] = useState("USD");

  const handlePayTypeChange = event => {
    const { value } = event.target;
    if (value !== "default") {
      setPayType(value);
    }
  };

  const handleAmountChange = event => {
    const { value } = event.target;
    if (value !== "default") {
      setAmount(value);
    }
  };

  const generateSignature = async () => {
    const account = web3.eth.accounts.privateKeyToAccount(privateKey);
    const address = account.address;
    web3.eth.accounts.wallet.add(account);
    web3.eth.defaultAccount = address;
    const recipient = groupInfo.payment.payment_address;
    const hexGroupId = decodeGroupId(groupInfo.group_id);
    const amountInCogs = USDToCogs(amount);
    const currentBlockNumber = await web3.eth.getBlockNumber();
    const mpeContractAddress = web3.utils.toChecksumAddress(MPEContract[process.env.REACT_APP_ETH_NETWORK].address);
    // block no is mined in 15 sec on average, setting expiration as 10 years
    const expiration = currentBlockNumber + tenYearBlockOffset;
    const sha3Message = web3.utils.soliditySha3(
      { t: "string", v: "__openChannelByThirdParty" },
      { t: "address", v: mpeContractAddress },
      { t: "address", v: process.env.REACT_APP_EXECUTOR_WALLET_ADDRESS },
      { t: "address", v: process.env.REACT_APP_SNET_SIGNER_ADDRESS },
      { t: "address", v: recipient },
      { t: "bytes32", v: hexGroupId },
      { t: "uint256", v: amountInCogs },
      { t: "uint256", v: expiration },
      { t: "uint256", v: currentBlockNumber }
    );
    const { signature } = await web3.eth.accounts.sign(sha3Message, privateKey);
    return Promise.resolve({ signature, address, currentBlockNumber });
  };

  const handleContinue = async () => {
    setAlert({});
    const isNotValid = snetValidator({ payType, amount }, paymentGatewayConstraints);
    if (isNotValid) {
      setAlert({ type: alertTypes.ERROR, message: isNotValid[0] });
      return;
    }
    try {
      const amountInAGI = USDToAgi(amount);
      if (orderType === orderTypes.CREATE_CHANNEL) {
        var { signature, address, currentBlockNumber } = await generateSignature();
      }
      await initiatePayment(payType, amount, currency, "AGI", amountInAGI, signature, address, currentBlockNumber);
    } catch (error) {
      setAlert({ type: alertTypes.ERROR, message: `${error.message}. Please try again` });
    }
  };

  return (
    <div className={classes.deatilsTabContainer}>
      <Typography variant="body1" className={classes.deatilsTabDesc}>
        {description[orderType]}
      </Typography>
      <div className={classes.providerAndBalanceInfo}>
        <div className={classes.providerDetails}>
          <Avatar alt="Singularity" src={SingularityLogo} className={classes.avatar} />
          <div>
            <Typography variant="body2" className={classes.providerName}>
              {serviceDetails.organization_name}
            </Typography>
          </div>
        </div>
        <PaymentInfoCard
          title="Channel Balance"
          show={!isEmpty(channelInfo)}
          value={channelInfo.balanceInAgi}
          unit="AGI"
        />
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
          <div className={classes.paymentTypeDropDown}>
            <Typography className={classes.dropDownTitle} variant="subtitle1">
              Amount in USD
            </Typography>
            <StyledDropdown
              labelTxt="Select an Amount"
              list={paymentAmounts}
              value={amount}
              onChange={handleAmountChange}
            />
          </div>
          <AGITokens amount={USDToAgi(amount)} />
        </div>
      </div>
      <AlertBox type={alert.type} message={alert.message} />
      <div className={classes.btnContainer}>
        <StyledButton btnText="cancel" type="transparent" onClick={handleClose} />
        <StyledButton btnText="Continue" type="blue" onClick={handleContinue} />
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  groupInfo: groupInfo(state),
  serviceDetails: currentServiceDetails(state),
  USDToAgi: USDToAgi(state),
  USDToCogs: USDToCogs(state),
});

export default connect(mapStateToProps)(withStyles(useStyles)(Details));
