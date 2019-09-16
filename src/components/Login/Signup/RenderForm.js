import React, { Fragment } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/styles";
import { Icon } from "@material-ui/core";
import isEmpty from "lodash/isEmpty";

import StyledButton from "../../common/StyledButton";
import AlertBox, { alertTypes } from "../../common/AlertBox";
import { useStyles } from "./styles";
import AlertText from "../../common/AlertText";
import { PasswordCriteria } from "../../../utility/constants/ValidtionMessages";
import { signupFormConstraints, passwordInlineConstraints } from "./validationConstraints";
import snetValidator from "../../../utility/snetValidator";

const RenderForm = ({
  classes,
  nickname,
  handleNickname,
  email,
  handleEmail,
  password,
  handlePassword,
  alert,
  handleSubmit,
}) => {
  const validEmail = () => {
    const isNotValid = snetValidator({ email }, { email: signupFormConstraints.email });
    if (isNotValid && !isEmpty(email)) {
      return isNotValid[0];
    }
    return null;
  };

  return (
    <Fragment>
      <Grid item xs={12} sm={12} md={6} lg={6} className={classes.signupInfo}>
        <h2>Sign up now to get a free account!</h2>
        <p>
          Gain instant access to an ever-growing collection of unique, privacy-preserving AI services for your company
          or personal use.
        </p>
        <ul>
          <li>
            <Icon className="fas fa-check-circle" />
            <p>Use the free trial to try out all the available AI services.</p>
          </li>
          <li>
            <Icon className="fas fa-check-circle" />
            <p>Integrate any AI service to your business.</p>
          </li>
        </ul>
      </Grid>

      <Grid item xs={12} sm={12} md={6} lg={6} className={classes.signupFormWrapper}>
        <form noValidate autoComplete="off" className={classes.signupForm}>
          <TextField
            id="outlined-user-name"
            label="Nickname"
            className={classes.textField}
            value={nickname}
            onChange={handleNickname}
            margin="normal"
            variant="outlined"
            autoFocus
          />
          <div>
            <TextField
              id="outlined-email-input"
              label="Email"
              className={classes.textField}
              type="email"
              name="email"
              autoComplete="email"
              margin="normal"
              variant="outlined"
              value={email}
              onChange={handleEmail}
            />
            <AlertText type={alertTypes.ERROR} message={validEmail()} />
          </div>
          <TextField
            id="outlined-password-input"
            label="Password"
            className={classes.textField}
            type="password"
            autoComplete="current-password"
            margin="normal"
            variant="outlined"
            value={password}
            onChange={handlePassword}
          />
          <div className={classes.passwordCriteriaContainer}>
            <p>Include:</p>
            <AlertText
              type={
                isEmpty(snetValidator.single(password, passwordInlineConstraints.upperCase))
                  ? alertTypes.SUCCESS
                  : alertTypes.ERROR
              }
              message={`${PasswordCriteria.UPPER_CASE}, `}
            />
            <AlertText
              type={
                isEmpty(snetValidator.single(password, passwordInlineConstraints.lowerCase))
                  ? alertTypes.SUCCESS
                  : alertTypes.ERROR
              }
              message={`${PasswordCriteria.LOWER_CASE}, `}
            />
            <AlertText
              type={
                isEmpty(snetValidator.single(password, passwordInlineConstraints.length))
                  ? alertTypes.SUCCESS
                  : alertTypes.ERROR
              }
              message={`${PasswordCriteria.MIN_CHARS}, `}
            />
            <AlertText
              type={
                isEmpty(snetValidator.single(password, passwordInlineConstraints.AWSSplChars))
                  ? alertTypes.SUCCESS
                  : alertTypes.ERROR
              }
              message={`${PasswordCriteria.SPECIAL_CHAR}, `}
            />
            <AlertText
              type={
                isEmpty(snetValidator.single(password, passwordInlineConstraints.number))
                  ? alertTypes.SUCCESS
                  : alertTypes.ERROR
              }
              message={PasswordCriteria.NUMBER}
            />
          </div>
          <AlertBox type={alert.type} message={alert.message} />
          <div style={{ marginTop: 20 }} />
          <StyledButton type="blue" btnText="Create Account" onClick={handleSubmit} btnType="submit" />
        </form>
      </Grid>
    </Fragment>
  );
};

export default withStyles(useStyles)(RenderForm);
