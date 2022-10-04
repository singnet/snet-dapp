import React, { useCallback, useState } from "react";
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
import Typography from "@material-ui/core/Typography";
import { serviceDetailsActions } from "../../../Redux/actionCreators";

const ExistingModel = ({
  classes,
  showReqNewModelBtn,
  startMMconnectLoader,
  fetchAvailableUserWallets,
  stopLoader,
  registerWallet,
  updateWallet,
  training,
  serviceDetails,
  groupInfo,
  haveANewModel,
  onEditTrainingModel,
  wallet,
}) => {
  const [metamaskConnected, setMetamaskConnected] = useState(false);
  const [existingModels, setExistingModels] = useState([]);
  const [serviceClientState, setServiceClientState] = useState();
  const [sdkService, setSdkService] = useState();
  const dispatch = useDispatch();

  const getTrainingModels = async (sdk, address) => {
    const { org_id, service_id } = serviceDetails;
    const serviceClient = new ServiceClient(sdk, org_id, service_id, sdk._mpeContract, {}, groupInfo);
    setServiceClientState(serviceClient);
    const promises = training.training_methods.map(method => serviceClient.getExistingModel(method, address));
    const response = await Promise.all(promises);
    return response.flat();
  };

  const handleConnectMM = async () => {
    try {
      startMMconnectLoader();
      const sdk = await initSdk();
      setSdkService(sdk);
      const address = await sdk.account.getAddress();
      const availableUserWallets = await fetchAvailableUserWallets();
      const addressAlreadyRegistered = availableUserWallets.some(wallet => wallet.address.toLowerCase() === address);

      if (!addressAlreadyRegistered) {
        await registerWallet(address, walletTypes.METAMASK);
      }
      updateWallet({ type: walletTypes.METAMASK, address });
      dispatch(loaderActions.startAppLoader(LoaderContent.FETCH_TRAINING_EXISTING_MODEL));
      const existingModel = await getTrainingModels(sdk, address);
      setExistingModels(existingModel);
      setMetamaskConnected(true);
      stopLoader();
    } catch (error) {
      console.log("===error==", error);
    }
  };

  const onEditModel = () => {
    dispatch(serviceDetailsActions.setEditTrainingModel(true))
    onEditTrainingModel();
  }
  
  const deleteModels = async (modelId, methodName) => {
    const modelName = "";
    const delete_model = await serviceClientState.deleteModel(modelId, wallet.address, methodName, modelName);
    const existingModel = await getTrainingModels(sdkService, wallet.address);
    setExistingModels(existingModel);
  };

  const ModelList = useCallback(() => {
    if (existingModels.length) {
      return existingModels.map(model => {
        return (
          <div key={model.modelId}>
            <ModelDetails
              title="Region Recognition"
              id={model.modelId}
              description={model.description}
              status="Inprogress"
              accessTo="Public"
              lastUpdate="12-Aug-2022"
              onEditModel={onEditModel}
              deleteModels={() => deleteModels(model.modelId, model.methodName)}
            />
          </div>
        );
      });
    } else {
      return (
        <div className={classes.btnContainer}>
          <Typography>No data found</Typography>
        </div>
      );
    }
  }, [classes.btnContainer, existingModels]);

  return (
    <div className={classes.existingModelContainer}>
      <h2>Existing Model</h2>
      {metamaskConnected ? (
        <>
          <ModelList />
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
