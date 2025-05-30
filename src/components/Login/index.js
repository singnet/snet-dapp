import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { withStyles } from "@mui/styles";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";

import StyledButton from "../common/StyledButton";
import AlertBox from "../common/AlertBox";
import Routes from "../../utility/constants/Routes";
import { useStyles } from "./styles";
import { userActions } from "../../Redux/actionCreators";
import snetValidator from "../../utility/snetValidator";
import { loginConstraints } from "./validationConstraints";

const Login = ({ classes }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const loginError = useSelector((state) => state.userReducer.login.error);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    dispatch(userActions.resetLoginError());
  }, [dispatch]);

  const handleEmail = (event) => {
    setEmail(event.currentTarget.value.toLowerCase());
  };

  const handlePassword = (event) => {
    setPassword(event.currentTarget.value);
  };

  const getLinkToMarketplace = () => {
    if (location?.state && location?.state?.sourcePath) {
      return location.state.sourcePath;
    }

    return `/${Routes.AI_MARKETPLACE}`;
  };

  const handleSubmit = async (event) => {
    const route = getLinkToMarketplace();
    const isNotValid = snetValidator({ email, password }, loginConstraints);
    if (isNotValid) {
      dispatch(userActions.updateLoginError(isNotValid[0]));
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    try {
      await dispatch(userActions.login({ email, password, route }));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Grid container>
      <Grid item xs={12} sm={12} md={12} lg={12} className={classes.loginDetails}>
        <h2>Welcome Back</h2>
        <form noValidate autoComplete="off" className={classes.loginForm}>
          <TextField
            id="outlined-user-name"
            label="Email"
            className={classes.textField}
            margin="normal"
            variant="outlined"
            value={email}
            autoFocus
            onChange={handleEmail}
          />
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
          <div className={classes.checkboxSection}>
            <div className={classes.checkbox} />
            <Link to={`/${Routes.FORGOT_PASSWORD}`} replace>
              Forgot password?
            </Link>
          </div>
          <AlertBox type="error" message={loginError} />
          <StyledButton type="blue" btnText="login" onClick={handleSubmit} btnType="submit" />
        </form>
      </Grid>
    </Grid>
  );
};

export default withStyles(useStyles)(Login);
