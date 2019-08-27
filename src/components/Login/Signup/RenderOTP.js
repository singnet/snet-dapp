import React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/styles";

import StyledButton from "../../common/StyledButton";
import AlertBox from "../../common/AlertBox";
import { useStyles } from "./styles";

const RenderOTP = ({ classes, otp, handleOTP, handleResendOTP, handleConfirmSignup, alert }) => {
  return (
    <Grid item xs={12} sm={12} md={6} lg={6} className={`${classes.confirmOtp}`}>
      <h3>Validate your email </h3>
      <form noValidate autoComplete="off" className={`${classes.signupForm}`}>
        <p>
          <strong>
            A verification code has been sent to your registered email address. The code will be valid for 5 minutes.
          </strong>
        </p>
        <p>
          Please enter the verification code below to confirm your email address. Check your spam, or junk folders if
          you encounter any delays. The email should be from otp@singularitynet.io.
        </p>
        <TextField
          id="outlined-confirm-otp"
          label="Verification Code"
          className={classes.textField}
          type="password"
          autoComplete="otp"
          margin="normal"
          variant="outlined"
          value={otp}
          onChange={handleOTP}
          autoFocus
        />
        <AlertBox type={alert.type} message={alert.message} />
        <div className={classes.buttonsContainer}>
          <StyledButton type="transparent" btnText="Resend" onClick={handleResendOTP} />
          <StyledButton type="blue" btnText="Continue" onClick={handleConfirmSignup} />
        </div>
      </form>
    </Grid>
  );
};

export default withStyles(useStyles)(RenderOTP);
