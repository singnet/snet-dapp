import React, { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import { withStyles } from "@mui/styles";

import StyledButton from "../../common/StyledButton";
import ServiceDemo from "./ServiceDemo";
import serviceOfflineImg from "../../../assets/images/Artboard.png";
import signInImg from "../../../assets/images/signIn.png";
import NoDemoComponent from "../../common/NoDemoComponent";

import { useStyles } from "./styles";
import LoginActionsBtns, { actionButtonsThemes } from "../../common/Header/HeaderActions/LoginActionsBtns";
import FeedbackFormModal from "../../FeedbackFormModal/FeedbackFormModal";
import { sendFeedbackProviderAPI } from "../../../config/SupportAPI";

const DemoToggler = ({
  classes,
  service,
  serviceAvailable,
  // scrollToView,
  demoComponentRequired,
}) => {
  const isLoggedIn = useSelector((state) => state.userReducer.login.isLoggedIn);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const providerSupport = service.contacts.find((contact) => contact.contact_type === "support");

  const sendFeedback = (messageBody) => {
    sendFeedbackProviderAPI({
      ...messageBody,
      providerEmail: providerSupport.email,
      serviceId: service.service_id,
    });
  };

  if (!isLoggedIn) {
    return (
      <div className={classes.serviceOffline}>
        <div className={classes.imgContainer}>
          <img src={signInImg} title="Login" alt="SignIn" loading="lazy" />
        </div>
        <div className={classes.offDemoTitle}>
          <p>Please login or sign up to run this demo for free.</p>
        </div>
        <div className={classes.btnContainer}>
          <LoginActionsBtns theme={actionButtonsThemes.ACCENT} />
        </div>
      </div>
    );
  }
  if (!serviceAvailable) {
    return (
      <Fragment>
        <FeedbackFormModal
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          sendFeedbackAPI={sendFeedback}
        />
        <div className={classes.serviceOffline}>
          <div className={classes.imgContainer}>
            <img
              src={serviceOfflineImg}
              title="Service Not Available"
              alt="Service Not Available due to poor connection "
              loading="lazy"
            />
          </div>
          <div className={classes.offDemoTitle}>
            <p>Service temporary offline by provider.</p>
            <p>Please try again Later.</p>
            <span>If this error is continuing for some time, feel free to reach us.</span>
          </div>
          <div className={classes.btnContainer}>
            <StyledButton
              btnText="CONTACT SERVICE PROVIDER"
              type="transparent"
              onClick={() => setIsModalVisible(true)}
            />
          </div>
        </div>
      </Fragment>
    );
  }

  if (process.env.REACT_APP_SANDBOX !== "true" && !demoComponentRequired) {
    return <NoDemoComponent />;
  }

  return <ServiceDemo service={service} />;
};

export default withStyles(useStyles)(DemoToggler);
