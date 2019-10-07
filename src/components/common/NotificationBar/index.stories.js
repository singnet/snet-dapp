import React from "react";
import { storiesOf } from "@storybook/react";
import withLiveEditScope from "storybook-addon-react-live-edit/dist/withLiveEditScope";

import NotificationBar from "./";

storiesOf("Alerts | NotificationBar", module)
  .addParameters({ props: { propTables: [NotificationBar] } })
  .addDecorator(withLiveEditScope({ React, NotificationBar }))
  .addLiveSource(
    "live source",
    `return <NotificationBar showNotification="true" message="Notification Bar" type="WARNING" />`
  );
