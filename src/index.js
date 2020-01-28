import React from "react";
import ReactDOM from "react-dom";
import { Provider as ReduxProvider } from "react-redux";
import * as Sentry from "@sentry/browser";

import "./index.css";
import "./assets/icomoon.css";
import configureStore from "./Redux/Store";
import SnetApp from "./SnetApp";

if (process.env.NODE_ENV === "production") {
  Sentry.init({ dsn: process.env.REACT_APP_SENTRY_DSN });
}

const store = configureStore();

ReactDOM.render(
  <ReduxProvider store={store}>
    <SnetApp />
  </ReduxProvider>,
  document.getElementById("root")
);
