import React from "react";
import ReactDOM from "react-dom";
import { Provider as ReduxProvider } from "react-redux";

import "./index.css";
import "./assets/icomoon.css";
import App from "./App";
import SandboxApp from './sandbox/SandboxApp';
import configureStore from "./Redux/Store";

const store = configureStore();

const renderApp = () => {
  if(process.env.REACT_APP_SANDBOX) {
    return <SandboxApp />;
  }

  return <App />;
};

ReactDOM.render(
  <ReduxProvider store={store}>
    {renderApp()}
  </ReduxProvider>,
  document.getElementById("root")
);
