import React from "react";
import { storiesOf } from "@storybook/react";
import withLiveEditScope from "storybook-addon-react-live-edit/dist/withLiveEditScope";

import OfflineIndicator from "./";

storiesOf("OfflineIndicator", module)
  .addParameters({ props: { propTables: [OfflineIndicator] } })
  .addDecorator(withLiveEditScope({ React, OfflineIndicator }))
  .addLiveSource("live source", `return <OfflineIndicator show="true" />`);
