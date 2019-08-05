import React from "react";
import SandboxApp from "./sandbox/SandboxApp";
import App from "./App";

export default () => {
  if (process.env.REACT_APP_SANDBOX) {
    return <SandboxApp />;
  }

  return <App />;
};
