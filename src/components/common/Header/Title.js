import React from "react";
import { Link } from "react-router-dom";

import SnetSvgLogo from "../SnetSvgLogo";
import Routes from "../../../utility/constants/Routes";
import { useStyles } from "./styles";

const Title = ({ title }) => {
  const classes = useStyles();
  return (
    <h1 className={classes.h1}>
      <Link to={Routes.AI_MARKETPLACE} className={classes.logoAnchor}>
        <SnetSvgLogo />
      </Link>
    </h1>
  );
};

export default Title;
