import React, { Fragment, useState } from "react";
import Icon from "@mui/material/Icon";
import { withStyles } from "@mui/styles";
import clsx from "clsx";

import { useStyles } from "./styles";
import UserProfilePopUp from "./";

const UserProfileToggler = ({ classes }) => {
  const [showProfilePopup, setShowProfilePopup] = useState(false);

  const handleClick = () => {
    setShowProfilePopup(!showProfilePopup);
  };

  return (
    <Fragment>
      <div className={classes.loggedInActions} onClick={handleClick}>
        <Icon className={clsx(classes.icon, "fas fa-user-circle")} />
      </div>
      {showProfilePopup && <UserProfilePopUp handleClick={handleClick} />}
    </Fragment>
  );
};

export default withStyles(useStyles)(UserProfileToggler);
