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
import { walletTypes } from '../../../Redux/actionCreators/UserActions';

class NetworkChangeOverlay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      invalidMetaMaskDetails: this.showMetaMaskConfigMismatchOverlay(),
    }
  }

  componentDidMount() {
    window.addEventListener('snetMMAccountChanged', this.handleMetaMaskAccountChange);
    window.addEventListener('snetMMNetworkChanged', this.handleMetaMaskNetworkChange);
  }

  componentWillUnmount() {
    document.removeEventListener('snetMMAccountChanged', this.handleMetaMaskAccountChange);
    document.removeEventListener('snetMMNetworkChanged', this.handleMetaMaskNetworkChange);
  }

  showMetaMaskConfigMismatchOverlay() {
    const { wallet } = this.props;
    if(wallet && wallet.type !== walletTypes.METAMASK) {
      return false;
    }

    const web3Provider = window.ethereum;
    if (!web3Provider) {
      return false;
    }

    const sameNetwork = web3Provider.networkVersion === process.env.REACT_APP_ETH_NETWORK;
    if (!sameNetwork) {
      return true;
    }

    const sameAddress = web3Provider.selectedAddress.toLowerCase() === wallet.address.toLowerCase();
    return !sameAddress;
  }

  handleMetaMaskAccountChange = (event) => {
    const { wallet } = this.props;
    if(wallet.type !== walletTypes.METAMASK) {
      return;
    }
    const { address: currentAddress } = wallet;
    const { detail: { address } } = event;
    const sameAddress = address.toLowerCase() === currentAddress.toLowerCase();
    this.setState({ invalidMetaMaskDetails: !sameAddress });
  };

  handleMetaMaskNetworkChange = ({ detail: { network } }) => {
    const { wallet } = this.props;
    if(wallet.type !== walletTypes.METAMASK) {
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
          <CardHeader title={<h4>Incorrect Metamask Channel</h4>} />
          <Divider />
          <CardContent>
            <AlertBox
              type="warning"
              message="Kindly check the channel which you have set on Metamask. Please switch it to {{channelname}} to continue using the services."
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
