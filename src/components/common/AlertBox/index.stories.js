import React from "react";
import { storiesOf } from "@storybook/react";
import AlertBox from "./";
import withLiveEditScope from "storybook-addon-react-live-edit/dist/withLiveEditScope";

storiesOf("Alerts|AlertBox", module)
  .addParameters({ props: { propTables: [AlertBox] } })
  .addDecorator(withLiveEditScope({ React, AlertBox }))
  .addLiveSource("live source", `return <AlertBox type="error" message="Error" />`);
