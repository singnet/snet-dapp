import React from "react";
import Modal from "@material-ui/core/Modal";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import CardContent from "@material-ui/core";

import { useStyles } from "./styles";

const ConfirmDelete = ({ open }) => {
  const classes = useStyles();
  return (
    <div>
      <Modal open={open}>
        <Card className={classes.card}>
          <CardHeader
            titlw="Delete User"
            action={
              <IconButton>
                <CloseIcon />
              </IconButton>
            }
          />
          <CardContent>
            <strong>Are you sure?</strong>
          </CardContent>
        </Card>
      </Modal>
    </div>
  );
};

export default ConfirmDelete;
