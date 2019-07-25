import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, isAllowed, redirectTo, path: sourcePath, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        isAllowed ? <Component {...props} /> : <Redirect to={{ pathname: redirectTo, state: { sourcePath } }} />
      }
    />
  );
};

export default PrivateRoute;
