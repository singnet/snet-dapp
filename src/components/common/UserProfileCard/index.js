import React from "react";
import { withStyles } from "@material-ui/styles";
import CloseIcon from "@material-ui/icons/Close";
import PropTypes from "prop-types";

import { useStyles } from "./styles";
import UserBlockies from "../UserBlockies";

const UserProfileCard = ({ classes, nickName, onClose, email, size }) => {
  return (
    <div className={classes.Userdetails}>
      <UserBlockies seed={email} className={classes.reactBlockies} size={size} />
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
  email: PropTypes.string,
};

UserProfileCard.defaultProps = {
  size: 15,
};

export default withStyles(useStyles)(UserProfileCard);
