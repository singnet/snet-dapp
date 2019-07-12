import React, { Fragment } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/styles";
import { Icon } from "@material-ui/core";

import StyledButton from "../../common/StyledButton";
import MessageBox from "../../common/MessageBox";
import { isValidEmail } from "../../../utility/Validation";
import { useStyles } from "./styles";

const RenderForm = ({
  classes,
  username,
  handleUsername,
  email,
  handleEmail,
  password,
  handlePassword,
  error,
  handleSubmit,
}) => {
  return (
    <Fragment>
      <Grid item xs={12} sm={12} md={6} lg={6} className={classes.signupInfo}>
        <h2>Sign up for your free account in minutes</h2>
        <p>
          {" "}
          Use your Github account to easily get started, or fill out the form. Get free credits for the first month and
          continue with your perferred wallet or credit card.{" "}
        </p>
        <ul>
          <li>
            <Icon className="fas fa-check-circle" />
            <p>Built for you, powered for enterprise.</p>
          </li>
          <li>
            <Icon className="fas fa-check-circle" />
            <p>Get free credits to try out any of the AI services available. Easily refill your credits anytime. </p>
          </li>
        </ul>
      </Grid>

      <Grid item xs={12} sm={12} md={6} lg={6}>
        <form noValidate autoComplete="off" className={classes.signupForm}>
          <TextField
            id="outlined-user-name"
            label="UserName"
            className={classes.textField}
            value={username}
            onChange={handleUsername}
            margin="normal"
            variant="outlined"
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
            {email !== "" && !isValidEmail(email) && (
              <span className={classes.usernameError}>Error msg - invalid email</span>
            )}
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

          <MessageBox type="error" errorMsg={error} />
          <div style={{ marginTop: 20 }}></div>
          <StyledButton type="blue" btnText="Sign up for free credits" onClick={handleSubmit} />
        </form>
      </Grid>
    </Fragment>
  );
};

export default withStyles(useStyles)(RenderForm);
