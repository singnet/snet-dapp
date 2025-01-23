import { useLocation, useNavigate } from "react-router-dom";
import Routes from "../../../../utility/constants/Routes";
import StyledButton from "../../StyledButton";
import { useStyles } from "./styles";

export const actionButtonsThemes = {
  LIGHT: "light",
  ACCENT: "accent",
};

const buttonsColorByTheme = {
  light: {
    login: "transparentBlueBorderDisable",
    signUp: "whiteBorder",
  },
  accent: {
    login: "transparent",
    signUp: "blue",
  },
};

const LoginActionsBtns = ({ theme }) => {
  const classes = useStyles();
  const location = useLocation();
  const navigate = useNavigate();

  const handleRedirection = (redirectTo) => {
    const sourcePath = location.pathname;
    navigate(redirectTo, { state: { sourcePath } });
  };

  const buttonsColor = buttonsColorByTheme[theme ? theme : actionButtonsThemes.LIGHT];

  return (
    <div className={classes.loginBtnsContainer}>
      <StyledButton type={buttonsColor.login} btnText="Login" onClick={() => handleRedirection(`/${Routes.LOGIN}`)} />
      <StyledButton
        type={buttonsColor.signUp}
        btnText="Sign Up Free"
        onClick={() => handleRedirection(`/${Routes.SIGNUP}`)}
      />
    </div>
  );
};

export default LoginActionsBtns;
