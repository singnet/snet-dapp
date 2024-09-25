import React from "react";
// import { useSelector } from "react-redux";
import Header from "../../common/Header";
// import SNETHeader from "snet-dapp-components/components/SNETHeader";
import SNETFooter from "snet-dapp-components/components/SNETFooter";
import { useStyles } from "./styles";
// import { localStorageKeys, useLocalStorage } from "../../Hooks/useLocalStorage";
// import UserProfileToggler from "../../UserProfilePopUp/UserProfileToggler";
// import LogOutAction from "../../LoggedOutActions";

const withInAppWrapper = (InputComponent) => {
  return (props) => {
    const classes = useStyles();
    // const [showUpdateNotification, setShowUpdateNotificationBar] = useLocalStorage(
    //   localStorageKeys.SHOW_PHASE2_NOTIFICATION,
    //   false
    // );
    // const isLoggedIn = useSelector((state) => state.userReducer.login.isLoggedIn);

    // const onUpdateCloseClick = () => {
    //   setShowUpdateNotificationBar(false);
    // };

    return (
      <>
        <Header />
        {/* <SNETHeader
          color="purple"
          isLoggedIn={isLoggedIn}
          showNotification={showUpdateNotification}
          onCloseClick={onUpdateCloseClick}
          LoggedInActions={UserProfileToggler}
          LoggedOutActions={LogOutAction}
        /> */}
        <div className={classes.scrollableContent}>
          {/* ${showUpdateNotification ? classes.increaseTopSpace : null}` */}
          <div className={classes.componentHolder}>
            <InputComponent {...props} />
          </div>
          <SNETFooter />
        </div>
      </>
    );
  };
};

export default withInAppWrapper;
