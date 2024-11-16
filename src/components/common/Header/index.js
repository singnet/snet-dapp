import React from "react";

import { useStyles } from "./styles";
import NavBar from "./NavBar";
import HeaderActions from "./HeaderActions";
import Title from "./Title";
import MobileHeader from "./MobileHeader";
import UpdateNotificationBar from "../../common/UpdateNotificationBar";
import { NavData } from "../../../utility/constants/Header";

const Header = ({ showNotification, onCloseClick }) => {
  const classes = useStyles();
  return (
    <div>
      <header className={classes.header}>
        <div className={classes.updateNotificationBar}>
          <UpdateNotificationBar showNotification={showNotification} onCloseClick={onCloseClick} />
        </div>
        <div className={classes.mainHeader}>
          <div className={classes.logoSection}>
            <MobileHeader data={NavData} />
            <Title />
          </div>
          {!process.env.REACT_APP_SANDBOX && (
            <>
              <div className={classes.navigationSection}>
                <NavBar data={NavData} />
              </div>
              <div className={classes.loginBtnsSection}>
                <HeaderActions />
              </div>
            </>
          )}
        </div>
      </header>
    </div>
  );
};

export default Header;
