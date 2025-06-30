import React, { Fragment, useState } from "react";
import { withStyles } from "@mui/styles";

import StyledButton from "../../common/StyledButton";
import ServiceDemo from "./ServiceDemo";
import serviceOfflineImg from "../../../assets/images/Artboard.png";
import NoDemoComponent from "../../common/NoDemoComponent";

import { useStyles } from "./styles";
import FeedbackFormModal from "../../FeedbackFormModal/FeedbackFormModal";
import { sendFeedbackProviderAPI } from "../../../config/SupportAPI";
import UnauthenticatedDummyToggler from "../../common/UnauthenticatedDummyToggler";
import { useSelector } from "react-redux";

const DemoToggler = ({ classes }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const {
    service_id,
    contacts,
    demo_component_required: demoComponentRequired,
    is_available: serviceAvailable,
  } = useSelector((state) => state.serviceDetailsReducer.details);
  const supportContactEmail = contacts.email;

  const sendFeedback = (messageBody) => {
    sendFeedbackProviderAPI({
      ...messageBody,
      providerEmail: supportContactEmail,
      serviceId: service_id,
    });
  };

  const getServiceOrPlaceHolder = () => {
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

    return <ServiceDemo />;
  };

  return (
    <UnauthenticatedDummyToggler label="Please login or sign up to run this demo for free.">
      {getServiceOrPlaceHolder()}
    </UnauthenticatedDummyToggler>
  );
};

export default withStyles(useStyles)(DemoToggler);
