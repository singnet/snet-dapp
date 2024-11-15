import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddMoreEthAddress from "./AddMoreEthAddress";

import { withStyles } from "@mui/styles";
import { useStyles } from "./styles";

const AccessModel = ({ classes, accessAddresses, setAccessAddresses }) => {
  const addEthAddress = (text) => setAccessAddresses([...accessAddresses, text]);

  const toggleEthAddress = (index) => {
    const newTEthAddress = [...accessAddresses];
    newTEthAddress[index].isCompleted = !newTEthAddress[index]?.isCompleted;
    setAccessAddresses(newTEthAddress);
  };

  const removeEthAddress = (index) => {
    const newEthAddress = [...accessAddresses];
    newEthAddress.splice(index, 1);
    setAccessAddresses(newEthAddress);
  };

  return (
    <div className={classes.accessModelContainer}>
      <span>Add a list of address that can access this model.</span>
      <div className={classes.ethAddressContainer}>
        <span>Ethereum addresses</span>
        {accessAddresses.map((address, index) => (
          <div key={index.toString()} className={classes.addedEthAdd}>
            <span onClick={() => toggleEthAddress(index)}>{address}</span>
            <DeleteOutlineIcon onClick={() => removeEthAddress(index)} />
          </div>
        ))}
        <AddMoreEthAddress addEthAddress={addEthAddress} />
      </div>
    </div>
  );
};

export default withStyles(useStyles)(AccessModel);
