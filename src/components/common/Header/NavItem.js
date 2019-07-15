import React from "react";

import { useStyles } from "./styles";

const NavItem = ({ active, title, link, openInNewTab }) => {
  const classes = useStyles();
  return (
    <li className={classes.navLinks}>
      <a
        href={link}
        title={title}
        className={`${classes.navLinksAnchor} ${active ? classes.activeTab : ""}`}
        target={openInNewTab ? "_blank" : ""}
        rel="noopener noreferrer"
      >
        {title}
      </a>
    </li>
  );
};

NavItem.defaultProps = {
  link: "#",
};

export default NavItem;
