import { Fragment, useEffect, useState } from "react";
import OpenFormButton from "./OpenFormButton";
import "./styles.css";
import FeedbackFormModal from "./FeedbackFormModal";
import { sendFeedbackSnetAPI } from "../../config/SupportAPI";
import CaptchaModal from "../Captcha/modal/CaptchaModal";
import { loadCaptchaScript } from "../Captcha/WAFScriptLoad";

const FeedbackForm = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    try {
      loadCaptchaScript();
    } catch (err) {
      console.error("CAPTCHA script error: ", err);
    }
  }, []);

  return (
    <Fragment>
      <CaptchaModal />
      <FeedbackFormModal
        sendFeedbackAPI={sendFeedbackSnetAPI}
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
      />
      <OpenFormButton openForm={() => setIsModalVisible(true)} />
    </Fragment>
  );
};

export default FeedbackForm;
