import React from "react";
import SandboxApp from "./sandbox/SandboxApp";
import App from "./App";

const SnetApp = () => {
  if (process.env.REACT_APP_SANDBOX) {
    return <SandboxApp />;
  }

  return <App />;
};

export default SnetApp;
