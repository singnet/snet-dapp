import React from "react";
import { withStyles } from "@material-ui/styles";
import { useStyles } from "./styles";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import NearMeOutlinedIcon from "@material-ui/icons/NearMeOutlined";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import StyledButton from "../../../common/StyledButton";

const ModelDetails = ({ classes, model, deleteModels,updateModel }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);
  const handleDeleteModel = () => {
    deleteModels(model);
    setOpen(false);
  };
  const handleUpdateModels = ()=>{
    // console.log('hai');
    updateModel();
  }
  return (
    <>
      <div className={classes.modelDetailsContainer}>
        <div className={classes.titleIdContainer}>
          <h3>Demo Service</h3>
          <p>
            Model id: <span>{model.modelId}</span>
          </p>
        </div>
        <p>{model.description}</p>
        <div className={classes.statusAccessLastUpdateContainer}>
          <div>
            <p>
              Status: <span data-status-type="Inprogress">Inprogress</span>
            </p>
            <p className={classes.accessValue}>
              Access:
              {/* { */}
              {/* accessTo === 'limited' ? */}
              <>
                <span> {`limited(${model.addressList.length})`}</span>
                <ul>
                  {model.addressList.map(address => (
                    <li key={address}>{address}</li>
                  ))}
                </ul>
              </>
              {/* : <span>{accessTo}</span> */}
              {/* } */}
            </p>
          </div>
          <p>Last update: 12-Aug-2022</p>
        </div>
        <div className={classes.actionButtons}>
          <div>
            <Button className={classes.updateBtn} onClick={handleUpdateModels}>
              <EditIcon />
              <span>Update</span>
            </Button>
            <Button className={classes.testBtn}>
              <NearMeOutlinedIcon />
              <span>Test</span>
            </Button>
          </div>
          <Button className={classes.deleteBtn} onClick={handleOpenModal}>
            <DeleteIcon />
            <span>Delete</span>
          </Button>
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
