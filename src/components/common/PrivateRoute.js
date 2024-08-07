import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ component: Component, isAllowed, redirectTo, path: sourcePath }) => {
  if (isAllowed) {
    return <Component />;
  }
  return <Navigate to={{ pathname: redirectTo, state: { sourcePath } }} />;
};

export default PrivateRoute;
