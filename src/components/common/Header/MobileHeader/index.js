import React, { Component, Fragment } from "react";
import { withStyles } from "@material-ui/styles";
import Icon from "@material-ui/core/Icon";
import clsx from "clsx";

import NavItem from "../NavItem";
import { useStyles } from "./styles";

class MobileHeader extends Component {
  state = { showMenu: false };

  toggleMobileMenu = () => {
    this.setState({ showMenu: !this.state.showMenu });
  };

  render() {
    const { classes, data } = this.props;
    const { showMenu } = this.state;

    return (
      <div>
        <div className={classes.hamburger} onClick={this.toggleMobileMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        {showMenu ? (
          <div className={classes.mobileNavContainer}>
            <Icon className={clsx(classes.icon, "fas fa-times")} onClick={this.toggleMobileMenu} />
            <nav className={classes.mobileNavigation}>
              <ul>
                {data.tabs.map(tab => (
                  <NavItem key={tab.title} title={tab.title} link={tab.link} active={tab.active} />
                ))}
                {data.dropdowns.map(dropdown => (
                  <Fragment key={dropdown.label}>
                    <NavItem title={dropdown.label} subHeader />
                    {dropdown.list.map(item => (
                      <NavItem key={item.label} title={item.label} link={dropdown.link} subListItem />
                    ))}
                  </Fragment>
                ))}
              </ul>
            </nav>
          </div>
        ) : null}
      </div>
    );
  }
}

export default withStyles(useStyles)(MobileHeader);
