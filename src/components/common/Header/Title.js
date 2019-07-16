import React from "react";
import { Link } from "react-router-dom";

import Routes from "../../../utility/constants/Routes";
import { useStyles } from "./styles";

const Title = ({ Logo, title }) => {
  const classes = useStyles();
  return (
    <h1 className={classes.h1}>
      <Link to={Routes.AI_MARKETPLACE} className={classes.logoAnchor}>
        <img src={Logo} alt={title} className={classes.logoIcon} />
      </Link>
    </h1>
  );
};

export default Title;
