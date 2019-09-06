import React from "react";

import { useStyles } from "./styles";
import AnchorLink from "../AnchorLink";

const NavItem = ({ active, title, link, newTab }) => {
  const classes = useStyles();
  return (
    <li className={classes.navLinks}>
      <AnchorLink
        href={link}
        label={title}
        className={`${classes.navLinksAnchor} ${active ? classes.activeTab : ""}`}
        newTab={newTab}
      />
    </li>
  );
};

NavItem.defaultProps = {
  link: "#",
};

export default NavItem;
