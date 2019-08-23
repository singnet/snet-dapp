import React, { Component } from "react";
import { connect } from "react-redux";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Modal from "@material-ui/core/Modal";
import Divider from "@material-ui/core/Divider";
import { withStyles } from "@material-ui/styles";

import AlertBox from "../AlertBox";
import { useStyles } from "./styles";
import { walletTypes } from "../../../Redux/actionCreators/UserActions";

class NetworkChangeOverlay extends Component {
  state = {
    invalidMetaMaskDetails: false,
  };

  componentDidMount() {
    window.addEventListener("snetMMAccountChanged", this.handleMetaMaskAccountChange);
    window.addEventListener("snetMMNetworkChanged", this.handleMetaMaskNetworkChange);
  }

  componentWillUnmount() {
    document.removeEventListener("snetMMAccountChanged", this.handleMetaMaskAccountChange);
    document.removeEventListener("snetMMNetworkChanged", this.handleMetaMaskNetworkChange);
  }

  handleMetaMaskAccountChange = event => {
    const { wallet } = this.props;
    if (wallet.type !== walletTypes.METAMASK) {
      return;
    }
    const { address: currentAddress } = wallet;
    const {
      detail: { address },
    } = event;
    const sameAddress = address.toLowerCase() === currentAddress.toLowerCase();
    this.setState({ invalidMetaMaskDetails: !sameAddress });
  };

  handleMetaMaskNetworkChange = ({ detail: { network } }) => {
    const { wallet } = this.props;
    if (wallet.type !== walletTypes.METAMASK) {
      return;
    }
    const sameNetwork = network === process.env.REACT_APP_ETH_NETWORK;
    this.setState({ invalidMetaMaskDetails: !sameNetwork });
  };

  render() {
    const { classes } = this.props;
    return (
      <Modal disableBackdropClick open={this.state.invalidMetaMaskDetails}>
        <Card className={classes.card}>
          <CardHeader title={<h4>Incorrect Metamask Network</h4>} />
          <Divider />
          <CardContent>
            <AlertBox
              type="warning"
              message="Kindly check the channel which you have set on Metamask. Please switch it to Mainnet to continue using the services."
            />
          </CardContent>
        </Card>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  wallet: state.userReducer.wallet,
});

export default connect(mapStateToProps)(withStyles(useStyles)(NetworkChangeOverlay));
