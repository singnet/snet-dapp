import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { WebServiceClient as ServiceClient } from "snet-sdk-web";

import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import StyledDropdown from "../../../../common/StyledDropdown";
import StyledTextField from "../../../../common/StyledTextField";
import StyledButton from "../../../../common/StyledButton";
import AddMoreEthAddress from "./AddMoreEthAddress";
import { loaderActions, sdkActions } from "../../../../../Redux/actionCreators"; //userActions
import { LoaderContent } from "../../../../../utility/constants/LoaderContent";
// import { walletTypes } from "../../../../../Redux/actionCreators/UserActions";
import { currentServiceDetails, groupInfo } from "../../../../../Redux/reducers/ServiceDetailsReducer";
import AlertBox, { alertTypes } from "../../../../common/AlertBox";

import { withStyles } from "@mui/styles";
import { useStyles } from "./styles";

let sdk;

const ModelInfo = ({
  classes,
  handleNextClick,
  training,
  setModelData,
  modelDetailsOnEdit,
  cancelEditModel,
  updateModel,
  deleteModel,
}) => {
  const serviceDetails = useSelector((state) => currentServiceDetails(state));

  const [enableRestrictAccessModel, setEnableRestrictAccessModel] = useState(
    modelDetailsOnEdit && modelDetailsOnEdit.publicAccess ? true : false
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
      publicAccess: !enableRestrictAccessModel,
      address: !enableRestrictAccessModel ? ethAddress : [],
    };
    const param = {
      grpcMethod: training.training_methods[0],
      grpcService: serviceName,
      address,
    };
    const response = await serviceClient.getExistingModel(param);
    if (response.length < 20) {
      return await serviceClient.createModel(address, params);
    }
  };

  const onUpdate = () => {
    const updateModelParams = {
      trainingModelName,
      trainingModelDescription,
      ethAddress,
      enableRestrictAccessModel,
    };
    updateModel(updateModelParams);
  };

  const onNext = async () => {
    try {
      dispatch(loaderActions.startAppLoader(LoaderContent.CONNECT_METAMASK));
      sdk = await dispatch(sdkActions.getSdk());
      const address = await sdk.account.getAddress();
      // await dispatch(userActions.updateMetamaskWallet());
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
      dispatch(loaderActions.stopAppLoader());
      handleNextClick();
    } catch (error) {
      setAlert({ type: alertTypes.ERROR, message: "Unable to create model. Please try again" });
      dispatch(loaderActions.stopAppLoader());
    }
  };

  const onAccessModelSwitchChange = () => {
    setEnableRestrictAccessModel(!enableRestrictAccessModel);
  };

  const trainingModelAccess = training?.training_methods || [];

  const trainingDropDownObject = trainingModelAccess.map((e) => ({
    value: e,
    label: e,
  }));

  const trainingMethodDropDownBox = (event) => {
    const { value } = event.target;
    if (value !== "default") {
      setTrainingMethod(value);
    }
  };

  const handleModelServiceName = (event) => {
    setTrainingServiceName(event.target.value);
  };

  const handleModelDescription = (event) => {
    setTrainingModelDescription(event.target.value);
  };

  const addEthAddress = (text) => setEthAddress([...ethAddress, text]);

  const toggleEthAddress = (index) => {
    const newTEthAddress = [...ethAddress];
    newTEthAddress[index].isCompleted = !newTEthAddress[index]?.isCompleted;
    setEthAddress(newTEthAddress);
  };

  const removeEthAddress = (index) => {
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
          label="Enable access restriction for this model"
          control={
            <Switch
              checked={enableRestrictAccessModel}
              onChange={onAccessModelSwitchChange}
              color="primary"
              className={classes.switchToggle}
            />
          }
        />
        {enableRestrictAccessModel ? (
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
          <div className={classes.btnContainer}>
            <StyledButton btnText="Delete" type="redBg" onClick={deleteModel} />
            <StyledButton btnText="Update" type="blue" onClick={onUpdate} />
          </div>
          <div>
            <StyledButton btnText="Cancel" type="transparent" onClick={cancelEditModel} />
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

export default withStyles(useStyles)(ModelInfo);
