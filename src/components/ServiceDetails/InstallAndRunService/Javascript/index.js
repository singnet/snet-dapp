import React from "react";

import { useStyles } from "../styles";
import CodeSnippet from "../../../common/CodeSnippet";
import { withStyles } from "@material-ui/styles";

const Javascript = ({ classes }) => {
  return (
    <section className={classes.languageTabSection}>
      <h2>Install</h2>
      <div>
        <span>Install the SDK using npm</span>
        <CodeSnippet>npm install snet-sdk</CodeSnippet>
      </div>
      <div>
        <span>
          To generate the gRPC client libraries, you need the SingularityNET Command Line Interface, or CLI, which you
          can install using pip
        </span>
        <CodeSnippet>pip install snet-cli</CodeSnippet>
      </div>
      <div>
        <span>Once you have the CLI installed, run the following command to generate gRPC stubs for service</span>
        <CodeSnippet>snet sdk generate-client-library nodejs &lt;org_id&gt; &lt;service_id&gt;</CodeSnippet>
        <span>Run the code </span>
        <CodeSnippet>
          import services from '&lt;path_to_grpc_service_file&gt;' <br />
          import messages from '&lt;path_to_grpc_message_file&gt;' <br />
          const client = sdk.createServiceClient("&lt;org_id&gt;", "&lt;service_id&gt;",
          "&lt;services.&lt;ClientStub&gt;") <br />
        </CodeSnippet>
      </div>
    </section>
  );
};

export default withStyles(useStyles)(Javascript);
