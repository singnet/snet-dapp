import React, { useState } from "react";
import { withStyles } from "@mui/styles";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import DoneIcon from "@mui/icons-material/Done";
import { useStyles } from "./styles";
import PaymentMode from "./PaymentMode";
import StyledButton from "../../../../common/StyledButton";
import AlertBox, { alertTypes } from "../../../../common/AlertBox";
import { callTypes, createServiceClient } from "../../../../../utility/sdk";
import { Calculator } from "../../../../../assets/thirdPartyServices/snet/example_service/example_service_pb_service";
import { channelInfo } from "../../../../../Redux/reducers/UserReducer";
import { currentServiceDetails, groupInfo } from "../../../../../Redux/reducers/ServiceDetailsReducer";
import { LoaderContent } from "../../../../../utility/constants/LoaderContent";
import { loaderActions } from "../../../../../Redux/actionCreators";
import { connect } from "react-redux";

const Payment = ({
  classes,
  handleNextClick,
  service,
  serviceDetails: { org_id, service_id },
  groupInfo,
  modelData,
  channelInfo,
  wallet,
  stopLoader,
  startLoader,
  setTrainModelId,
}) => {
  const [autoSave] = useState(true);
  const [purchaseCompleted, setPurchaseCompleted] = useState(false);
  const [alert, setAlert] = useState({});
  const addEllipsisAtEndOfString = (str) => `${str.substr(0, 40)}...`;

  const AddressList = () => {
    if (modelData?.address?.length) {
      return modelData?.address.map((address) => <li key={address}>{addEllipsisAtEndOfString(address)}</li>);
    }
    return null;
  };

  const serviceRequestStartHandler = () => {
    setAlert({});
    startLoader();
  };

  const serviceRequestCompleteHandler = () => {
    stopLoader();
    handleNextClick();
  };

  const serviceRequestErrorHandler = (error) => {
    const alert = { type: alertTypes.ERROR };
    if (error.response && error.response.data && error.response.data.error) {
      alert.message = error.response.data.error;
    } else {
      alert.message = error.message || error;
    }
    setAlert(alert);
    stopLoader();
  };

  const onNextPress = async () => {
    const serviceClient = await createServiceClient(
      org_id,
      service_id,
      groupInfo,
      serviceRequestStartHandler,
      serviceRequestCompleteHandler,
      serviceRequestErrorHandler,
      callTypes,
      wallet,
      channelInfo
    );
    const descriptor = modelData.method.split(".")[1].split("/")[1];
    const methodDescriptor = Calculator[descriptor];
    const request = new methodDescriptor.requestType();
    request.setLink(modelData.dataLink);
    request.setAddress(wallet.address);
    request.setModelId(modelData.modelId);
    request.setRequestId("");
    const props = {
      request,
      onEnd: ({ message }) => {
        setTrainModelId(message.getModelId());
      },
    };
    serviceClient.unary(methodDescriptor, props);
  };

  const handlePurchaseComplete = () => {
    setPurchaseCompleted(true);
  };

  return (
    <div className={classes.paymentContaienr}>
      <div className={classes.reviewReqContainer}>
        <span>Review request</span>
        <Grid container>
          <Grid item xs={3}>
            <span>Default Model:</span>
          </Grid>
          <Grid item xs={9}>
            <Typography>Yes</Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={3}>
            <span>Model name:</span>
          </Grid>
          <Grid item xs={9}>
            <Typography>{modelData?.name || ""}</Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={3}>
            <span>Model description:</span>
          </Grid>
          <Grid item xs={9}>
            <Typography>{modelData?.description || ""}</Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={3}>
            <span>Data files:</span>
          </Grid>
          <Grid item xs={9}>
            <Typography>{modelData?.dataLink || ""}</Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={3}>
            <span>Ethereum address:</span>
          </Grid>
          <Grid item xs={9}>
            <ul>
              <AddressList />
            </ul>
          </Grid>
        </Grid>
      </div>
      <div className={classes.modelTrainFeeContainer}>
        <span>Model Traning Fee</span>
        <p>This AI Model Traning requires a very small fee. Please select a payment method to continue</p>
        <div className={classes.tokenCount}>
          <span>agix tokens</span>
          <span>0.002</span>
        </div>
      </div>
      {!purchaseCompleted ? (
        <PaymentMode service={service} modelData={modelData} handlePurchaseComplete={handlePurchaseComplete} />
      ) : null}
      <div className={classes.btnContainer}>
        {autoSave ? (
          <div>
            <DoneIcon />
            <span>Auto Saved</span>
          </div>
        ) : (
          <span>Auto Save</span>
        )}
        <StyledButton btnText="submit request" disabled={!purchaseCompleted} onClick={onNextPress} />
        <StyledButton btnText="finish later" type="transparent" />
        <AlertBox type={alert.type} message={alert.message} />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  wallet: state.userReducer.wallet,
  channelInfo: channelInfo(state),
  groupInfo: groupInfo(state),
  serviceDetails: currentServiceDetails(state),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  startLoader: () => dispatch(loaderActions.startAppLoader(LoaderContent.TRAIN_MODEL)),
  stopLoader: () => dispatch(loaderActions.stopAppLoader()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(Payment));
