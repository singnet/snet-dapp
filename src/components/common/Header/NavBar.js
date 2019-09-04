import React from "react";
import { withRouter } from "react-router-dom";

import { useStyles } from "./styles";
import NavItem from "./NavItem";
import Routes from "../../../utility/constants/Routes";
import StyledMenu from "../StyledMenu";

const NavBar = ({ data, history }) => {
  const classes = useStyles();

  const isActiveTab = link => {
    if (history.location.pathname === `/${Routes.GET_STARTED}`) {
      return link === `/${Routes.GET_STARTED}`;
    }
    return link !== `/${Routes.GET_STARTED}`;
  };

  return (
    <nav>
      <ul className={classes.navUl}>
        {data.tabs.map(tab => (
          <NavItem
            key={tab.title}
            title={tab.title}
            link={tab.link}
            active={isActiveTab(tab.link)}
            openInNewTab={tab.openInNewTab}
          />
        ))}
        {data.dropdowns.map(dropdown => (
          <StyledMenu key={dropdown.label} label={dropdown.label} list={dropdown.list} />
        ))}
      </ul>
    </nav>
  );
};

export default withRouter(NavBar);
