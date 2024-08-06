import React from "react";
import { Route, Navigate } from "react-router-dom";

const PrivateRoute = ({ component: Component, isAllowed, redirectTo, path: sourcePath, ...rest }) => {
  console.log("rendering PrivateRoute");

  return (
    <Route
      {...rest}
      Component={isAllowed ? <Component /> : <Navigate to={{ pathname: redirectTo, state: { sourcePath } }} />}
    />
  );
};

export default PrivateRoute;
