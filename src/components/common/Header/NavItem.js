import React from "react";

import { useStyles } from "./styles";

const NavItem = ({ active, title, link }) => {
  const classes = useStyles();
  return (
    <li className={classes.navLinks}>
      <a href={link} title={title} className={`${classes.navLinksAnchor} ${active ? classes.activeTab : ""}`}>
        {title}
      </a>
    </li>
  );
};

export default NavItem;
