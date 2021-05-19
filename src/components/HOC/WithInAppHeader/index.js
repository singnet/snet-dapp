import React, { Fragment, useState } from "react";

import Header from "../../common/Header";
import Footer from "../../common/Footer";
import { useStyles } from "./styles";

const withInAppWrapper = InputComponent => {
  return props => {
    const classes = useStyles();

    const [showUpdateNotification, setShowUpdateNotificationBar] = useState(true);

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
