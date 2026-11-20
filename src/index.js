import React from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import logo from "./assets/images/Logo_Header_Black.svg";

const root = createRoot(document.getElementById("root"));

if (process.env.REACT_APP_MAINTENANCE_MODE === "true") {
  document.title = "Scheduled maintenance | SingularityNET AI Marketplace";
  root.render(
    <main className="maintenance-page">
      <img src={logo} alt="SingularityNET" width="230" height="60" />
      <h1>Scheduled maintenance</h1>
      <p>The AI Marketplace is temporarily unavailable. Please check back later.</p>
    </main>
  );
} else {
  import("./startApp").then(({ startApp }) => startApp(root));
}
