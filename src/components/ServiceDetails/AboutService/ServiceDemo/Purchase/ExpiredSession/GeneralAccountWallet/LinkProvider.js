import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";

import { useStyles } from "./styles";
import PaymentPopup from "./PaymentPopup";
import { paymentTitles } from ".";
import { orderTypes } from "../../../../../../../utility/constants/PaymentConstants";

class LinkProviderPopup extends Component {
  state = {
    orderType: orderTypes.CREATE_CHANNEL,
    title: paymentTitles.CREATE_CHANNEL,
    signature: undefined,
  };

  handleClose = () => {
    this.setState({ orderType: orderTypes.CREATE_CHANNEL, title: paymentTitles.CREATE_CHANNEL });
    this.props.setVisibility(false);
  };

  handleLostPrivateKey = () => {
    this.setState({ orderType: orderTypes.CREATE_WALLET, title: paymentTitles.CREATE_WALLET });
  };

  handleSignatureChange = signature => {
    this.setState({ signature });
  };

  render() {
    const { visible } = this.props;

    const { orderType, title, signature } = this.state;

    return (
      <PaymentPopup
        orderType={orderType}
        visible={visible}
        handleClose={this.handleClose}
        title={title}
        handleLostPrivateKey={this.handleLostPrivateKey}
        signature={signature}
        updateSignature={this.handleSignatureChange}
      />
    );
  }
}

export default withStyles(useStyles)(LinkProviderPopup);
