import React from "react";
import { storiesOf } from "@storybook/react";
import withLiveEditScope from "storybook-addon-react-live-edit/dist/withLiveEditScope";

import UserProfileCard from "./";

storiesOf("UserProfileCard", module)
  .addParameters({ props: { propTables: [UserProfileCard] } })
  .addDecorator(withLiveEditScope({ React, UserProfileCard }))
  .addLiveSource("live source", `return <UserProfileCard nickName="User Name" />`);
