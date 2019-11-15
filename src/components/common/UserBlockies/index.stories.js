import React from "react";
import { storiesOf } from "@storybook/react";
import withLiveEditScope from "storybook-addon-react-live-edit/dist/withLiveEditScope";

import UserBlockies from "./";

storiesOf("User Blockies", module)
  .addParameters({ props: { propTables: [UserBlockies] } })
  .addDecorator(withLiveEditScope({ React, UserBlockies }))
  .addLiveSource("live source", `return <UserBlockies seed="email" />`);
