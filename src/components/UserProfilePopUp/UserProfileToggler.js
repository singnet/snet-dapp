import React, { useState } from "react";
import Icon from "@material-ui/core/Icon";
import { withStyles } from "@material-ui/styles";
import clsx from "clsx";
import { connect } from "react-redux";

import { useStyles } from "./styles";
import UserProfilePopUp from "./";
import UserBlockies from "../common/UserBlockies";

const UserProfileToggler = ({ classes, email }) => {
  const [showProfilePopup, setShowProfilePopup] = useState(false);

  const handleClick = () => {
    setShowProfilePopup(!showProfilePopup);
  };

  if (!showProfilePopup) {
    return (
      <div className={classes.loggedInActions} onClick={handleClick}>
        <Icon className={clsx(classes.icon, "fas fa-bell")} />
        <UserBlockies seed={email} className={classes.reactBlockies} size={8} />
      </div>
    );
  }
  return <UserProfilePopUp handleClick={handleClick} />;
};

const mapStateToProps = state => ({
  email: state.userReducer.email,
});

export default connect(mapStateToProps)(withStyles(useStyles)(UserProfileToggler));
