import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { withStyles } from "@material-ui/styles";
import { WebServiceClient as ServiceClient } from "snet-sdk-web";
import ModelDetails from "./ModelDetails";
import StyledButton from "../../common/StyledButton";
import { useStyles } from "./styles";
import ConnectMetamask from "../ConnectMetamask";
import { initSdk } from "../../../utility/sdk";
import { walletTypes } from "../../../Redux/actionCreators/UserActions";
import { loaderActions, userActions } from "../../../Redux/actionCreators";
import { LoaderContent } from "../../../utility/constants/LoaderContent";
import { currentServiceDetails, groupInfo } from "../../../Redux/reducers/ServiceDetailsReducer";

const ExistingModel = ({
  classes,
  showReqNewModelBtn,
  startMMconnectLoader,
  fetchAvailableUserWallets,
  stopLoader,
  registerWallet,
  updateWallet,
  wallet,
  training,
  serviceDetails,
  groupInfo,
  haveANewModel,
}) => {
  const [metamaskConnected, setMetamaskConnected] = useState(false);
  const dispatch = useDispatch();
  const getExistingModel = async () => {
    const sdk = await initSdk();
    const { org_id, service_id } = serviceDetails;
    console.log({ serviceDetails, groupInfo });
    const serviceClient = new ServiceClient(sdk, org_id, service_id, sdk._mpeContract, {}, groupInfo);
    const existingModel = await getTrainingModels(serviceClient);
    console.log("===existing models==", existingModel);
    setMetamaskConnected(true);
    stopLoader();
  };

  useEffect(() => {
    if (wallet.address) {
      dispatch(loaderActions.startAppLoader(LoaderContent.FETCH_TRAINING_EXISTING_MODEL));
      getExistingModel();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wallet]);

  const getTrainingModels = serviceClient => {
    const promises = training.training_methods.map(async method => {
      const existingModel = await serviceClient.getExistingModel(method, wallet.address);
      return existingModel.array;
    });
    return Promise.all(promises);
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
    } catch (error) {
      console.log("===error==", error);
    }
  };

  return (
    <div className={classes.existingModelContainer}>
      <h2>Existing Model</h2>
      {metamaskConnected ? (
        <>
          <ModelDetails
            title="Region Recognition"
            id="4432"
            description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley."
            status="Inprogress"
            accessTo="Public"
            lastUpdate="12-Aug-2022"
          />
          {showReqNewModelBtn && haveANewModel === true ? (
            <div className={classes.btnContainer}>
              <StyledButton btnText="request a new model" />
            </div>
          ) : null}
        </>
      ) : (
        <ConnectMetamask handleConnectMM={handleConnectMM} />
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  wallet: state.userReducer.wallet,
  serviceDetails: currentServiceDetails(state),
  groupInfo: groupInfo(state),
});

const mapDispatchToProps = dispatch => ({
  startMMconnectLoader: () => dispatch(loaderActions.startAppLoader(LoaderContent.CONNECT_METAMASK)),
  fetchAvailableUserWallets: () => dispatch(userActions.fetchAvailableUserWallets()),
  registerWallet: (address, type) => dispatch(userActions.registerWallet(address, type)),
  updateWallet: ({ type, address }) => dispatch(userActions.updateWallet({ type, address })),
  stopLoader: () => dispatch(loaderActions.stopAppLoader),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(ExistingModel));
