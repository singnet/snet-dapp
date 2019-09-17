import React from "react";
import { storiesOf } from "@storybook/react";
import AlertBox, { alertTypes } from "./";

storiesOf("Alerts|AlertBox", module)
  .add("_default", () => <AlertBox message="Default" />)
  .add("Success", () => <AlertBox type={alertTypes.SUCCESS} message="Success" />)
  .add("Info", () => <AlertBox type={alertTypes.INFO} message="Info" />)
  .add("Warning", () => <AlertBox type={alertTypes.WARNING} message="Warning" />)
  .add("Error", () => <AlertBox type={alertTypes.ERROR} message="Error" />);
