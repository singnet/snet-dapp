import { Fragment, useState } from "react";
import OpenFormButton from "./OpenFormButton";
import "./styles.css";
import FeedbackFormModal from "./FeedbackFormModal";
import { sendFeedbackSnetAPI } from "../../config/SupportAPI";

const FeedbackForm = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <Fragment>
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
