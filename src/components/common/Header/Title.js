import React from "react";

import { useStyles } from "./styles";

const Title = ({ Logo, title }) => {
  const classes = useStyles();
  return (
    <h1 className={classes.h1}>
      <a href="#" title={title} className={classes.logoAnchor}>
        <img src={Logo} alt={title} className={classes.logoIcon} />
      </a>
    </h1>
  );
};

export default Title;
