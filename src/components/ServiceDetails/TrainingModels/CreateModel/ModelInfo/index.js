import React from "react";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import { withStyles } from "@material-ui/styles";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import AddIcon from "@material-ui/icons/Add";

import StyledDropdown from "../../../../common/StyledDropdown";
import StyledTextField from "../../../../common/StyledTextField";
import StyledButton from "../../../../common/StyledButton";
import { useStyles } from "./styles";

const ModelInfo = ({ classes, handleNextClick }) => {
  const [defaultModel, setDefaultModel] = React.useState(false);
  const [enableAccessModel, setEnableAccessModel] = React.useState(false);
  const [counter, setCounter] = React.useState(0);

  const onChangeDefaultModelSwitch = () => {
    setDefaultModel(!defaultModel);
  };

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
      <FormControlLabel
        label="Make this model as default"
        control={
          <Switch checked={defaultModel} onChange={onChangeDefaultModelSwitch} color="primary" className={classes.switchToggle}/>
        }
      />
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
        {enableAccessModel ? (
          <div className={classes.ethAddresses}>
            <span>Etherum addresses</span>
            <div className={classes.ethAddTextBox}>
              <StyledTextField placeholder="Enter ID" />
              <DeleteOutlineIcon />
            </div>
            {Array.from(Array(counter)).map((c, index) => {
              return (
                <div className={classes.ethAddTextBox}>
                  <StyledTextField placeholder="Enter ID" />
                  <DeleteOutlineIcon onClick={handleDeleteEthAdd(index)}/>
                </div>
              );
            })}
            <div className={classes.addTextBox} onClick={addInput}>
              <AddIcon />
              <span>Add another address</span>
            </div>
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
