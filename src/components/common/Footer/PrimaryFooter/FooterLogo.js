import React from "react";

import Logo from "./../../../../assets/images/WhiteLogo.svg";

import { useStyles } from "./styles";

const FooterLogo = () => {
  const classes = useStyles();
  return (
    <div className={classes.FooterLogo}>
      <h1>
        <a href="/" title="SingularityNET">
          <img src={Logo} alt="SingularityNET" />
        </a>
      </h1>
    </div>
  );
};

export default FooterLogo;
