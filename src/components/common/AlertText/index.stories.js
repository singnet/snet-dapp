import React from "react";
import { storiesOf } from "@storybook/react";
import withLiveEditScope from "storybook-addon-react-live-edit/dist/withLiveEditScope";

import AlertText from "./";

storiesOf("Alerts | AlertText", module)
  .addParameters({ props: { propTables: [AlertText] } })
  .addDecorator(withLiveEditScope({ React, AlertText }))
  .addLiveSource("live source", `return <AlertText type="success" message="Success alert !" />`);
