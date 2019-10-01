import React from "react";

import CodeSnippet from "../../../common/CodeSnippet";

const Javascript = ({ classes }) => {
  return (
    <section>
      <h2>Install</h2>
      <div>
        Install the SDK using npm <br />
        <CodeSnippet>npm install snet-sdk</CodeSnippet>
      </div>
      <br />
      <div>
        To generate the gRPC client libraries, you need the SingularityNET Command Line Interface, or CLI, which you can
        install using pip
        <CodeSnippet>pip install snet-cli</CodeSnippet>
      </div>
      <br />
      <div>
        Once you have the CLI installed, run the following command to generate gRPC stubs for service <br />
        <CodeSnippet>snet sdk generate-client-library nodejs &lt;org_id&gt; &lt;service_id&gt;</CodeSnippet> <br />
        Run the code <br />
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

export default Javascript;
