import React, { Fragment } from "react";
import { withStyles } from "@material-ui/styles";
import MenuIcon from "@material-ui/icons/Menu";
import { connect } from "react-redux";
import { stylesActions } from "../../../../Redux/actionCreators";
import CloseIcon from "@material-ui/icons/Close";

import { useStyles } from "./styles";

const MobileHeader = ({ classes, data, hamburgerMenu, updateHamburgerState }) => {
  const toggleMobileMenu = () => {
    updateHamburgerState(!hamburgerMenu);
  };

  if (!hamburgerMenu) {
    return (
      <div className={classes.hamburger} onClick={toggleMobileMenu}>
        <MenuIcon />
      </div>
    );
  }

  return (
    <Fragment>
      <div className={classes.mobileNavContainer}>
        <div className={classes.closeMenuIcon}>
          <CloseIcon onClick={toggleMobileMenu} />
        </div>
        <nav className={classes.mobileNavigation}>
          <ul>
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
      </div>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  hamburgerMenu: state.stylesReducer.hamburgerMenu,
});

const mapDispatchToProps = dispatch => ({
  updateHamburgerState: hamburgerState => dispatch(stylesActions.updateHamburgerState(hamburgerState)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(MobileHeader));
