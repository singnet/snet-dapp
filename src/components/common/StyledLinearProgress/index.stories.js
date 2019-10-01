import React from "react";
import { storiesOf } from "@storybook/react";
import withLiveEditScope from "storybook-addon-react-live-edit/dist/withLiveEditScope";

import StyledLinearProgress from "./";

storiesOf("StyledLinearProgress", module)
  .addParameters({ props: { propTables: [StyledLinearProgress] } })
  .addDecorator(withLiveEditScope({ React, StyledLinearProgress }))
  .addLiveSource("live source", `return <StyledLinearProgress value="25" />`);
