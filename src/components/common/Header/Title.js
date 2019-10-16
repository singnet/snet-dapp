import React from "react";
import { Link } from "react-router-dom";

import SnetSvgLogo from "../../../assets/images/WhiteLogo.svg";
import Routes from "../../../utility/constants/Routes";
import { useStyles } from "./styles";

const Title = ({ title }) => {
  const classes = useStyles();
  return (
    <h1 className={classes.h1}>
      <Link to={`/${Routes.AI_MARKETPLACE}`} className={classes.logoAnchor}>
        <img src={SnetSvgLogo} alt="SingularityNET" />
      </Link>
    </h1>
  );
};

export default Title;
