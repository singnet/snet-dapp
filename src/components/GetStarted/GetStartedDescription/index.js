import React from "react";
import { withStyles } from "@mui/styles";

import Routes from "../../../utility/constants/Routes";
import StyledButton from "snet-dapp-components/components/StyledButton";
import { useStyles } from "./styles";
import { useNavigate } from "react-router-dom";

const GetStartedDescription = ({ classes, title, description, button, btnText, btnType }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/${Routes.SIGNUP}`, { replace: true });
  };

  return (
    <div className={classes.GetStartedDescription}>
      <h2>{title}</h2>
      <p>{description}</p>
      {button ? <StyledButton btnText={btnText} type={btnType} onClick={handleClick} /> : null}
    </div>
  );
};

export default withStyles(useStyles)(GetStartedDescription);
