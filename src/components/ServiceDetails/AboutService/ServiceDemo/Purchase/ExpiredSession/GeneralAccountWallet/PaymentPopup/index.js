import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import Modal from "@material-ui/core/Modal";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import CardContent from "@material-ui/core/CardContent";
import { connect } from "react-redux";
import isEmpty from "lodash/isEmpty";
import { withRouter } from "react-router-dom";
import pickBy from "lodash/pickBy";

import Details from "./Details";
import Purchase from "./Purchase";
import PrivateKey from "./PrivateKey";
import Summary from "./Summary";
import PopupDetails from "../PopupDetails";
import { useStyles } from "./styles";
import { paymentActions, userActions } from "../../../../../../../../Redux/actionCreators";
import { groupInfo } from "../../../../../../../../Redux/reducers/ServiceDetailsReducer";
import Routes from "../../../../../../../../utility/constants/Routes";
import { channelInfo } from "../../../../../../../../Redux/reducers/UserReducer";
import VerifyKey from "./VerifyKey";
import { orderTypes } from "../../../../../../../../utility/constants/PaymentConstants";

const indexOfPurchaseSection = {
  [orderTypes.CREATE_WALLET]: 2,
  [orderTypes.TOPUP_WALLET]: 2,
  [orderTypes.CREATE_CHANNEL]: 3,
};

class PaymentPopup extends Component {
  state = {
    activeSection: 1,
    privateKeyGenerated: undefined,
    userProvidedPrivateKey: undefined,
    amount: "",
    item: "",
    quantity: "",
  };

  componentDidMount = () => {
    if (!isEmpty(this.props.paypalInProgress)) {
      this.purchaseWallet();
    }
  };

  purchaseWallet = () => {
    const {
      paypalInProgress: { orderType },
    } = this.props;
    if (orderType === this.props.orderType) {
      this.setState({ activeSection: indexOfPurchaseSection[orderType] });
    }
  };

  handlePaymentComplete = () => {
    this.props.paypalCompleted();
    this.handleClose();
  };

  handleUserProvidedPrivateKey = userProvidedPrivateKey => {
    this.setState({ userProvidedPrivateKey });
  };

  handleClose = () => {
    const { orderType } = this.props;
    if (this.state.activeSection === indexOfPurchaseSection[orderType]) {
      return;
    }
    this.handleCancel();
  };

  handleCancel = () => {
    this.props.paypalCompleted();
    this.resetPaymentPopup();
  };

  resetPaymentPopup = () => {
    const {
      handleClose,
      match: {
        params: { orgId, serviceId },
      },
      history,
    } = this.props;
    handleClose();
    this.setState({ activeSection: 1 });
    history.push(`/${Routes.SERVICE_DETAILS}/org/${orgId}/service/${serviceId}`);
  };

  handleNextSection = () => {
    this.setState({ activeSection: this.state.activeSection + 1 });
  };

  handleInitiatePayment = (payType, amount, currency, item, quantity, base64Signature, address, currentBlockNumber) => {
    const {
      match: {
        params: { orgId, serviceId },
      },
      group: {
        group_id,
        payment: { payment_address },
      },
      initiatePayment,
      orderType,
    } = this.props;

    const itemDetails = {
      item,
      quantity: Number(quantity),
      org_id: orgId,
      service_id: serviceId,
      group_id,
      recipient: payment_address,
      order_type: orderType,
      signature: base64Signature,
      wallet_address: address,
      current_block_number: currentBlockNumber,
    };

    const enhancedItemDetails = pickBy(itemDetails, el => el !== undefined);

    const paymentObj = {
      price: { amount: Number(amount), currency },
      item_details: enhancedItemDetails,
      payment_method: payType,
    };

    return initiatePayment(paymentObj);
  };

  executePaymentCompleted = async (data, orgId, group_id) => {
    const { fetchWalletDetails } = this.props;

    await fetchWalletDetails(orgId, group_id);
    const {
      private_key: privateKeyGenerated,
      item_details: { item, quantity },
      price: { amount },
    } = data;
    this.setState({ privateKeyGenerated, amount, quantity, item });
    this.handleNextSection();
    return;
  };

  handleExecutePayment = async () => {
    const {
      paypalInProgress: { orderId, paymentId, paypalPaymentId, PayerID },
      match: {
        params: { orgId },
      },
      group: { group_id },
      executePayment,
    } = this.props;

    const paymentExecObj = {
      order_id: orderId,
      payment_id: paymentId,
      payment_details: {
        payer_id: PayerID,
        payment_id: paypalPaymentId,
      },
    };

    try {
      const { data } = await executePayment(paymentExecObj);
      await this.executePaymentCompleted(data, orgId, group_id);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.data && error.response.data.data.private_key) {
        await this.executePaymentCompleted(error.response.data.data, orgId, group_id);
        return;
      }
      throw error;
    }
  };

  render() {
    const {
      classes,
      visible,
      paypalInProgress,
      orderType,
      title,
      channelInfo,
      handleLostPrivateKey,
      updateSignature,
    } = this.props;
    const { activeSection, privateKeyGenerated, amount, item, quantity, userProvidedPrivateKey } = this.state;

    const progressText = ["Details", "Purchase", "Summary"];
    const PopupProgressBarComponents = [
      {
        key: "details",
        component: (
          <Details
            handleNextSection={this.handleNextSection}
            initiatePayment={this.handleInitiatePayment}
            handleClose={this.handleClose}
            channelInfo={channelInfo}
            userProvidedPrivateKey={userProvidedPrivateKey}
            orderType={orderType}
          />
        ),
      },
      {
        key: "purchase",
        component: (
          <Purchase
            paypalInProgress={paypalInProgress}
            executePayment={this.handleExecutePayment}
            handleCancel={this.handleCancel}
          />
        ),
      },
      {
        key: "summary",
        component: (
          <Summary amount={amount} item={item} quantity={quantity} handlePaymentComplete={this.handlePaymentComplete} />
        ),
      },
    ];

    if (orderType === orderTypes.CREATE_WALLET) {
      progressText.splice(2, 0, "Verify Key");
      PopupProgressBarComponents.splice(2, 0, {
        key: "privateKey",
        component: <PrivateKey privateKey={privateKeyGenerated} handleNextSection={this.handleNextSection} />,
      });
    }

    if (orderType === orderTypes.CREATE_CHANNEL) {
      progressText.splice(0, 0, "Verify Key");
      PopupProgressBarComponents.splice(0, 0, {
        key: "verifyKey",
        component: (
          <VerifyKey
            handleNextSection={this.handleNextSection}
            handleLostPrivateKey={handleLostPrivateKey}
            updateSignature={updateSignature}
            handleUserProvidedPrivateKey={this.handleUserProvidedPrivateKey}
          />
        ),
      });
    }

    return (
      <div className={classes.generalAccWalletContainer}>
        <Modal open={visible} onClose={this.handleClose} className={classes.Modal}>
          <Card className={classes.card}>
            <CardHeader
              className={classes.CardHeader}
              title={title}
              action={
                <IconButton onClick={this.handleClose}>
                  <CloseIcon />
                </IconButton>
              }
            />
            <CardContent className={classes.CardContent}>
              {PopupProgressBarComponents.map((item, index) => (
                <PopupDetails
                  item={item}
                  key={item.key}
                  active={activeSection === index + 1}
                  activeSection={activeSection}
                  progressText={progressText}
                />
              ))}
            </CardContent>
          </Card>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  paypalInProgress: state.paymentReducer.paypalInProgress,
  group: groupInfo(state),
  channelInfo: channelInfo(state),
});

const mapDispatchToProps = dispatch => ({
  initiatePayment: paymentObj => dispatch(paymentActions.initiatePayment(paymentObj)),
  executePayment: paymentExecObj => dispatch(paymentActions.executePayment(paymentExecObj)),
  fetchWalletDetails: (orgId, groupId) => dispatch(userActions.fetchWallet(orgId, groupId)),
  paypalCompleted: () => dispatch(paymentActions.updatePaypalCompleted),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(useStyles)(PaymentPopup))
);
