import React from "react";
import { withStyles } from "@material-ui/styles";

import Routes from "../../../utility/constants/Routes";
import StyledButton from "../../common/StyledButton";
import { useStyles } from "./styles";

const GetStartedDescription = ({ classes, title, description, button, btnText, btnType, history }) => {
  const handleClick = () => {
    history.push(`/${Routes.SIGNUP}`);
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
