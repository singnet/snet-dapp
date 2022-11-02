import React, { useState } from "react";
import { withStyles } from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DoneIcon from "@material-ui/icons/Done";
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
import StyledTextField from "../../../../common/StyledTextField";
import StyledDropdown from "../../../../common/StyledDropdown";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import AddMoreEthAddress from "../ModelInfo/AddMoreEthAddress";

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
  setModelData,
  modelDetailsOnEdit,
}) => {
  const [autoSave] = useState(true);
  const [purchaseCompleted, setPurchaseCompleted] = useState(false);
  const [alert, setAlert] = useState({});
  const addEllipsisAtEndOfString = str => `${str.substr(0, 40)}...`;

  const [modelEdit, setModelEdit] = useState({name: false,
    description: false,
    publicAccess: false,
    dataLink:false,
  });

  
  const AddressList = () => {
    if (modelData?.address?.length) {
      return modelData?.address.map(address => <li key={address}>{addEllipsisAtEndOfString(address)}</li>);
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

  const serviceRequestErrorHandler = error => {
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

  const handleEditClick = (event,name) => {
    setModelEdit(prevState => {
      return { ...prevState, [name]: true};
    });
  };

  const handleModelNameEdit = event => {
    const{
      target:{
        value,
        name,
      }
    }= event
    setModelData(prevState => {
      return { ...prevState, [name]: value};
    });
  };

  const publicAccessDropdownObject = [
    {key:'true', value:'true', label:'true'},{key:'false', value:'false', label:'false'}
  ];
  
  const publicAccessDropdown = event =>{
    const{
      target:{
        value,
        name,
      }
    }= event
    if(value !== "default"){setModelData(prevState => {
      return { ...prevState, [name]: value};
    });}
  }

  const addEthAddress = text => setModelData(prevState=>{
    return { ...prevState, address:[...prevState.address, text]};
  })
  
  const toggleEthAddress = index => {
    const newTEthAddress = [...modelData.address];
    newTEthAddress[index].isCompleted = !newTEthAddress[index]?.isCompleted;
    setModelData(prevState=>{
      return {...prevState, address:[...prevState.address,newTEthAddress]};
    })
  };
  
  const removeEthAddress = index => {
    const newEthAddress = [...modelData.address];
    newEthAddress.splice(index, 1);
    setModelData(prevState=>{
          return {...prevState, address:newEthAddress};
        })
  };

  console.log(modelData, "modelData after edit");
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
            {modelEdit.name === true ? (
              <StyledTextField value={modelData.name} name="name"
               onChange={handleModelNameEdit} />
            ) : (
              <Typography>
                {modelData?.name || ""}
                <EditOutlinedIcon onClick={(e)=>{handleEditClick(e, 'name')}}
                />
              </Typography>
            )}
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={3}>
            <span>Model description:</span>
          </Grid>
          <Grid item xs={9}>
            {modelEdit.description === true? (<StyledTextField value={modelData.description} name="description"
             onChange={handleModelNameEdit} 
            />): (
            <Typography>
              {modelData?.description}
              <EditOutlinedIcon onClick={(e)=>{handleEditClick(e, 'description')}}/>
            </Typography>)}
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={3}>
            <span>Data files:</span>
          </Grid>
          <Grid item xs={9}>
          {modelEdit.dataLink === true ?(
              <StyledTextField value={modelData.dataLink} name="dataLink"
               onChange={handleModelNameEdit} />
            ): (<Typography>
              <a href={modelData.dataLink} title="Zipped File Name">
                {modelData?.dataLink}
              </a>
              <EditOutlinedIcon onClick={(e)=>{handleEditClick(e, 'dataLink')}} />
            </Typography>) }
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={3}>
            <span>Access for this model:</span>
          </Grid>
          <Grid item xs={9}>
            {modelEdit.publicAccess === true?
             (<StyledDropdown
             value={modelData?.publicAccess}
             name="publicAccess"
             list = {publicAccessDropdownObject}
             onChange={publicAccessDropdown}
             />)
             :(<Typography>
              {modelData?.publicAccess}
              <EditOutlinedIcon  onClick={(e)=>{handleEditClick(e, 'publicAccess')}}/>
            </Typography>)}
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={3}>
            <span>Ethereum address:</span>
          </Grid>
          <Grid item xs={9}>
            <ul>
              {modelData?.publicAccess === "true" ?
              (<div className={classes.ethAddressContainer}>
                {modelData.address.map((address, index) => (
                  <div key={index.toString()} className={classes.addedEthAdd}>
                  <span onClick={() => toggleEthAddress(index)}>{address}</span>
                    <DeleteOutlineIcon onClick={() => removeEthAddress(index)} />
                   </div>
                ))}
                <AddMoreEthAddress addEthAddress={addEthAddress} />
              </div>)
              :<AddressList />}
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

const mapStateToProps = state => ({
  wallet: state.userReducer.wallet,
  channelInfo: channelInfo(state),
  groupInfo: groupInfo(state),
  serviceDetails: currentServiceDetails(state),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  startLoader: () => dispatch(loaderActions.startAppLoader(LoaderContent.TRAIN_MODEL)),
  stopLoader: () => dispatch(loaderActions.stopAppLoader),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(Payment));
