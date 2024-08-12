import React from "react";
import { withStyles } from "@mui/styles";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";
import Icon from "@mui/material/Icon";
import clsx from "clsx";

import { useStyles } from "./styles";

const UserProfileCard = ({ classes, nickName, onClose }) => {
  return (
    <div className={classes.Userdetails}>
      <Icon className={clsx(classes.icon, "fas fa-user-circle")} />
      <div>
        <h4>{nickName}</h4>
      </div>
      {onClose && <CloseIcon className={classes.closeIcon} onClick={onClose} />}
    </div>
  );
};

UserProfileCard.propTypes = {
  nickName: PropTypes.string,
  onClose: PropTypes.func,
};

export default withStyles(useStyles)(UserProfileCard);
