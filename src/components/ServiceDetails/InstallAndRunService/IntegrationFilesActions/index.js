import React from "react";
import { withStyles } from "@mui/styles";
import { useSelector } from "react-redux";
import { useStyles } from "../styles";
import StyledButton from "../../../common/StyledButton";
import DownloadMedia, { isMediaAvailableForDownloading } from "../../../../utility/MediaHelper";
import { tabsContent } from "../TabsMeta";

const IntegrationFilesActions = ({ classes, tabName }) => {
  const { media } = useSelector((state) => state.serviceDetailsReducer.details);
  const content = tabsContent[tabName];

  const downloadIntegrationFiles = () => {
    DownloadMedia(media, content.assetType, content.fileName);
  };

  const description = `Download the ${content.projectName} to help you integrate this AI service with your application. Once you setup your configuration, use the token generator below to test the servcie with a number of free calls.`;
  const isDownloadAvailable = isMediaAvailableForDownloading(media, content.assetType);

  return (
    <section className={classes.cardContainer}>
      <div className={classes.descriptionBtnsContainer}>
        <p>{description}</p>
        <div className={classes.btnContainer}>
          <StyledButton
            type="blue"
            btnText="Download Integration files"
            onClick={downloadIntegrationFiles}
            disabled={!isDownloadAvailable}
          />
          <StyledButton type="transparent" btnText="view tutorial" href={content.docsLink} target="_blank" />
        </div>
      </div>
    </section>
  );
};

export default withStyles(useStyles)(IntegrationFilesActions);
