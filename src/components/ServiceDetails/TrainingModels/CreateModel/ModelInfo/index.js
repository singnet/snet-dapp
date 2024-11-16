import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import StyledDropdown from "../../../../common/StyledDropdown";
import StyledTextField from "../../../../common/StyledTextField";
import StyledButton from "../../../../common/StyledButton";

import { loaderActions, userActions } from "../../../../../Redux/actionCreators";
import { createModel, deleteModel, updateModel } from "../../../../../Redux/actionCreators/ServiceTrainingActions";
import { LoaderContent } from "../../../../../utility/constants/LoaderContent";
// import { walletTypes } from "../../../../../Redux/actionCreators/UserActions";
import { currentServiceDetails } from "../../../../../Redux/reducers/ServiceDetailsReducer";
import AlertBox, { alertTypes } from "../../../../common/AlertBox";

import { withStyles } from "@mui/styles";
import { useStyles } from "./styles";
import AccessModel from "./AccessModel";
import Data from "../Data";

const ModelInfo = ({ classes, cancelEditModel }) => {
  const dispatch = useDispatch();
  const { detailsTraining } = useSelector((state) => state.serviceDetailsReducer);
  const { currentModel } = useSelector((state) => state.serviceTrainingReducer);
  const { org_id, service_id } = useSelector((state) => currentServiceDetails(state));

  const [isRestrictAccessModel, setIsRestrictAccessModel] = useState(
    currentModel && currentModel.publicAccess ? true : false
  );
  const [accessAddresses, setAccessAddresses] = useState(currentModel ? currentModel.addressList : []);
  const [trainingMethod, setTrainingMethod] = useState(currentModel ? currentModel.methodName : undefined);
  const [trainingModelName, setTrainingServiceName] = useState(currentModel ? currentModel.modelName : "");
  const [trainingModelDescription, setTrainingModelDescription] = useState(
    currentModel ? currentModel.description : ""
  );
  const [trainingDataLink, setTrainingDataLink] = useState(currentModel ? currentModel.dataLink : "");
  const [alert, setAlert] = useState({});

  const onUpdate = async () => {
    const updateModelParams = {
      trainingModelName,
      trainingModelDescription,
      accessAddresses,
      isRestrictAccessModel,
      dataLink: trainingDataLink,
    };

    try {
      const address = await dispatch(userActions.updateMetamaskWallet());
      await dispatch(updateModel(org_id, service_id, address, updateModelParams));
      cancelEditModel();
    } catch (error) {
      setAlert({ type: alertTypes.ERROR, message: "Unable to update model. Please try again" });
    } finally {
      dispatch(loaderActions.stopAppLoader());
    }
  };

  const onDelete = async () => {
    const address = await dispatch(userActions.updateMetamaskWallet());
    await dispatch(
      deleteModel(org_id, service_id, currentModel.modelId, currentModel.methodName, currentModel.serviceName, address)
    );
    cancelEditModel();
  };

  const onNext = async () => {
    try {
      dispatch(loaderActions.startAppLoader(LoaderContent.CONNECT_METAMASK));
      const address = await dispatch(userActions.updateMetamaskWallet());
      const newModelParams = {
        trainingModelName,
        trainingMethod,
        trainingModelDescription,
        accessAddresses,
        isRestrictAccessModel,
      };
      await dispatch(createModel(org_id, service_id, address, newModelParams));
      dispatch(loaderActions.stopAppLoader());
      // handleNextClick();
      cancelEditModel();
    } catch (error) {
      console.log("error onNext: ", error);
      setAlert({ type: alertTypes.ERROR, message: "Unable to create model. Please try again" });
      dispatch(loaderActions.stopAppLoader());
    }
  };

  const onAccessModelSwitchChange = () => {
    setIsRestrictAccessModel(!isRestrictAccessModel);
  };

  const trainingModelAccess = detailsTraining?.trainingMethods || [];

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

  const CreateModelButtonGroup = () => {
    return <StyledButton btnText="Create" onClick={onNext} />;
  };

  const UpdateModelButtonGroup = () => {
    return (
      <div className={classes.btnContainer}>
        <StyledButton btnText="Delete" type="redBg" onClick={onDelete} />
        <StyledButton btnText="Update" type="blue" onClick={onUpdate} />
      </div>
    );
  };

  return (
    <div className={classes.modelInfoContaienr}>
      <div className={classes.trainingBasicDetails}>
        <div className={classes.methodDropBox}>
          <StyledDropdown
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
      <Data trainingDataLink={trainingDataLink} setTrainingDataLink={setTrainingDataLink} />
      <div className={classes.accessModelContainer}>
        <FormControlLabel
          label="Enable access restriction for this model"
          control={
            <Switch
              checked={isRestrictAccessModel}
              onChange={onAccessModelSwitchChange}
              color="primary"
              className={classes.switchToggle}
            />
          }
        />
        {isRestrictAccessModel && (
          <AccessModel accessAddresses={accessAddresses} setAccessAddresses={setAccessAddresses} />
        )}
      </div>
      <div className={classes.btnContainer}>
        <StyledButton btnText="Cancel" type="transparent" onClick={cancelEditModel} />
        {currentModel?.modelId ? <UpdateModelButtonGroup /> : <CreateModelButtonGroup />}
      </div>
      <AlertBox type={alert.type} message={alert.message} />
    </div>
  );
};

export default withStyles(useStyles)(ModelInfo);
