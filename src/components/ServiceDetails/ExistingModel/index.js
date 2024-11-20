import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withStyles } from "@mui/styles";
import { useStyles } from "./styles";
import ModelDetails from "./ModelDetails";
import { loaderActions, userActions } from "../../../Redux/actionCreators";
import { LoaderContent } from "../../../utility/constants/LoaderContent";
import { currentServiceDetails } from "../../../Redux/reducers/ServiceDetailsReducer";
import AlertBox, { alertTypes } from "../../common/AlertBox";
import Card from "../../common/Card";
import { getTrainingModels } from "../../../Redux/actionCreators/ServiceTrainingActions";
import { isUndefined } from "lodash";
import StyledButton from "../../common/StyledButton";

const ExistingModel = ({ classes, openEditModel }) => {
  const { org_id, service_id } = useSelector((state) => currentServiceDetails(state));
  const { modelsList } = useSelector((state) => state.serviceTrainingReducer);
  const { address } = useSelector((state) => state.userReducer.wallet);

  const [existingModels, setExistingModels] = useState(modelsList);
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
    } catch (error) {
      setAlert({ type: alertTypes.ERROR, message: "Unable to fetch existing models. Please try again" });
      dispatch(loaderActions.stopAppLoader());
    }
  };

  const ModelList = () => {
    if (!existingModels?.length) {
      return (
        <div className={classes.noDataFoundTxt}>
          <h2>No data found</h2>
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
        !isUndefined(modelsList) ? (
          <ModelList />
        ) : (
          <Fragment>
            <StyledButton btnText="Get models" onClick={handleConnectMM} />
            <AlertBox type={alert.type} message={alert.message} />
          </Fragment>
        )
      }
    />
  );
};

export default withStyles(useStyles)(ExistingModel);
