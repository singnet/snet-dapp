import React, { useState } from "react";
import Icon from "@material-ui/core/Icon";
import { withStyles } from "@material-ui/styles";
import clsx from "clsx";

import { useStyles } from "./styles";
import UserProfilePopUp from "./";

const UserProfileToggler = ({ classes }) => {
  const [showProfilePopup, setShowProfilePopup] = useState(false);

  const handleClick = () => {
    setShowProfilePopup(!showProfilePopup);
  };

  if (!showProfilePopup) {
    return (
      <div className={classes.loggedInActions} onClick={handleClick}>
        <Icon className={clsx(classes.icon, "fas fa-bell")} />
        <Icon className={clsx(classes.icon, "fas fa-user-circle")} />
      </div>
    );
  }
  return <UserProfilePopUp handleClick={handleClick} />;
};

export default withStyles(useStyles)(UserProfileToggler);
