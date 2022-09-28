import React from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import { withStyles } from "@material-ui/styles";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import AddMoreEthAddress from "./AddMoreEthAddress";
import StyledDropdown from "../../../../common/StyledDropdown";
import StyledTextField from "../../../../common/StyledTextField";
import StyledButton from "../../../../common/StyledButton";
import { useStyles } from "./styles";

const ModelInfo = ({
  classes,
  handleNextClick,
  training,
  enableAccessModel,
  setEnableAccessModel,
  ethAddress,
  setEthAddress,
  trainingMethod,
  setTrainingMethod,
  trainingModelServiceName,
  setTrainingModelServiceName,
  trainingModelDescription,
  setTrainingModelDescription,
  metamaskConnected,
  setMetamaskConnected,
  handleConnectMM,
}) => {
  const onAccessModelSwitchChange = () => {
    setEnableAccessModel(!enableAccessModel);
  };

  const trainingModelAccess = training.training_methods;
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
    setTrainingModelServiceName(event.target.value);
  };
  const handleModelDescription = event => {
    setTrainingModelDescription(event.target.value);
  };

  const addEthAddress = text => setEthAddress([...ethAddress, { text }]);

  const toggleEthAddress = index => {
    const newTEthAddress = [...ethAddress];
    newTEthAddress[index].isCompleted = !newTEthAddress[index].isCompleted;
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
          <StyledTextField label="Model name" onChange={handleModelServiceName} />
          <span>The name of your service can not be same name as another service.</span>
        </div>
        <div className={classes.modelDescriptionContainer}>
          <StyledTextField
            label="Model Description"
            // value={description}
            fullWidth
            multiline
            rows={5}
            rowsMax="10"
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
        <span>Add a list of address that can access this model.</span>
        {enableAccessModel ? (
          <div className={classes.ethAddressContainer}>
            <span>Ethereum addresses</span>
            {ethAddress.map((address, index) => (
              <div className={classes.addedEthAdd}>
                <span onClick={() => toggleEthAddress(index)}>{address.text}</span>
                <DeleteOutlineIcon onClick={() => removeEthAddress(index)} />
              </div>
            ))}
            <AddMoreEthAddress addEthAddress={addEthAddress} />
          </div>
        ) : null}
      </div>
      <div className={classes.btnContainer}>
        <StyledButton btnText="Next" onClick={handleNextClick} />
      </div>
    </div>
  );
};

export default withStyles(useStyles)(ModelInfo);
