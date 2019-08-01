import React from "react";
import ReactDOM from "react-dom";
import { Provider as ReduxProvider } from "react-redux";

import "./index.css";
import "./assets/icomoon.css";
import App from "./App";
// import SandboxApp from "./sandbox/SandboxApp";
import configureStore from "./Redux/Store";

const store = configureStore();

// const SnetApp = () => {
//   if (process.env.REACT_APP_SANDBOX) {
//     return <SandboxApp />;
//   }

//   return <App />;
// };

ReactDOM.render(
  <ReduxProvider store={store}>
    <App />
  </ReduxProvider>,
  document.getElementById("root")
);
