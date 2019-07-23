import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, isAllowed, redirectTo, ...rest }) => {
  return <Route {...rest} render={props => (isAllowed ? <Component {...props} /> : <Redirect to={redirectTo} />)} />;
};

export default PrivateRoute;
