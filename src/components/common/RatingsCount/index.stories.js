import React from "react";
import { storiesOf } from "@storybook/react";
import withLiveEditScope from "storybook-addon-react-live-edit/dist/withLiveEditScope";

import RatingsCount from "./";

storiesOf("RatingsCount", module)
  .addParameters({ props: { propTables: [RatingsCount] } })
  .addDecorator(withLiveEditScope({ React, RatingsCount }))
  .addLiveSource("live source", `return <RatingsCount ratingGiven="10" totalRating="35" />`);
