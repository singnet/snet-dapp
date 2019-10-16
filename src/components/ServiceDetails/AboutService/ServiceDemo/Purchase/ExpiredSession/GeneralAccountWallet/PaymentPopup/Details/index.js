import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import InfoIcon from "@material-ui/icons/Info";
import Avatar from "@material-ui/core/Avatar";
import { connect } from "react-redux";
import Web3 from "web3";

import PaymentInfoCard from "../../../../PaymentInfoCard";
import StyledDropdown from "../../../../../../../../common/StyledDropdown";
import StyledButton from "../../../../../../../../common/StyledButton";
import StyledTextField from "../../../../../../../../common/StyledTextField";
import SingularityLogo from "../../../../../../../../../assets/images/avatar.png";
import { useStyles } from "./styles";
import snetValidator from "../../../../../../../../../utility/snetValidator";
import { paymentGatewayConstraints } from "./validationConstraints";
import AlertBox, { alertTypes } from "../../../../../../../../common/AlertBox";
import { USDToAgi, agiToCogs } from "../../../../../../../../../utility/PricingStrategy";
import { orderTypes } from "../../";
import { parseSignature } from "../../../../../../../../../utility/sdk";
import { groupInfo } from "../../../../../../../../../Redux/reducers/ServiceDetailsReducer";

export const paymentTypes = [{ value: "paypal", label: "Pay pal" }];

let web3;

const Details = props => {
  const {
    classes,
    initiatePayment,
    handleClose,
    channelInfo,
    orderType,
    userProvidedPrivateKey: privateKey,
    groupInfo,
  } = props;

  const [payType, setPayType] = useState("default");
  const [amount, setAmount] = useState("");
  const [alert, setAlert] = useState({});
  const [currency] = useState("USD");

  useEffect(() => {
    if (!web3) {
      web3 = new Web3(process.env.REACT_APP_WEB3_PROVIDER, null, {});
    }
  });

  const handlePayTypeChange = event => {
    const { value } = event.target;
    if (value !== "default") {
      setPayType(value);
    }
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
      let base64Signature;
      let address;
      if (orderType === orderTypes.CREATE_CHANNEL) {
        const account = web3.eth.accounts.privateKeyToAccount(privateKey);
        // const GenWalletMatchingAcc = walletList.find(wallet => wallet.address === account.address);
        address = account.address;
        web3.eth.accounts.wallet.add(account);
        web3.eth.defaultAccount = address;
        const recipient = groupInfo.payment.payment_address;
        const decodedGroupId = atob(groupInfo.group_id);
        const amountInCogs = agiToCogs(amountInAGI);
        const currentBlockNumber = await web3.eth.getBlockNumber();
        // 1 block no is mined in 15 sec on average, setting expiration as 10 years
        const expiration = currentBlockNumber + 10 * 365 * 24 * 60 * 4;
        const sha3Message = web3.utils.soliditySha3(
          { t: "string", v: "__openChannelByThirdParty" },
          { t: "address", v: process.env.REACT_APP_MPE_CONTRACT_ADDRESS },
          { t: "address", v: account.address }, //"executor_wallet_address"
          { t: "address", v: process.env.REACT_APP_SNET_SIGNER_ADDRESS },
          { t: "address", v: recipient },
          { t: "bytes32", v: decodedGroupId },
          { t: "uint256", v: amountInCogs },
          { t: "uint256", v: expiration },
          { t: "uint256", v: currentBlockNumber }
        );

        const { signature } = await web3.eth.accounts.sign(sha3Message, privateKey);

        base64Signature = parseSignature(signature);
      }
      initiatePayment(payType, amount, currency, "AGI", amountInAGI, base64Signature, address);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log("error", error);
    }
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
        <PaymentInfoCard
          title="Channel Balance"
          show={channelInfo.balanceInAgi}
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
          <StyledTextField label="Purchase Amount (in $USD)" value={amount} onChange={e => setAmount(e.target.value)} />
          <Typography variant="body2">{USDToAgi(amount) || 0} AGI Tokens</Typography>
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
});

export default connect(mapStateToProps)(withStyles(useStyles)(Details));
