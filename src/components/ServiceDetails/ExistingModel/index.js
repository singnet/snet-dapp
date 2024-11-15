import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withStyles } from "@mui/styles";
import ModelDetails from "./ModelDetails";
import { useStyles } from "./styles";
import ConnectMetamask from "../ConnectMetamask";
import { loaderActions, userActions } from "../../../Redux/actionCreators";
import { LoaderContent } from "../../../utility/constants/LoaderContent";
import { currentServiceDetails } from "../../../Redux/reducers/ServiceDetailsReducer";
import Typography from "@mui/material/Typography";
import AlertBox, { alertTypes } from "../../common/AlertBox";
import Card from "../../common/Card";
import { getTrainingModels } from "../../../Redux/actionCreators/ServiceTrainingActions";
import { isEmpty } from "lodash";

const ExistingModel = ({ classes, openEditModel }) => {
  const { org_id, service_id } = useSelector((state) => currentServiceDetails(state));
  const { modelsList } = useSelector((state) => state.serviceTrainingReducer);
  const { address } = useSelector((state) => state.userReducer.wallet);

  const [existingModels, setExistingModels] = useState(modelsList);
  const [metamaskConnected, setMetamaskConnected] = useState(!isEmpty(address));
  const [alert, setAlert] = useState({});
  const dispatch = useDispatch();

  // TODO check seems strange
  useEffect(() => {
    setExistingModels(modelsList);
  }, [modelsList]);

  const handleConnectMM = async () => {
    try {
      dispatch(loaderActions.startAppLoader(LoaderContent.CONNECT_METAMASK));
      const address = await dispatch(userActions.updateMetamaskWallet());
      await dispatch(getTrainingModels(org_id, service_id, address));
      setMetamaskConnected(true);
    } catch (error) {
      setAlert({ type: alertTypes.ERROR, message: "Unable to fetch existing models. Please try again" });
      dispatch(loaderActions.stopAppLoader());
    }
  };

  const ModelList = () => {
    if (!existingModels.length) {
      return (
        <div className={classes.noDataFoundTxt}>
          <Typography>No data found</Typography>
        </div>
      );
    }

    return existingModels.map((model) => {
      return (
        <div key={model.modelId}>
          <ModelDetails openEditModel={openEditModel} model={model} address={address} />
        </div>
      );
    });
  };

  return (
    <Card
      header="Existing Model"
      children={
        metamaskConnected ? (
          <ModelList />
        ) : (
          <Fragment>
            <ConnectMetamask handleConnectMM={handleConnectMM} />
            <AlertBox type={alert.type} message={alert.message} />
          </Fragment>
        )
      }
    />
  );
};

export default withStyles(useStyles)(ExistingModel);
