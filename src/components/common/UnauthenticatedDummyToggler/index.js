import { withStyles } from "@mui/styles";

import { useSelector } from "react-redux";

import { useStyles } from "./styles";
import LoginActionsBtns, { actionButtonsThemes } from "../Header/HeaderActions/LoginActionsBtns";
import signInImg from "@/assets/images/signIn.png";

const WithUnauthenticatedDummyToggler = ({ classes, label, children }) => {
  const isLoggedIn = useSelector((state) => state.userReducer.login.isLoggedIn);
  const notLoggedInContent = () => {
    return (
      <div className={classes.unauthenticatedDummy}>
        <div className={classes.imgContainer}>
          <img src={signInImg} title="Login" alt="SignIn" loading="lazy" />
        </div>
        <div className={classes.unauthenticatedDummyTitle}>
          <p>{label ?? "Please login or sign up to access this content."}</p>
        </div>
        <div className={classes.btnContainer}>
          <LoginActionsBtns theme={actionButtonsThemes.ACCENT} />
        </div>
      </div>
    );
  };
  const loggedInContent = () => {
    return children;
  };

  return <>{isLoggedIn ? loggedInContent() : notLoggedInContent()}</>;
};
export default withStyles(useStyles)(WithUnauthenticatedDummyToggler);
