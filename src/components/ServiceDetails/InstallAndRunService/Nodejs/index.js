import React from "react";
import { withStyles } from "@material-ui/styles";
import { useSelector } from "react-redux";
import { useStyles } from "../styles";
import CodeSnippet from "../../../common/CodeSnippet";
import StyledButton from "../../../common/StyledButton";
import DownloadMedia from "../../../../utility/MediaHelper";

const Nodejs = ({ classes, description }) => {
  const { media } = useSelector(state => state.serviceDetailsReducer.details);

  const downloadIntegrationFiles = () => {
    DownloadMedia(media, "grpc-stub/nodejs", "nodejs.zip");
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
          <span>
            Install the boilerplatecode & Update <b>.env</b>
          </span>
          <CodeSnippet>npm install</CodeSnippet>
        </div>
        <div>
          <span>
            Update <b>aiService.js</b> with the following points
          </span>
          <CodeSnippet>
            1. Please validate the import statements of the service and the messages on the top.
            <br />
            2. Update method <b>getServiceClient</b> with correct client from the <b>grpc_pb.js</b> file
            <br />
            3. Initialize the request object and the set the required input values on method <b>exampleService</b>
          </CodeSnippet>
        </div>
        <div>
          <span>
            Replace the method exampleService on aiService.js with the request object and the set the required input
            values
          </span>
          <CodeSnippet>
            This is an example snippet, change accordingly to the interested service
            <br />
            const request = new messages.Numbers();
            <br /> request.setA(20);
            <br /> request.setB(10);
          </CodeSnippet>
        </div>
        <div>
          <span>
            Replace the result with appropriate response expected on <b>aiService.js</b>
          </span>
          <CodeSnippet>result.getValue();</CodeSnippet>
        </div>
        <div>
          <span>Invoke service by running </span>
          <CodeSnippet>npm run start</CodeSnippet>
        </div>
      </div>
    </section>
  );
};

export default withStyles(useStyles)(Nodejs);
