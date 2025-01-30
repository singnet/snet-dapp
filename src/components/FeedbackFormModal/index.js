import { Fragment, useState } from "react";
import FeedbackForm from "./FeedbackForm";
import OpenFormButton from "./OpenFormButton";
import "./styles.css";
import SNETDialog from "@common/SNETDialog";

const FeedbackFormModal = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <Fragment>
      <SNETDialog
        showCloseButton
        isDialogOpen={isModalVisible}
        onDialogClose={() => setIsModalVisible(false)}
        title="Feedback form"
      >
        <FeedbackForm closeForm={() => setIsModalVisible(false)} />
      </SNETDialog>
      <OpenFormButton openForm={() => setIsModalVisible(true)} />
    </Fragment>
  );
};

export default FeedbackFormModal;
