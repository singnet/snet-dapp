import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withStyles } from "@mui/styles";
import { WebServiceClient as ServiceClient } from "snet-sdk-web";
import ModelDetails from "./ModelDetails";
import AlertBox, { alertTypes } from "snet-dapp-components/components/AlertBox";
import StyledButton from "snet-dapp-components/components/StyledButton";
import { useStyles } from "./styles";
import ConnectMetamask from "../ConnectMetamask";
import { loaderActions, userActions, sdkActions } from "../../../Redux/actionCreators";
import { LoaderContent } from "../../../utility/constants/LoaderContent";
import { currentServiceDetails, groupInfo as getGroupIndo } from "../../../Redux/reducers/ServiceDetailsReducer";
import Typography from "@mui/material/Typography";

const ExistingModel = ({ classes, showReqNewModelBtn, haveANewModel, training, editModel }) => {
  const wallet = useSelector((state) => state.userReducer.wallet);
  const serviceDetails = useSelector((state) => currentServiceDetails(state));
  const groupInfo = useSelector((state) => getGroupIndo(state));

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
    dispatch(loaderActions.stopAppLoader());
  };

  const handleConnectMM = async () => {
    try {
      dispatch(loaderActions.startAppLoader(LoaderContent.CONNECT_METAMASK));
      const sdk = await dispatch(sdkActions.getSdk());
      setSdkService(sdk);
      const address = await sdk.account.getAddress();
      await dispatch(userActions.updateMetamaskWallet());
      await getTrainingModels(sdk, address);
      setMetamaskConnected(true);
    } catch (error) {
      setAlert({ type: alertTypes.ERROR, message: "Unable to fetch existing models. Please try again" });
      dispatch(loaderActions.stopAppLoader());
    }
  };

  const deleteModels = async (model) => {
    try {
      dispatch(loaderActions.startAppLoader(LoaderContent.DELETE_MODEL));
      const params = {
        modelId: model.modelId,
        address: wallet.address,
        method: model.methodName,
        name: getServiceName(),
      };
      await serviceClientState.deleteModel(params);
      await getTrainingModels(sdkService, wallet.address);
    } catch (error) {
      setAlert({ type: alertTypes.ERROR, message: "Unable to delete model. Please try again" });
      dispatch(loaderActions.stopAppLoader());
    }
  };

  const ModelList = useCallback(() => {
    if (existingModels.length) {
      return existingModels.map((model) => {
        return (
          <div key={model.modelId}>
            <ModelDetails model={model} deleteModels={deleteModels} editModel={editModel} />
          </div>
        );
      });
    } else {
      return (
        <div className={classes.noDataFoundTxt}>
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
          {showReqNewModelBtn && haveANewModel && (
            <div className={classes.btnContainer}>
              <StyledButton btnText="request a new model" />
            </div>
          )}
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

export default withStyles(useStyles)(ExistingModel);
