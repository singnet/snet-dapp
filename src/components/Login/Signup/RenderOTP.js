import React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/styles";

import StyledButton from "../../common/StyledButton";
import ErrorMsgBox from "../../common/ErrorMsgBox";
import { useStyles } from "./styles";

const RenderOTP = ({ classes, otp, handleOTP, handleResendOTP, handleConfirmSignup }) => {
  return (
    <Grid item xs={12} sm={12} md={6} lg={6} className={`${classes.confirmOtp}`}>
      <form noValidate autoComplete="off" className={`${classes.signupForm}`}>
        <h3>Confirm Sign up </h3>
        <p>
          <strong>A verfiication code has been sent to your email address</strong>
        </p>
        <p>
          Please enter the verification code below to confirm your email address. If you are unable to find the email
          from
          <strong> 'otp@singularitynet.io'</strong> in your inbox, make sure to check the spam folder. The code will be
          valid only for 5 minutes.
        </p>
        <TextField
          id="outlined-confirm-otp"
          label="OTP"
          className={classes.textField}
          type="password"
          autoComplete="otp"
          margin="normal"
          variant="outlined"
          value={otp}
          onChange={handleOTP}
        />
        <ErrorMsgBox errorMsg={error} showErr={error} />
        <div className={classes.buttonsContainer}>
          <StyledButton type="blue" btnText="Resend" onClick={handleResendOTP} />
          <StyledButton type="blue" btnText="Conitnue" onClick={handleConfirmSignup} />
        </div>
      </form>
    </Grid>
  );
};

export default withStyles(useStyles)(RenderOTP);
