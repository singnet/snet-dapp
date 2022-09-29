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
}) => {
  const [enableAccessModel, setEnableAccessModel] = useState(false);
  const [ethAddress, setEthAddress] = useState([]);
  const [trainingMethod, setTrainingMethod] = useState(undefined);
  // eslint-disable-next-line
  const [trainingModelServiceName, setTrainingModelServiceName] = useState("");
  const [trainingModelDescription, setTrainingModelDescription] = useState("");
  const dispatch = useDispatch();

  const createModel = async (sdk, address) => {
    const { org_id, service_id } = serviceDetails;
    const serviceClient = new ServiceClient(sdk, org_id, service_id, sdk._mpeContract, {}, groupInfo);
    // Note: Passing service name blank string becasuse with value it's not working issue is from demon.
    const params = {
      method: trainingMethod,
      name: "",
      description: trainingModelDescription,
      enableAccess: enableAccessModel,
      address: ethAddress.map(e => e.text),
    };
    const create_model = await serviceClient.createModel(address, params);
    console.log("========createdModel===", create_model);
    stopLoader();
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
      await createModel(sdk, address);
      handleNextClick();
    } catch (error) {
      console.log("===error==", error);
    }
  };
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
    newTEthAddress[index].isCompleted = !newTEthAddress[index]?.isCompleted;
    setEthAddress(newTEthAddress);
  };

  const removeEthAddress = index => {
    const newEthAddress = [...ethAddress];
    newEthAddress.splice(index, 1);
    setEthAddress(newEthAddress);
  };

  const addEllipsisInBetweenString = (str) => {
    if (str.length) {
      return `${str.substr(0, 17)}...${str.substr(str.length - 17)}`;
    }
    return str;
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
              <div key={index.toString()} className={classes.addedEthAdd}>
                <span onClick={() => toggleEthAddress(index)}>{addEllipsisInBetweenString(address.text)}</span>
                <DeleteOutlineIcon onClick={() => removeEthAddress(index)} />
              </div>
            ))}
            <AddMoreEthAddress addEthAddress={addEthAddress} />
          </div>
        ) : null}
      </div>
      <div className={classes.btnContainer}>
        <StyledButton btnText="Next" onClick={onNext} />
      </div>
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
