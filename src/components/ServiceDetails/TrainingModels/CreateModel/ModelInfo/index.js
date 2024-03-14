import React, { useState } from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import { withStyles } from "@material-ui/styles";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import { WebServiceClient as ServiceClient } from "snet-sdk-web";
import StyledDropdown from "../../../../common/StyledDropdown";
import StyledTextField from "../../../../common/StyledTextField";
import StyledButton from "../../../../common/StyledButton";
import AddMoreEthAddress from "./AddMoreEthAddress";
import { useStyles } from "./styles";
import { connect, useDispatch } from "react-redux";
import { loaderActions, userActions } from "../../../../../Redux/actionCreators";
import { LoaderContent } from "../../../../../utility/constants/LoaderContent";
import { initSdk } from "../../../../../utility/sdk";
import { walletTypes } from "../../../../../Redux/actionCreators/UserActions";
import { currentServiceDetails, groupInfo } from "../../../../../Redux/reducers/ServiceDetailsReducer";
import AlertBox, { alertTypes } from "../../../../common/AlertBox";

const ModelInfo = ({
  classes,
  handleNextClick,
  training,
  groupInfo,
  serviceDetails,
  startMMconnectLoader,
  fetchAvailableUserWallets,
  stopLoader,
  registerWallet,
  updateWallet,
  setModelData,
  modelDetailsOnEdit,
  cancelEditModel,
  updateModel,
  deleteModel,
}) => {
  const [enableAccessModel, setEnableAccessModel] = useState(
    modelDetailsOnEdit && modelDetailsOnEdit.publicAccess === true ? true : false
  );
  const [ethAddress, setEthAddress] = useState(modelDetailsOnEdit ? modelDetailsOnEdit.addressList : []);
  const [trainingMethod, setTrainingMethod] = useState(modelDetailsOnEdit ? modelDetailsOnEdit.methodName : undefined);
  const [trainingModelName, setTrainingServiceName] = useState(modelDetailsOnEdit ? modelDetailsOnEdit.modelName : "");
  const [trainingModelDescription, setTrainingModelDescription] = useState(
    modelDetailsOnEdit ? modelDetailsOnEdit.description : ""
  );
  const [alert, setAlert] = useState({});
  const dispatch = useDispatch();
  const createModel = async (sdk, address) => {
    const { org_id, service_id } = serviceDetails;
    const serviceClient = new ServiceClient(sdk, org_id, service_id, sdk._mpeContract, {}, groupInfo);
    const serviceName = trainingMethod.split(".")[1].split("/")[0];
    const params = {
      modelName: trainingModelName,
      method: trainingMethod,
      serviceName,
      description: trainingModelDescription,
      publicAccess: enableAccessModel,
      address: !enableAccessModel ? ethAddress : [],
    };
    const param = {
        grpcMethod: training.training_methods[0],
        grpcService: serviceName,
        address,
    };
    const response = await serviceClient.getExistingModel(param);
    if(response.length < 20)
    {
      return await serviceClient.createModel(address, params);
    }
  };
  const onUpdate = () => {
    const updateModelParams = {
      trainingModelName,
      trainingModelDescription,
      ethAddress,
      enableAccessModel,
    };
    updateModel(updateModelParams);
  };


  const onNext = async () => {
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
      dispatch(loaderActions.startAppLoader(LoaderContent.CREATE_TRAINING_MODEL));
      const createdModelData = await createModel(sdk, address);
      const data = {
        modelId: createdModelData?.modelId || "",
        method: createdModelData?.methodName || "",
        serviceName: createdModelData?.serviceName || "",
        name: createdModelData?.modelName || "",
        description: createdModelData?.description || "",
        publicAccess: createdModelData?.publicAccess || false,
        address: createdModelData?.addressList || [],
        updatedDate: createdModelData?.updatedDate || "",
        status: createdModelData?.status || "",
      };
      setModelData(data);
      stopLoader();
      handleNextClick();
    } catch (error) {
      setAlert({ type: alertTypes.ERROR, message: "Unable to create model. Please try again" });
      stopLoader();
    }
  };
  const onAccessModelSwitchChange = () => {
    setEnableAccessModel(!enableAccessModel);
  };

  const trainingModelAccess = training?.training_methods || [];

  const trainingDropDownObject = trainingModelAccess.map(e => ({
    value: e,
    label: e,
  }));

  const trainingMethodDropDownBox = event => {
    const { value } = event.target;
    if (value !== "default") {
      setTrainingMethod(value);
    }
  };

  const handleModelServiceName = event => {
    setTrainingServiceName(event.target.value);
  };

  const handleModelDescription = event => {
    setTrainingModelDescription(event.target.value);
  };

  const addEthAddress = text => setEthAddress([...ethAddress, text]);

  const toggleEthAddress = index => {
    const newTEthAddress = [...ethAddress];
    newTEthAddress[index].isCompleted = !newTEthAddress[index]?.isCompleted;
    setEthAddress(newTEthAddress);
  };

  const removeEthAddress = index => {
    const newEthAddress = [...ethAddress];
    newEthAddress.splice(index, 1);
    setEthAddress(newEthAddress);
  };

  return (
    <div className={classes.modelInfoContaienr}>
      <div className={classes.trainingBasicDetails}>
        <div className={classes.methodDropBox}>
          <StyledDropdown
            labelTxt="Select Method"
            inputLabel="Training Method"
            list={trainingDropDownObject}
            value={trainingMethod}
            onChange={trainingMethodDropDownBox}
          />
          <span>Please select a method to train as a first step.</span>
        </div>
        <div className={classes.modelNameContainer}>
          <StyledTextField label="Model name" value={trainingModelName} onChange={handleModelServiceName} />
          <span>The name of your service can not be same name as another service.</span>
        </div>
        <div className={classes.modelDescriptionContainer}>
          <StyledTextField
            label="Model Description"
            value={trainingModelDescription}
            fullWidth
            multiline
            minRows={5}
            maxRows="10"
            onChange={handleModelDescription}
            inputProps={{ maxLength: 500 }}
            InputLabelProps={{ shrink: true }}
          />
        </div>
      </div>
      <div className={classes.accessModelContainer}>
        <FormControlLabel
          label="Enable access for this model"
          control={
            <Switch
              checked={enableAccessModel}
              onChange={onAccessModelSwitchChange}
              color="primary"
              className={classes.switchToggle}
            />
          }
        />
        {!enableAccessModel ? (
          <div className={classes.accessModelContainer}>
            <span>Add a list of address that can access this model.</span>
            <div className={classes.ethAddressContainer}>
              <span>Ethereum addresses</span>
              {ethAddress.map((address, index) => (
                <div key={index.toString()} className={classes.addedEthAdd}>
                  <span onClick={() => toggleEthAddress(index)}>{address}</span>
                  <DeleteOutlineIcon onClick={() => removeEthAddress(index)} />
                </div>
              ))}
              <AddMoreEthAddress addEthAddress={addEthAddress} />
            </div>
          </div>
        ) : null}
      </div>
      {modelDetailsOnEdit ? (
        <div className={classes.editVersionBtnContainer}>
          <StyledButton btnText="Delete" type="redBg" onClick={deleteModel} />
          <div>
            <StyledButton btnText="Cancel" onClick={cancelEditModel} />
            <StyledButton btnText="Update" type="blue" onClick={onUpdate} />
          </div>
        </div>
      ) : (
        <div className={classes.btnContainer}>
          <StyledButton btnText="Next" onClick={onNext} />
        </div>
      )}
      <AlertBox type={alert.type} message={alert.message} />
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(ModelInfo));
