import React, { Fragment } from "react";
import { withStyles } from "@material-ui/styles";
import MenuIcon from "@material-ui/icons/Menu";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
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
        <List component="nav" className={classes.mobileNavigation}>
          {data.map(tab => (
            // eslint-disable-next-line react/jsx-key
            <ListItem button component="a" href={tab.link} target={tab.newTab ? "_blank" : "_self"} title={tab.title}>
              <ListItemText primary={tab.title} />
            </ListItem>
          ))}
        </List>
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
