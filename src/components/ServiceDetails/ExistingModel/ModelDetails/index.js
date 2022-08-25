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

const ModelDetails = ({ classes, title, id, description, status, accessTo, lastUpdate }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);
	const handleDeleteModel = () => {
		setOpen(false);
	}
  return (
    <>
      <div className={classes.modelDetailsContainer}>
        <div className={classes.titleIdContainer}>
          <h3>{title}</h3>
          <p>
            Model id: <span>{id}</span>
          </p>
        </div>
        <p>{description}</p>
        <div className={classes.statusAccessLastUpdateContainer}>
          <div>
            <p>
              Status: <span data-status-type={status}>{status}</span>
            </p>
            <p className={classes.accessValue}>
              Access:
							{/* { */}
								{/* accessTo === 'limited' ? */}
								<>
									<span> limited(4)</span>
									<ul>
										<li>90986239898</li>
										<li>90986239898</li>
										<li>90986239898</li>
										<li>90986239898</li>
									</ul>
									</>
								{/* : <span>{accessTo}</span> */}
							{/* } */}
            </p>
          </div>
          <p>Last update: {lastUpdate}</p>
        </div>
        <div className={classes.actionButtons}>
          <div>
            <Button className={classes.updateBtn}>
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
            Are you sure you want to delete this ?{" "}
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
