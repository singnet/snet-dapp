import React, { useState } from "react";
import { signUp, confirmSignUp, resendSignUpCode } from "aws-amplify/auth";
import Grid from "@mui/material/Grid";
import { withStyles } from "@mui/styles";
import { useDispatch } from "react-redux";

import Routes from "../../../utility/constants/Routes";
import { useStyles } from "./styles";
import RenderForm from "./RenderForm";
import RenderOTP from "./RenderOTP";
import { userActions, loaderActions } from "../../../Redux/actionCreators";
import { LoaderContent } from "../../../utility/constants/LoaderContent";
import { alertTypes } from "../../common/AlertBox";
import { signupFormConstraints, singupOtpContraints } from "./validationConstraints";
import snetValidator from "../../../utility/snetValidator";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

const SignUp = ({ classes }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [nickname, setNickname] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [alert, setAlert] = useState();
  const [toBeConfirmed, setToBeConfirmed] = useState();
  const [verificationCode, setVerificationCode] = useState();

  const handleNickname = (event) => {
    setNickname(event.currentTarget.value);
  };

  const handleEmail = (event) => {
    setEmail(event.currentTarget.value.toLowerCase());
  };

  const handlePassword = (event) => {
    setPassword(event.currentTarget.value);
  };

  const handleOTP = (event) => {
    setVerificationCode(event.currentTarget.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setAlert({});
    const isNotValid = snetValidator({ nickname, email, password }, signupFormConstraints);
    if (isNotValid) {
      setAlert({ type: alertTypes.ERROR, message: isNotValid[0] });
      return;
    }

    dispatch(loaderActions.startAppLoader(LoaderContent.SIGNUP));
    signUp({
      username: email,
      password,
      options: {
        userAttributes: {
          email,
          nickname,
        },
      },
    })
      .then(() => {
        dispatch(userActions.updateNickname(nickname));
        setToBeConfirmed(true);
        dispatch(loaderActions.stopAppLoader());
      })
      .catch((err) => {
        setAlert({ type: alertTypes.ERROR, message: err.message });
        dispatch(loaderActions.stopAppLoader());
      });
  };

  const handleConfirmSignup = (event) => {
    setAlert({});
    const isNotValid = snetValidator({ otp: verificationCode }, singupOtpContraints);
    if (isNotValid) {
      setAlert({ type: alertTypes.ERROR, message: isNotValid[0] });
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    let route = `/${Routes.LOGIN}`;
    confirmSignUp({ username: email, confirmationCode: verificationCode })
      .then(() => {
        dispatch(userActions.updateEmail(email));
        navigate(route);
      })
      .catch((e) => {
        console.log("e: ", e);

        setAlert({ type: alertTypes.ERROR, message: "email confirmation failed. Please try again" });
      });
  };

  const handleResendVerificationCode = () => {
    setAlert({});
    resendSignUpCode(email)
      .then(() => {
        setAlert({ type: alertTypes.SUCCESS, message: "code resent successfully" });
      })
      .catch((err) => {
        setAlert({ type: alertTypes.ERROR, message: err.message });
      });
  };

  return (
    <div className={classes.signupMainContainer}>
      <Helmet>
        <meta
          name="description"
          content="Developers & researchers welcome! Join SingularityNET Marketplace to share & utilize ethical AI models. Automate tasks, gain insights, and solve problems with cutting-edge AI."
        />
        <meta
          name="keywords"
          content="decentralized AI, AI monetization, pre-trained AI models, AI marketplace, signup"
        />
      </Helmet>
      <Grid container className={classes.signupMainContent}>
        {toBeConfirmed ? (
          <RenderOTP
            otp={verificationCode}
            handleOTP={handleOTP}
            handleResendOTP={handleResendVerificationCode}
            handleConfirmSignup={handleConfirmSignup}
            alert={alert}
          />
        ) : (
          <RenderForm
            nickname={nickname}
            handleNickname={handleNickname}
            email={email}
            handleEmail={handleEmail}
            password={password}
            handlePassword={handlePassword}
            alert={alert}
            handleSubmit={handleSubmit}
          />
        )}
      </Grid>
    </div>
  );
};

export default withStyles(useStyles)(SignUp);
