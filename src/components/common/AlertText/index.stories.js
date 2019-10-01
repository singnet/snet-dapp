import React from "react";
import { storiesOf } from "@storybook/react";
import withLiveEditScope from "storybook-addon-react-live-edit/dist/withLiveEditScope";

import AlertText from "./";
import { alertTypes } from "../AlertBox";

// storiesOf("Alerts|AlertText", module)
  // .add("_default", () => <AlertText message="default" />)
  // .add("Success", () => <AlertText type={alertTypes.SUCCESS} message="Success alert !" />)
  // .add("Info", () => <AlertText type={alertTypes.INFO} message="Success alert !" />)
  // .add("Warning", () => <AlertText type={alertTypes.WARNING} message="Success alert !" />)
  // .add("Error", () => <AlertText type={alertTypes.ERROR} message="Success alert !" />);

storiesOf("AlertText", module)
  .addParameters({ props: { propTables: [AlertText], },})
  .addDecorator(withLiveEditScope({ React, AlertText }))
  .addLiveSource(
    "live source",
    `return <AlertText type="success" message="Success alert !" />`
  )