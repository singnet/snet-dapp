import React from "react";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import { withStyles } from "@material-ui/styles";

import StyledDropdown from "../../../../common/StyledDropdown";
import StyledTextField from "../../../../common/StyledTextField";
import StyledButton from "../../../../common/StyledButton";
import AddEthAddress from "./AddEthAddress";
import { useStyles } from "./styles";

const ModelInfo = ({ classes, handleNextClick }) => {
  const [enableAccessModel, setEnableAccessModel] = React.useState(false);
  const [counter, setCounter] = React.useState(0);

  const onAccessModelSwitchChange = () => {
    setEnableAccessModel(!enableAccessModel);
  };

  const addInput = () => {
    setCounter(counter + 1);
  };

  const handleDeleteEthAdd = (index) => {
    console.log('delete')
  }

  return (
    <div className={classes.modelInfoContaienr}>
      <div className={classes.trainingBasicDetails}>
        <div className={classes.methodDropBox}>
          <StyledDropdown labelTxt="Select Method" inputLabel="Training Method" />
          <span>Please select a method to train as a first step.</span>
        </div>
        <div className={classes.modelNameContainer}>
          <StyledTextField label="Model name" />
          <span>
            The model name can't be more then 63 characters. It can only contain alphanumeric characters, with no spaces
            or special characters.
          </span>
        </div>
        <div className={classes.modelDescriptionContainer}>
          <StyledTextField
            label="Model Description"
            // value={description}
            fullWidth
            multiline
            rows={5}
            rowsMax="10"
            // onChange={handleModelDescription}
            inputProps={{ maxLength: 500 }}
            InputLabelProps={{ shrink: true }}
          />
        </div>
      </div>
      <div className={classes.accessModelContainer}>
      <FormControlLabel
        label="Enable access for this model"
        control={
          <Switch checked={enableAccessModel} onChange={onAccessModelSwitchChange} color="primary" className={classes.switchToggle}/>
        }
      />
        <span>Add a list ofaddress that can access this model.</span>
        {enableAccessModel ? <AddEthAddress /> : null}
      </div>
      <div className={classes.btnContainer}>
        <StyledButton btnText="Next" onClick={handleNextClick} />
      </div>
    </div>
  );
};

export default withStyles(useStyles)(ModelInfo);
