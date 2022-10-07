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
import AlertBox, { alertTypes } from "../../common/AlertBox";

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
  wallet,
}) => {
  const [metamaskConnected, setMetamaskConnected] = useState(false);
  const [existingModels, setExistingModels] = useState([]);
  const [serviceClientState, setServiceClientState] = useState();
  const [sdkService, setSdkService] = useState();
  const [alert, setAlert] = useState({});
  const dispatch = useDispatch();

  const getServiceName = () => {
    return training.training_methods[0].split(".")[1].split("/")[0];
  };

  const getTrainingModels = async (sdk, address) => {
    dispatch(loaderActions.startAppLoader(LoaderContent.FETCH_TRAINING_EXISTING_MODEL));
    const { org_id, service_id } = serviceDetails;
    const serviceClient = new ServiceClient(sdk, org_id, service_id, sdk._mpeContract, {}, groupInfo);
    setServiceClientState(serviceClient);
    const params = {
      grpcMethod: training.training_methods[0],
      grpcService: getServiceName(),
      address,
    };
    const response = await serviceClient.getExistingModel(params);
    console.log("=====existingModel==", response.flat());
    setExistingModels(response.flat());
    stopLoader();
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
      await getTrainingModels(sdk, address);
      setMetamaskConnected(true);
    } catch (error) {
      console.log("===error==", error);
      setAlert({ type: alertTypes.ERROR, message: error.message || error });
      stopLoader();
    }
  };

  const deleteModels = async model => {
    dispatch(loaderActions.startAppLoader(LoaderContent.DELETE_MODEL));
    const params = {
      modelId: model.modelId,
      address: wallet.address,
      method: model.methodName,
      name: getServiceName(),
    };
    await serviceClientState.deleteModel(params);
    await getTrainingModels(sdkService, wallet.address);
  };

  //update model
  const updateModels = async model => {
    console.log(model,'---model---');
    dispatch(loaderActions.startAppLoader(LoaderContent.UPDATE_MODEL));
    const params = {
      modelId: model.modelId,
      address: wallet.address,
      method: model.methodName,
      name: getServiceName(),
      modelName:model.modelName,
      description:"asdfghj",
      addressList:["234gf"],
      status:model.status,
      updatedDate:model.updatedDate,
      publicAccess:model.publicAccess,
    };
    const response=await serviceClientState.updateModel(params);
    console.log("=====updatingModel==", response);
    await getTrainingModels(sdkService, wallet.address);
  };
  //

  const ModelList = useCallback(() => {
    if (existingModels.length) {
      return existingModels.map(model => {
        return (
          <div key={model.modelId}>
            <ModelDetails model={model} deleteModels={deleteModels} updateModels={updateModels} />
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [existingModels]);
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
        <>
          <ConnectMetamask handleConnectMM={handleConnectMM} />
          <AlertBox type={alert.type} message={alert.message} />
        </>
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
