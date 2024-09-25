import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { confirmSignUp, resendSignUpCode } from "aws-amplify/auth";
import { withStyles } from "@mui/styles";
import { useSelector } from "react-redux";
import AlertText from "snet-dapp-components/components/AlertText";
import InlineLoader from "snet-dapp-components/components/InlineLoader";
import StyledButton from "snet-dapp-components/components/StyledButton";
import { isValidNumber } from "../../../utility/Validation";
import { parseError } from "../../../utility/ErrorHandling";
import { useStyles } from "./styles";
import Routes from "../../../utility/constants/Routes";
import { useNavigate } from "react-router-dom";

const Authentication = ({ classes, handleNextSection }) => {
  const navigate = useNavigate();

  const email = useSelector((state) => state.userReducer.email);

  const [verificationCode, setVerificationCode] = useState("");
  const [enableResend, setEnableResend] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  const handleVerificationCode = (event) => {
    const verificationCode = event.currentTarget.value;
    if (!isValidNumber(verificationCode) || verificationCode.length > 6) {
      return;
    }
    setVerificationCode(verificationCode);
  };

  const handleContinue = () => {
    setLoading(true);
    confirmSignUp({ username: email, confirmationCode: verificationCode })
      .then((res) => {
        setLoading(false);
        navigate(Routes.LOGIN);
      })
      .catch((err) => {
        let error = parseError(err);
        setLoading(false);
        setError(error);
        setEnableResend(true);
      });
  };

  const handleResendCode = () => {
    setLoading(true);
    resendSignUpCode({ username: email })
      .then((res) => {
        setLoading(false);
        handleNextSection();
      })
      .catch((err) => {
        let error = parseError(err);
        setLoading(false);
        setError(error);
      });
  };

  return (
    <div className={classes.authenticationContent}>
      <h3>Validate Email</h3>
      <p className={classes.validateEmailDescription}>
        <span>A verification code has been sent to your registered email address.</span>
        <br /> <br />
        Please enter the verification code below to confirm your email address. Check your spam, or junk folders if you
        encounter any delays. The email should be from otp@singularitynet.io. The code will be valid for 5 minutes.
      </p>
      <InlineLoader loading={loading} />
      <TextField
        id="outlined-verification-code"
        label="Verification Code"
        className={classes.textField}
        type="text"
        name="verificationCode"
        margin="normal"
        variant="outlined"
        value={verificationCode}
        onChange={handleVerificationCode}
      />
      <AlertText message={error} />
      <div className={classes.buttonsContainer}>
        <StyledButton btnText="resend code" type="transparent" disabled={!enableResend} onClick={handleResendCode} />
        <StyledButton btnText="continue" disabled={verificationCode.length !== 6} onClick={handleContinue} />
      </div>
    </div>
  );
};

export default withStyles(useStyles)(Authentication);
