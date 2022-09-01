import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import { useStyles } from "./styles";
import DemoToggler from "./DemoToggler";
import ServiceOverview from "./ServiceOverview";
import CreatorDetails from "../CreatorDetails";
import ProjectDetails from "../ProjectDetails";
import MediaGallery from "../MediaGallery";
import PromoBox from "./PromoBox";
import ExistingModel from "../ExistingModel";
import AlertBox, { alertTypes } from "../../common/AlertBox";
import StyledButton from "../../common/StyledButton";
import { initSdk } from "../../../utility/sdk";
import { LoaderContent } from "../../../utility/constants/LoaderContent";
import Web3 from "web3";
import { loaderActions, userActions } from "../../../Redux/actionCreators";
import { walletTypes } from "../../../Redux/actionCreators/UserActions";

const web3 = new Web3(process.env.REACT_APP_WEB3_PROVIDER, null, {});

const connectMMinfo = {
  type: alertTypes.WARNING,
  message: `Please install Metamask and use your Metamask wallet to connect to SingularityNet. 
Click below to connect.`,
};

const AboutService = ({
  classes,
  isLoggedIn,
  service,
  history,
  serviceAvailable,
  demoExampleRef,
  scrollToView,
  demoComponentRequired,
  startMMconnectLoader,
  stopLoader,
  registerWallet,
  updateWallet,
  fetchAvailableUserWallets,
  wallet,
}) => {
  const [MMconnected, setMMConnected] = useState(false);
  const [alert, setAlert] = useState({});
  useEffect(() => {
    if (wallet.address) {
      setMMConnected(true);
      generateSignature(wallet.address);
    }
  }, [wallet]);

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
    } catch (error) {
      setAlert({ type: alertTypes.ERROR, message: error.message });
    }
    stopLoader();
  };

  const generateSignature = async address => {
    const currentBlockNumber = await web3.eth.getBlockNumber();
    const sha3Message = await web3.utils.soliditySha3(
      { type: "string", value: "Signaute for existing models" },
      { type: "string", value: address },
      { type: "uint64", value: currentBlockNumber }
    );
    const { signature } = await web3.eth.accounts.sign(sha3Message, address);
    console.log({ signature });
  };

  const RenderExistingModel = () => {
    if (process.env.REACT_APP_TRAINING_ENABLE === "true") {
      return !MMconnected ? (
        <div className={classes.connectMatamaskContainer}>
          <AlertBox type={connectMMinfo.type} message={connectMMinfo.message} />
          <AlertBox type={alert.type} message={alert.message} />
          <StyledButton type="blue" btnText="connect metamask" onClick={handleConnectMM} />
        </div>
      ) : (
        <ExistingModel />
      );
    }

    return null;
  };

  return (
    <Grid container spacing={24} className={classes.aboutContainer}>
      <Grid item xs={12} sm={8} md={8} lg={8} className={classes.leftSideSection}>
        <ServiceOverview description={service.description} service_url={service.url} tags={service.tags} />
        <DemoToggler
          showDemo={isLoggedIn}
          classes={classes}
          service={service}
          history={history}
          serviceAvailable={serviceAvailable}
          demoExampleRef={demoExampleRef}
          scrollToView={scrollToView}
          demoComponentRequired={demoComponentRequired}
        />
        <RenderExistingModel />
        <div className={classes.showOnNrmalResolution}>
          <PromoBox />
        </div>
      </Grid>

      <Grid item xs={12} sm={4} md={4} lg={4} className={classes.rightSideSection}>
        <CreatorDetails
          organizationName={service.organization_name}
          orgImg={service.org_assets_url && service.org_assets_url.hero_image}
          contacts={service.contacts}
        />
        <ProjectDetails
          projectURL={service.url}
          contributors={service.contributors}
          orgId={service.org_id}
          serviceId={service.service_id}
        />
        <MediaGallery data={service.media} />
        <div className={classes.showInResponsive}>
          <PromoBox />
        </div>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = state => ({
  isLoggedIn: state.userReducer.login.isLoggedIn,
  wallet: state.userReducer.wallet,
});

const mapDispatchToProps = dispatch => ({
  startMMconnectLoader: () => dispatch(loaderActions.startAppLoader(LoaderContent.CONNECT_METAMASK)),
  updateWallet: ({ type, address }) => dispatch(userActions.updateWallet({ type, address })),
  registerWallet: (address, type) => dispatch(userActions.registerWallet(address, type)),
  fetchAvailableUserWallets: () => dispatch(userActions.fetchAvailableUserWallets()),
  stopLoader: () => dispatch(loaderActions.stopAppLoader),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(AboutService));
