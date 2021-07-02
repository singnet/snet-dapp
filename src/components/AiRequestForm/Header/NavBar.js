import React from "react";

import { useStyles } from "./styles";

const NavBar = ({ data, newTab }) => {
  const classes = useStyles();

  return (
    <nav>
      <ul className={classes.navUl}>
        {data.map(tab => (
          // eslint-disable-next-line react/jsx-key
          <li className={classes.navLinks}>
            <a href={tab.link} title={tab.title} target={tab.newTab ? "_blank" : "_self"}>
              {tab.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
