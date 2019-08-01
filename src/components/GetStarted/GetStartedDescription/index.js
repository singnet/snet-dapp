import React from "react";
import { withStyles } from "@material-ui/styles";

import StyledButton from "../../common/StyledButton";
import { useStyles } from "./styles";

const GetStartedDescription = ({ classes, title, description, button, btnText, btnType }) => {
  return (
    <div className={classes.GetStartedDescription}>
      <h2>{title}</h2>
      <p>{description}</p>
      {button ? <StyledButton btnText={btnText} type={btnType} /> : null}
    </div>
  );
};

export default withStyles(useStyles)(GetStartedDescription);
