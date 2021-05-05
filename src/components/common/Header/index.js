import React, { useState } from "react";
import { connect } from "react-redux";

import { useStyles } from "./styles";
import NavBar from "./NavBar";
import HeaderActions from "./HeaderActions";
import Title from "./Title";
import MobileHeader from "./MobileHeader";
import UpdateNotificationBar from "../../common/UpdateNotificationBar";
import { NavData } from "../../../utility/constants/Header";

const Header = ({ isLoggedIn }) => {
  const classes = useStyles();
  const [showUpdateNotification, setShowUpdateNotificationBar] = useState(true);

  const onUpdateCloseClick = () => {
    setShowUpdateNotificationBar(false);
  };
  return (
    <div>
      <header className={classes.header}>
        <div className={classes.updateNotificationBar}>
          <UpdateNotificationBar showNotification={showUpdateNotification} onCloseClick={onUpdateCloseClick} />
        </div>
        <div className={classes.mainHeader}>
          <div className={classes.logoSection}>
            <MobileHeader data={NavData} isLoggedIn={isLoggedIn} />
            <Title />
          </div>
          <div className={classes.navigationSection}>
            <NavBar data={NavData} />
          </div>
          <div className={classes.loginBtnsSection}>
            <HeaderActions isLoggedIn={isLoggedIn} />
          </div>
        </div>
      </header>
    </div>
  );
};

const mapStateToProps = state => ({ isLoggedIn: state.userReducer.login.isLoggedIn });

export default connect(mapStateToProps)(Header);
