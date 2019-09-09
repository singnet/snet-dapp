import React from "react";
import clsx from "clsx";
import { withStyles } from "@material-ui/styles";
import Icon from "@material-ui/core/Icon";
import CloseIcon from "@material-ui/icons/Close";

import { useStyles } from "./styles";

const UserProfileCard = ({ classes, nickName, onClose }) => {
  return (
    <div className={classes.Userdetails}>
      <Icon className={clsx(classes.icon, "fas fa-user-circle")} />
      <div>
        <h4>{nickName}</h4>
      </div>
      <CloseIcon className={classes.closeIcon} onClick={onClose} />
    </div>
  );
};

export default withStyles(useStyles)(UserProfileCard);
