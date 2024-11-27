import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddMoreEthAddress from "./AddMoreEthAddress";

import { withStyles } from "@mui/styles";
import { useStyles } from "./styles";
import StyledTextField from "../../../../../common/StyledTextField";

const AccessModel = ({ classes, accessAddresses, setAccessAddresses }) => {
  const addEthAddress = (text) => setAccessAddresses([...accessAddresses, text]);

  // const toggleEthAddress = (index) => {  //TODO: understand what is it
  //   const newTEthAddress = [...accessAddresses];
  //   newTEthAddress[index].isCompleted = !newTEthAddress[index]?.isCompleted;
  //   setAccessAddresses(newTEthAddress);
  // };

  const removeEthAddress = (index) => {
    const newEthAddress = [...accessAddresses];
    newEthAddress.splice(index, 1);
    setAccessAddresses(newEthAddress);
  };

  return (
    <div className={classes.accessModelContainer}>
      <h3>Add a list of address that can access this model (Optional)</h3>
      <div className={classes.ethAddressContainer}>
        {accessAddresses &&
          accessAddresses.map((address, index) => (
            <div key={index.toString()} className={classes.addedEthAdd}>
              <StyledTextField value={address} className={classes.addressField} />
              <div className={classes.removeAddressButton}>
                <DeleteOutlineIcon onClick={() => removeEthAddress(index)} />
              </div>
            </div>
          ))}
        <p>
          Please add a new address that will have access to use, update and delete your model! You do not need to enter
          your address
        </p>
        <AddMoreEthAddress addEthAddress={addEthAddress} />
      </div>
    </div>
  );
};

export default withStyles(useStyles)(AccessModel);
