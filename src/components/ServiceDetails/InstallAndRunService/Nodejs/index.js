import React from "react";
import { withStyles } from "@material-ui/styles";
import { useSelector } from "react-redux";
import { useStyles } from "../styles";
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
          <StyledButton type="blue" disabled btnText="Download Integration files" onClick={downloadIntegrationFiles} />
        </div>
      </div>
      <div className={classes.setingUpFilesContainer} />
    </section>
  );
};

export default withStyles(useStyles)(Nodejs);
