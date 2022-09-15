import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Web3 from "web3";
import { withStyles } from "@material-ui/styles";
import ModelDetails from "./ModelDetails";
import StyledButton from "../../common/StyledButton";
import { useStyles } from "./styles";
import ConnectMetamask from "../ConnectMetamask";
import { initSdk } from "../../../utility/sdk";
import { walletTypes } from "../../../Redux/actionCreators/UserActions";
import { alertTypes } from "../../common/AlertBox";
import { loaderActions, userActions } from "../../../Redux/actionCreators";
import { LoaderContent } from "../../../utility/constants/LoaderContent";

const web3 = new Web3(process.env.REACT_APP_WEB3_PROVIDER, null, {});

const ExistingModel = ({ classes, showReqNewModelBtn,  startMMconnectLoader, fetchAvailableUserWallets, stopLoader, registerWallet, updateWallet, wallet,training,haveANewModel }) => {
  const [metamaskConnected, setMetamaskConnected] = useState(false);
  const [alert, setAlert] = useState({});

  useEffect(() => {
    console.log('wallet', wallet.address)
    if (wallet.address) {
      setMetamaskConnected(true);
      generateSignature(wallet.address);
    }
  }, [wallet]);

  const generateSignature = async address => {
    const currentBlockNumber = await web3.eth.getBlockNumber();
    const sha3Message = await web3.utils.soliditySha3(
      { type: "string", value: "Signature for existing models" },
      { type: "string", value: address },
      { type: "uint64", value: currentBlockNumber }
    );
    const { signature } = await web3.eth.accounts.sign(sha3Message, address);
    console.log({ signature });
  };

  const handleConnectMM = async () => {
    try {
      startMMconnectLoader();
      const sdk = await initSdk();
      const address = await sdk.account.getAddress();
      const availableUserWallets = await fetchAvailableUserWallets();
      const addressAlreadyRegistered = availableUserWallets.some(wallet => wallet.address.toLowerCase() === address);

      if (!addressAlreadyRegistered) {
        await registerWallet(address, walletTypes.METAMASK);
      }
      updateWallet({ type: walletTypes.METAMASK, address });
      console.log('@@@@@')
      setMetamaskConnected(true)
    } catch (error) {
      console.log('error', error)
      setAlert({ type: alertTypes.ERROR, message: error.message });
    }
    stopLoader();
  };
  console.log('metamask connect', metamaskConnected)

  return (
    <div className={classes.existingModelContainer}>
      <h2>Existing Model</h2>
      {
        metamaskConnected ? (
          <>
            <ModelDetails
            title="Region Recognition"
            id="4432"
            description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley."
            status="Inprogress"
            accessTo="Public"
            lastUpdate="12-Aug-2022"
          />
          {showReqNewModelBtn && (haveANewModel === true) ? 
            <div className={classes.btnContainer}>
              <StyledButton btnText="request a new model"/>
            </div>
          : null }
        </>
        ) : (
          <ConnectMetamask handleConnectMM={handleConnectMM} />
        ) 
      }
    </div>
  );
};

const mapStateToProps = state => ({
  wallet: state.userReducer.wallet,
});

const mapDispatchToProps = dispatch => ({
  startMMconnectLoader: () => dispatch(loaderActions.startAppLoader(LoaderContent.CONNECT_METAMASK)),
  fetchAvailableUserWallets: () => dispatch(userActions.fetchAvailableUserWallets()),
  registerWallet: (address, type) => dispatch(userActions.registerWallet(address, type)),
  updateWallet: ({ type, address }) => dispatch(userActions.updateWallet({ type, address })),
  stopLoader: () => dispatch(loaderActions.stopAppLoader),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(ExistingModel));
