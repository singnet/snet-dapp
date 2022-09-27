import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/styles";

import { useStyles } from "./styles";
import CreateModelContainer from "./CreateModelContainer";
import ModelInfo from "./ModelInfo";
import Data from "./Data";
import Payment from "./Payment";
import Finish from "./Finish";

import { connect, useDispatch } from "react-redux";
import { initSdk } from "../../../../utility/sdk";
import { loaderActions, userActions } from "../../../../Redux/actionCreators";
import { LoaderContent } from "../../../../utility/constants/LoaderContent";
import { walletTypes } from "../../../../Redux/actionCreators/UserActions";
import ConnectMetamask from "../../ConnectMetamask";
import { currentServiceDetails, groupInfo } from "../../../../Redux/reducers/ServiceDetailsReducer";
import { WebServiceClient as ServiceClient } from "snet-sdk-web";

const CreateModel = ({
  classes,
  training,

  startMMconnectLoader,
  fetchAvailableUserWallets,
  stopLoader,
  registerWallet,
  updateWallet,

  wallet,
  serviceDetails,
  groupInfo,
  haveANewModel,
}) => {
  const [metamaskConnected, setMetamaskConnected] = useState(false);
  const [activeSection, setActiveSection] = React.useState(1);
  const [enableAccessModel, setEnableAccessModel] = useState(false);
  const [ethAddress, setEthAddress] = useState([]);
  const [trainingMethod, setTrainingMethod] = useState(undefined);
  const [trainingModelServiceName, setTrainingModelServiceName] = useState("");
  const [trainingModelDescription, setTrainingModelDescription] = useState("");
  const [trainingDataLink, setTrainingDataLink] = useState("");
  const [serviceClientState, setServiceClientState] = useState({});

  const ethAddressToPass = ethAddress.map(e => e.text);

  const handleNextClick = () => {
    handleConnectMM();
    setActiveSection(activeSection + 1);
  };

  const handleNextClickCreateModel = () => {
    create_model();
    setActiveSection(activeSection + 1);
  };

  const handleConnectMM = async () => {
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
    } catch (error) {
      console.log("===error==", error);
    }
  };

  useEffect(() => {
    if (wallet.address) {
      createANewOne();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wallet]);

  const dispatch = useDispatch();
  const createANewOne = async () => {
    const sdk = await initSdk();
    const { org_id, service_id } = serviceDetails;
    const serviceClient = new ServiceClient(sdk, org_id, service_id, sdk._mpeContract, {}, groupInfo);
    setServiceClientState(serviceClient);
    setMetamaskConnected(true);
    stopLoader();
  };

  const create_model = async () => {
    console.log(trainingModelDescription, "description");
    console.log(trainingDataLink, "trainingDataLink");
    console.log(ethAddress, "ethaddress");
    const createModel = await createModelForTraining(serviceClientState);
    console.log(createModel, "----createModel---");
  };
  const createModelForTraining = async serviceClientState => {
    const create_model = await serviceClientState.createModel(
      trainingMethod,
      wallet.address,
      trainingModelServiceName,
      trainingModelDescription,
      enableAccessModel,
      ethAddressToPass,
      trainingDataLink
    );
    return create_model;
  };
  const onBackClick = () => {
    setActiveSection(activeSection - 1);
  };

  const createModelTabs = [
    {
      key: "modelInfo",
      component: (
        <ModelInfo
          handleNextClick={handleNextClick}
          training={training}
          trainingMethod={trainingMethod}
          setTrainingMethod={setTrainingMethod}
          trainingModelServiceName={trainingModelServiceName}
          setTrainingModelServiceName={setTrainingModelServiceName}
          trainingModelDescription={trainingModelDescription}
          setTrainingModelDescription={setTrainingModelDescription}
          enableAccessModel={enableAccessModel}
          setEnableAccessModel={setEnableAccessModel}
          ethAddress={ethAddress}
          setEthAddress={setEthAddress}
          metamaskConnected={metamaskConnected}
          setMetamaskConnected={setMetamaskConnected}
          handleConnectMM={handleConnectMM}
        />
      ),
    },
    {
      key: "data",
      component: (
        <Data
          handleNextClick={handleNextClick}
          onBackClick={onBackClick}
          trainingDataLink={trainingDataLink}
          setTrainingDataLink={setTrainingDataLink}
          handleNextClickCreateModel={handleNextClickCreateModel}
        />
      ),
    },
    {
      key: "payment",
      component: <Payment handleNextClick={handleNextClick} />,
    },
    {
      key: "finish",
      component: <Finish />,
    },
  ];

  const progressText = [{ label: "Model Info" }, { label: "Data" }, { label: "Payment" }, { label: "Finish" }];

  return (
    <div className={classes.createModelContainer}>
      <h2>New Model Request</h2>
      {createModelTabs.map((item, index) => (
        <CreateModelContainer
          key={item.title}
          classes={classes}
          item={item}
          active={activeSection === index + 1}
          activeSection={activeSection}
          progressText={progressText}
        />
      ))}
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(CreateModel));
