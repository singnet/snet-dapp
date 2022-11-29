import React, { Component } from "react";
import { connect } from "react-redux";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Modal from "@material-ui/core/Modal";
import Divider from "@material-ui/core/Divider";
import { withStyles } from "@material-ui/styles";

import AlertBox, { alertTypes } from "../AlertBox";
import { useStyles } from "./styles";
import { walletTypes } from "../../../Redux/actionCreators/UserActions";
import { initSdk } from "../../../utility/sdk";
import { Networks } from "../../../config/Networks";
import { ethereumEvents,ethereumMethods } from "../../../utility/snetSdk";
import { isNil } from "lodash";
import Web3 from "web3";

const ethereum = window.ethereum;
const web3 = new Web3(ethereum, null, {});

const accountChangeAlert = {
  header: "Incorrect Metamask Account",
  type: alertTypes.WARNING,
  message: `Kindly check the Address which you have set on Metamask. 
  Please switch it to the registered address to continue using the services.`,
};

const networkChangeAlert = {
  header: "Incorrect Metamask Network",
  type: alertTypes.WARNING,
  message: `Kindly check the network which you have set on Metamask. 
  Please switch it to ${Networks[process.env.REACT_APP_ETH_NETWORK]} to continue using the services.`,
};

class NetworkChangeOverlay extends Component {
  constructor(props) {
    super(props);
    this.state = { alert: {}, ...this.showMetaMaskConfigMismatchOverlay() };
    this._allowedNetworkId = Number(process.env.REACT_APP_ETH_NETWORK);
  }

  sdk;
  validateChainId = chainIdHex => {
    const chainId = web3.utils.hexToNumber(chainIdHex);
    if (chainId !== Number(process.env.REACT_APP_ETH_NETWORK)) {
      this.setState({ invalidMetaMaskDetails: true, alert: networkChangeAlert });
    } else {
      this.setState({ invalidMetaMaskDetails: false, alert: {} });
    }
  };

  componentDidMount() {
    if (!isNil(ethereum)) {
      ethereum.request({ method: ethereumMethods.REQUEST_CHAIN_ID }).then(this.validateChainId);
      ethereum.on(ethereumEvents.CHAIN_CHANGED, this.validateChainId);
    }
    window.addEventListener("snetMMAccountChanged", this.handleMetaMaskAccountChange);
    window.addEventListener("snetMMNetworkChanged", this.handleMetaMaskNetworkChange);
  }

  componentWillUnmount() {
    document.removeEventListener("snetMMAccountChanged", this.handleMetaMaskAccountChange);
    document.removeEventListener("snetMMNetworkChanged", this.handleMetaMaskNetworkChange);
  }

  componentDidUpdate = async prevProps => {
    if (!this.state.invalidMetaMaskDetails && prevProps.wallet.type !== this.props.wallet.type) {
      if (this.props.wallet.type === walletTypes.METAMASK) {
        if (!this.sdk) {
          this.sdk = await initSdk();
        }
        const currentNetworkId = this.sdk.account._networkId;
        this.handleMetaMaskNetworkChange({ detail: { network: currentNetworkId } });
      }
    }
  };

  showMetaMaskConfigMismatchOverlay = () => {
    const { wallet } = this.props;
    if (wallet && wallet.type !== walletTypes.METAMASK) {
      return { invalidMetaMaskDetails: false, alert: {} };
    }

    const web3Provider = window.ethereum;
    if (!web3Provider) {
      return { invalidMetaMaskDetails: false, alert: {} };
    }

    const chainIdHex = web3Provider.chainId;
    const networkId = parseInt(chainIdHex);

    const sameNetwork = networkId === this._allowedNetworkId;
    if (!sameNetwork) {
      return { invalidMetaMaskDetails: true, alert: networkChangeAlert };
    }

    const sameAddress = web3Provider.selectedAddress.toLowerCase() === wallet.address.toLowerCase();
    return { invalidMetaMaskDetails: !sameAddress, alert: accountChangeAlert };
  };

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

    this.setState({ invalidMetaMaskDetails: !sameAddress, alert: accountChangeAlert });
  };

  handleMetaMaskNetworkChange = ({ detail: { network } }) => {
    const { wallet } = this.props;
    if (wallet.type !== walletTypes.METAMASK) {
      return;
    }

    const sameNetwork = network === this._allowedNetworkId;
    this.setState({ invalidMetaMaskDetails: !sameNetwork, alert: networkChangeAlert });
  };

  render() {
    const { classes } = this.props;
    const { alert, invalidMetaMaskDetails } = this.state;
    return (
      <Modal disableBackdropClick open={invalidMetaMaskDetails}>
        <Card className={classes.card}>
          <CardHeader title={<h4>{alert.header}</h4>} />
          <Divider />
          <CardContent>
            <AlertBox type={alert.type} message={alert.message} />
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
