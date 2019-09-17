import React from "react";

import { storiesOf } from "@storybook/react";
import AlertText from "./";
import { alertTypes } from "../AlertBox";

storiesOf("Alerts|AlertText", module)
  .add("_default", () => <AlertText message="default" />)
  .add("Success", () => <AlertText type={alertTypes.SUCCESS} message="Success alert !" />)
  .add("Info", () => <AlertText type={alertTypes.INFO} message="Success alert !" />)
  .add("Warning", () => <AlertText type={alertTypes.WARNING} message="Success alert !" />)
  .add("Error", () => <AlertText type={alertTypes.ERROR} message="Success alert !" />);
