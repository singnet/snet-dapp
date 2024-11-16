import React, { useState } from "react";
import { withStyles } from "@mui/styles";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useDispatch } from "react-redux";

import StyledButton from "../../common/StyledButton";
import { useStyles } from "./styles";
import PrivacyTerms from "./PrivacyTerms";
import { userActions } from "../../../Redux/actionCreators";
import Routes from "../../../utility/constants/Routes";
import AlertBox, { alertTypes } from "../../common/AlertBox";
import { useLocation, useNavigate } from "react-router-dom";

const TermsOfUse = ({ classes }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const [alertMessage, setAlertMessage] = useState();

  const handleChange = (event) => {
    setIsTermsAccepted(event.target.checked);
  };

  const handleSubmit = async () => {
    setAlertMessage();
    const updatedUserData = { is_terms_accepted: isTermsAccepted, email_alerts: false };
    try {
      await dispatch(userActions.updateUserProfile(updatedUserData));
      if (location.state && location.state.sourcePath) {
        navigate(location.state.sourcePath);
        return;
      }
      navigate(`/${Routes.AI_MARKETPLACE}`);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setAlertMessage(error.response.data.error);
        return;
      }

      setAlertMessage(String(error));
    }
  };

  return (
    <div className={classes.onboardingContainer}>
      <div className={classes.termsOfUseContainer}>
        <h3>Review and Accept the Terms of Service</h3>
        <div className={classes.termsAndConditions}>
          <PrivacyTerms />
        </div>
        <div className={classes.checkboxAndButton}>
          <FormControlLabel
            control={<Checkbox checked={isTermsAccepted} onChange={handleChange} color="primary" />}
            label="I agree to the Terms of Service"
          />
          <StyledButton type="blue" btnText="accept" disabled={!isTermsAccepted} onClick={handleSubmit} />
        </div>
        <AlertBox type={alertTypes.ERROR} message={alertMessage} />
      </div>
    </div>
  );
};

export default withStyles(useStyles)(TermsOfUse);
