import React from "react";
import { Typography, Box, Modal } from "@mui/material";
import { useStyles } from "./styles";
import { withStyles } from "@mui/styles";

const MobileDialog = ({ classes, isDialogOpen, onDialogClose, title, children }) => {
  return (
    <Modal
      onClose={onDialogClose}
      open={isDialogOpen}
      children={
        <Box className={classes.mobileDialog}>
          <Typography className={classes.titleMobileText}>{title}</Typography>
          <Box>{children}</Box>
        </Box>
      }
    />
  );
};

export default withStyles(useStyles)(MobileDialog);
