import feedbackImage from "@assets/images/feedback.webp";
import Button from "@mui/material/Button";
import "./styles.css";

const OpenFormButton = ({ openForm }) => {
  return (
    <div className="feedback-form-launcher-holder">
      <Button onClick={openForm} className="feedback-form-launcher">
        <img src={feedbackImage} alt="feedback" />
      </Button>
    </div>
  );
};

export default OpenFormButton;
