import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

import Routes from "../../utility/stringConstants/Routes";

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={props => (rest.isLoggedIn ? <Component {...props} /> : <Redirect to={Routes.LOGIN} />)} />
  );
};

const mapStateToProps = state => ({
  isLoggedIn: state.userReducer.login.isLoggedIn,
});

export default connect(mapStateToProps)(PrivateRoute);
