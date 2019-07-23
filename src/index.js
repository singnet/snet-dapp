import React from "react";
import ReactDOM from "react-dom";
import { Provider as ReduxProvider } from "react-redux";

import "./index.css";
import "./assets/icomoon.css";
import App from "./App";
import configureStore from "./Redux/Store";

const store = configureStore();

ReactDOM.render(
  <ReduxProvider store={store}>
    <App />
  </ReduxProvider>,
  document.getElementById("root")
);
