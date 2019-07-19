import React from "react";
import { withStyles } from "@material-ui/styles";

import { useStyles } from "./styles";
import CodeSnippet from "../../../common/CodeSnippet";
import Function from "../../../common/CodeSnippet/Function";
import Key from "../../../common/CodeSnippet/Key";
import ValueString from "../../../common/CodeSnippet/ValueString";
import ValueNumber from "../../../common/CodeSnippet/ValueNumber";

const Python = ({ classes }) => {
  return (
    <section>
      <h2>Install</h2>
      <p>Install the Ai service to your Python client wiht pip:</p>
      <CodeSnippet>
        snet.
        <Function text="redirectToDApp" />
        (&#123; <br />
        <Key text="items:" />
        [ <br /> &#47;&#47; Replace with ID of your service <br />
        &#123; <Key text="id:" />
        <ValueString text="singularityNet" />,<Key text="maxCalls:" />
        <ValueNumber text="600" />)
      </CodeSnippet>
    </section>
  );
};

export default withStyles(useStyles)(Python);
