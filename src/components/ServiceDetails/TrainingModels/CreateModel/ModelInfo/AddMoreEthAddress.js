import React, { useState } from "react";
import { withStyles } from "@mui/styles";
import AddIcon from "@mui/icons-material/Add";

import StyledTextField from "../../../../common/StyledTextField";
import { useStyles } from "./styles";

const AddMoreEthAddress = ({ classes, addEthAddress }) => {
  const [value, setValue] = useState("");

  const addInput = (e) => {
    e.preventDefault();
    value && addEthAddress(value);
    setValue("");
  };

  return (
    <div className={classes.addMoreEthAdd}>
      <StyledTextField value={value} placeholder="Enter ID" onChange={(e) => setValue(e.target.value)} />
      <div onClick={addInput} className={classes.addTextBox}>
        <AddIcon />
        <span>Add another address</span>
      </div>
    </div>
  );
};

export default withStyles(useStyles)(AddMoreEthAddress);
