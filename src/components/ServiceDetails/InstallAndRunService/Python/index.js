import React from "react";
import { withStyles } from "@material-ui/styles";
import { useSelector } from "react-redux";
import { useStyles } from "../styles";
import CodeSnippet from "../../../common/CodeSnippet";
import StyledButton from "../../../common/StyledButton";
import DownloadMedia from "../../../../utility/MediaHelper";
import { networkName } from "../../../../config/Networks";

const Python = ({ classes, description, orgId, serviceId }) => {
const { media } = useSelector(state => state.serviceDetailsReducer.details);

const downloadIntegrationFiles = () => {
   DownloadMedia(media, "grpc-stub/python", "python.zip");
};

  return (
    <section className={classes.languageTabSection}>
      <div className={classes.descriptionBtnsContainer}>
        <p>{description}</p>
        <div className={classes.btnContainer}>
          <StyledButton type="blue" btnText="Download Integration files" onClick={downloadIntegrationFiles} />
          <StyledButton type="transparent" btnText="view tutorial" href="https://dev.singularitynet.io/docs/ai-consumers/sdk-tutorial/" target="_blank"/>
        </div>
      </div>
      <div className={classes.setingUpFilesContainer}>
        <h3>Setting Up Files</h3>
        <div>
          <span>Download and extract integration files</span>
          <CodeSnippet>cd {serviceId}-boilerplate</CodeSnippet>
        </div>
        <div>
          <span>
            Create and activate virtual environment
          </span>
          <CodeSnippet>
            # For unix/macOS:<br />
            &nbsp;&nbsp;-sudo apt-get install python3-venv<br />
            &nbsp;&nbsp;-sudo python3 -m venv venv<br />
            &nbsp;&nbsp;-source ./venv/bin/activate<br />
            # For Windows:<br />
            &nbsp;&nbsp;-py -m pip install --user virtualenv<br />
            &nbsp;&nbsp;-py -m venv venv<br />
            &nbsp;&nbsp;-.\venv\Scripts\activate<br />
          </CodeSnippet>
        </div>
        <div>
          <span>Install python requirements</span>
          <CodeSnippet>pip install -r requirement.txt</CodeSnippet>
        </div>
        <div>
          <span>update config.py with the following points</span>
          <CodeSnippet>
            1. update <b>&#60;your wallet's private key&#62;</b> with your wallet's private key<br />
            2. update <b>&#60;your infura key&#62;</b> with your infura provider key
          </CodeSnippet>
        </div>
        <div>
          <span>update service.py with the following points</span>
          <CodeSnippet>
            1. update <b>service_stub</b> with your service stub from &#60;stub&#62;_pb2_grpc.py file<br />
            2. update <b>input_method</b> with your service's input method<br />
            3. update <b>arguments</b> with your service's arguments<br />
            4. update <b>service_method</b> with your service's output method<br /><br />
            # This is an example snippet, change accordingly to the interested service<br />
            service_client = sdk.create_service_client(<br />
              org_id=config.ORG_ID,<br />
              service_id=config.SERVICE_ID,<br />
              service_stub= example_service_pb2_grpc.CalculatorStub<br />
            )<br />
            request = example_service_pb2.Numbers(a=10, b=2)<br />
            response = service_client.service.add(request)<br />
          </CodeSnippet>
        </div>
        <div>
          <span>Invoke service by running</span>
          <CodeSnippet>python service.py</CodeSnippet>
        </div>
      </div>
    </section>
  );
};

export default withStyles(useStyles)(Python);
