import React from "react";
import ReactDOM from "react-dom";
import { Provider as ReduxProvider } from "react-redux";

import "./index.css";
import "./assets/icomoon.css";
import configureStore from "./Redux/Store";
import SnetApp from "./SnetApp";

const store = configureStore();

ReactDOM.render(
  <ReduxProvider store={store}>
    <SnetApp />
  </ReduxProvider>,
  document.getElementById("root")
);
