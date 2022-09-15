import React from "react";

import { withStyles } from "@material-ui/styles";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import AddIcon from "@material-ui/icons/Add";

import StyledTextField from "../../../../common/StyledTextField";
import { useStyles } from "./styles";

const ModelInfo = ({ classes }) => {
  const [counter, setCounter] = React.useState(0);
  const [ethAddress, setEthAddress] = React.useState([]);

  const handleEthAddress = event => {
    console.log('event', event.target.value)
    const address = event.target.value;
    setEthAddress([...ethAddress]);
  };

  const addInput = () => {
    setCounter(counter + 1);
  };

  //   const handleDeleteEthAdd = index => {
  //     const newEthAddress = [...ethAddress];
  //     newEthAddress.splice(index, 1);
  //     setEthAddress(newEthAddress);
  //   };

  console.log("@@@@@", ethAddress);

  return (
    <div className={classes.ethAddresses}>
      <span>Etherum addresses</span>
      <div className={classes.ethAddTextBox}>
        <StyledTextField placeholder="Enter ID" handleChange={handleEthAddress} />
        <DeleteOutlineIcon />
      </div>
      {/* {Array.from(Array(counter)).map((c, index) => { */}
      {ethAddress.map((add, index) => {
        return (
          <div className={classes.ethAddTextBox}>
            <StyledTextField placeholder="Enter ID" />
            <DeleteOutlineIcon />
          </div>
        );
      })}
      <div className={classes.addTextBox} onClick={addInput}>
        <AddIcon />
        <span>Add another address</span>
      </div>
    </div>
  );
};

export default withStyles(useStyles)(ModelInfo);
