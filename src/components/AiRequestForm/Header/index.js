import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { useStyles } from "./styles";
import NavBar from "./NavBar";
import MobileHeader from "./MobileHeader";
import SnetSvgLogo from "../../../assets/images/WhiteLogo.svg";
import Routes from "../../../utility/constants/Routes";

const Header = ({ data, fixHeader }) => {
  const classes = useStyles();

  return (
    <header className={`${classes.header} ${fixHeader ? classes.addBg : ""}`}>
      <div className={classes.mainHeader}>
        <div className={classes.logoSection}>
          <MobileHeader data={data} />
          <h1 className={classes.h1}>
            <Link to={`/${Routes.AI_MARKETPLACE}`} className={classes.logoAnchor}>
              <img src={SnetSvgLogo} alt="SingularityNET" loading="lazy" />
            </Link>
          </h1>
        </div>
        <div className={classes.navigationSection}>
          <NavBar data={data} />
        </div>
      </div>
    </header>
  );
};

const mapStateToProps = state => ({ isLoggedIn: state.userReducer.login.isLoggedIn });

export default connect(mapStateToProps)(Header);
