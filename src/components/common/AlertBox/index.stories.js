import React from "react";
import { storiesOf } from "@storybook/react";
import AlertBox, { alertTypes } from "./";
import withLiveEditScope from "storybook-addon-react-live-edit/dist/withLiveEditScope";

// storiesOf("Alerts|AlertBox", module)
  // .add("_default", () => <AlertBox message="Default" />)
  // .add("Success", () => <AlertBox type={alertTypes.SUCCESS} message="Success" />)
  // .add("Info", () => <AlertBox type={alertTypes.INFO} message="Info" />)
  // .add("Warning", () => <AlertBox type={alertTypes.WARNING} message="Warning" />)
  // .add("Error", () => <AlertBox type={alertTypes.ERROR} message="Error" />);

  storiesOf("Alerts|AlertBox", module)
  .addParameters({ props: { propTables: [AlertBox], }, })
  .addDecorator(withLiveEditScope({ React, AlertBox }))
  .addLiveSource(
    "live source",
    `return <AlertBox type="error" message="Error" />`
  )
