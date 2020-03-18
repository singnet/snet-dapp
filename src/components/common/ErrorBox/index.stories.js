import React from "react";
import { storiesOf } from "@storybook/react";
import withLiveEditScope from "storybook-addon-react-live-edit/dist/withLiveEditScope";

import ErrorBox from "./";

storiesOf("Alerts | ErrorBox", module)
  .addParameters({ props: { propTables: [ErrorBox] } })
  .addDecorator(withLiveEditScope({ React, ErrorBox }))
  .addLiveSource("live source", `return <ErrorBox errText="Some error text" />`);
