import React, { Fragment } from "react";

import Header from "../../common/Header";
import Footer from "../../common/Footer";
import { useStyles } from "./styles";
import { localStorageKeys, useLocalStorage } from "../../Hooks/useLocalStorage";

const withInAppWrapper = InputComponent => {
  return props => {
    const classes = useStyles();

    const [showUpdateNotification, setShowUpdateNotificationBar] = useLocalStorage(
      localStorageKeys.SHOW_PHASE2_NOTIFICATION,
      true
    );

    const onUpdateCloseClick = () => {
      setShowUpdateNotificationBar(false);
    };

    return (
      <Fragment>
        <Header showNotification={showUpdateNotification} onCloseClick={onUpdateCloseClick} />
        <div className={`${classes.scrollableContent} ${showUpdateNotification ? classes.increaseTopSpace : null}`}>
          <InputComponent {...props} />
          <Footer />
        </div>
      </Fragment>
    );
  };
};

export default withInAppWrapper;
