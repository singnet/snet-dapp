import React from "react";
import { storiesOf } from "@storybook/react";

import BulletPoint from "./";
import { alertTypes } from "../AlertBox";

storiesOf("Bullet Point", module)
  .addParameters({
    props: {
      propTables: [BulletPoint],
    },
  })
  .add("_default", () => <BulletPoint type={alertTypes.WARNING} message="Sample Message" />);
