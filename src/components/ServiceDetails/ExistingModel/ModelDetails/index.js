import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { withStyles } from "@mui/styles";
import { useStyles } from "./styles";

import Button from "@mui/material/Button";
// import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import StyledButton from "../../../common/StyledButton";
import {
  setCurrentModelDetails,
  deleteModel,
  getTrainingModelStatus,
  setModelsList,
} from "../../../../Redux/actionCreators/ServiceTrainingActions";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { modelStatus } from "../../../../Redux/reducers/ServiceTrainingReducer";
import { updateMetamaskWallet } from "../../../../Redux/actionCreators/UserActions";

const ModelDetails = ({ classes, openEditModel, model }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { modelsList } = useSelector((state) => state.serviceTrainingReducer);
  const { orgId, serviceId } = useParams();

  const [open, setOpen] = useState(false);
  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);

  const isInferenceAvailable = model.status === modelStatus.COMPLETED;

  const handleDeleteModel = async () => {
    await dispatch(deleteModel(orgId, serviceId, model.modelId, model.methodName, model.serviceName));
    setOpen(false);
  };

  // const handleEditModel = () => {
  //   dispatch(setCurrentModelDetails(model));
  //   openEditModel();
  // };

  const handleSetModel = () => {
    dispatch(setCurrentModelDetails(model));
    navigate(location.pathname.split("tab/")[0] + "tab/" + 0); //TODO
  };

  const handleGetModelStatus = async () => {
    const address = await dispatch(updateMetamaskWallet());
    const getModelStatusParams = {
      organizationId: orgId,
      serviceId,
      modelId: model.modelId,
      name: model.serviceName,
      method: model.methodName,
      address,
    };

    const newModelStatus = await dispatch(getTrainingModelStatus(getModelStatusParams));
    const updatedModelList = modelsList.map((modelBeforeUpdating) => {
      let modelForUpdating = modelBeforeUpdating;
      if (modelForUpdating.modelId === model.modelId) {
        modelForUpdating.status = newModelStatus;
      }
      return modelForUpdating;
    });
    await dispatch(setModelsList(updatedModelList));
  };

  return (
    <>
      <div className={classes.modelDetailsContainer}>
        <div className={classes.modelDetails}>
          <div className={classes.titleIdContainer}>
            <h2>{model.modelName}</h2>
            <h3>
              Model id: <span>{model.modelId}</span>
            </h3>
          </div>
          <div className={classes.descriptionContainer}>{model.description}</div>
          <div className={classes.statusAccessLastUpdateContainer}>
            <div className={classes.additionalInfoContainer}>
              <div className={classes.statusValueContainer}>
                Status: <span data-status-type={model.status}>{model.status}</span>
              </div>
              <div className={classes.accessValueContainer}>
                <span>Access: limited({model.addressList.length})</span>
                <ul className={classes.accessValue}>
                  {model.addressList.map((address) => (
                    <li key={address}>{address}</li>
                  ))}
                </ul>
              </div>
            </div>
            <p>Last update: {model.updatedDate}</p>
          </div>
        </div>
        <div className={classes.actionButtons}>
          <div className={classes.actionButtonsGroup}>
            <StyledButton btnText="Inference" disabled={!isInferenceAvailable} onClick={handleSetModel} />
            <StyledButton type="transparentBlueBorder" btnText="Get status" onClick={handleGetModelStatus} />
          </div>
          <div className={classes.actionButtonsGroup}>
            {/* <Button className={classes.updateBtn} onClick={handleEditModel}>
              <EditIcon />
              <span>Edit</span>
            </Button> */}
            <Button className={classes.deleteBtn} onClick={handleOpenModal}>
              <DeleteIcon />
              <span>Delete</span>
            </Button>
          </div>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className={classes.deleteModal}
      >
        <Box className={classes.deleteModalContent}>
          <Typography variant="h6" component="h2">
            Are you sure you want to delete this ?
          </Typography>
          <Typography>
            Are you sure you want ot delete ”Region Recognition” model? This action cannot be undone and you model will
            be unable to recover.
          </Typography>
          <div className={classes.deleteModalActions}>
            <StyledButton btnText="Cancel" type="transparent" onClick={handleCloseModal} />
            <StyledButton btnText="Yes, delete it!" type="redBg" onClick={handleDeleteModel} />
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default withStyles(useStyles)(ModelDetails);
