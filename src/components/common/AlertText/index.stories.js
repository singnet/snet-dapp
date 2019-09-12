import React from "react";

import { storiesOf } from "@storybook/react";
import AlertText from "./";
import { alertTypes } from "../AlertBox";

storiesOf("AlertText")
  .add("_default", () => <AlertText />)
  .add("Success", () => <AlertText type={alertTypes.SUCCESS} message="Success alert !" />);
