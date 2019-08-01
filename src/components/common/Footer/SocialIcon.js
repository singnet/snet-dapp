import React from "react";
import { Icon } from "@material-ui/core";

import { useStyles } from "./styles";

const SocialIcon = ({ item }) => {
  const classes = useStyles();
  return (
    <li className={classes.socialIconsLink}>
      <a href="/" title={item.title} className={classes.socialIcon}>
        <Icon className={item.className} fontSize="large" />
      </a>
    </li>
  );
};

export default SocialIcon;
