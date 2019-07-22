import React, { Fragment } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/styles";
import { Icon } from "@material-ui/core";

import StyledButton from "../../common/StyledButton";
import AlertBox from "../../common/AlertBox";
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
        <h2>Sign up now to get a free account!</h2>
        <p>
          {" "}
          Gain instant access to an ever-growing collection of unique, privacy-preserving AI services for your company
          or personal use.{" "}
        </p>
        <ul>
          <li>
            <Icon className="fas fa-check-circle" />
            <p>Get free credits to try out all the available AI services.</p>
          </li>
          <li>
            <Icon className="fas fa-check-circle" />
            <p>Integrate any AI service to your business.</p>
          </li>
        </ul>
      </Grid>

      <Grid item xs={12} sm={12} md={6} lg={6}>
        <form noValidate autoComplete="off" className={classes.signupForm}>
          <TextField
            id="outlined-user-name"
            label="Username"
            className={classes.textField}
            value={username}
            onChange={handleUsername}
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
            {email !== "" && !isValidEmail(email) && (
              <span className={classes.usernameError}>invalid email</span>
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
          <AlertBox type="error" message={error} />
          <div style={{ marginTop: 20 }} />
          <StyledButton type="blue" btnText="Create Account" onClick={handleSubmit} />
        </form>
      </Grid>
    </Fragment>
  );
};

export default withStyles(useStyles)(RenderForm);
