import React from "react";
import { withStyles } from "@material-ui/styles";
import CloseIcon from "@material-ui/icons/Close";
import PropTypes from "prop-types";
import Icon from "@material-ui/core/Icon";
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
