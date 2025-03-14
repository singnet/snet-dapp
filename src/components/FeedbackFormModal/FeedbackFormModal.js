import FeedbackForm from "./FeedbackForm";
import "./styles.css";
import SNETDialog from "@common/SNETDialog";

const FeedbackFormModal = ({ isModalVisible, setIsModalVisible, sendFeedbackAPI }) => {
  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <SNETDialog showCloseButton isDialogOpen={isModalVisible} onDialogClose={closeModal} title="Feedback form">
      <FeedbackForm sendFeedbackAPI={sendFeedbackAPI} closeForm={closeModal} />
    </SNETDialog>
  );
};

export default FeedbackFormModal;
