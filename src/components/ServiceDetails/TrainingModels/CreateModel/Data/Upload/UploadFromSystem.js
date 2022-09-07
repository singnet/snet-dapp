import React, { Fragment } from "react";
import { withStyles } from "@material-ui/styles";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import CloseIcon from "@material-ui/icons/Close";
import { useStyles } from "./styles";

const UploadFromSystem = ({ classes }) => {
  const [fileUploaded, setFileUploaded] = React.useState(true);

  const closeFileName = () => {
    setFileUploaded(false)
  }

  return (
    <div className={classes.uploadFromSystemContainer}>
      <CloudUploadIcon />
      <span>
        Drag and drop image here or{" "}
        <a href="#" title="Click">
          click
        </a>
      </span>
      <p>Only upload sample data file other files will be rejected automatically.</p>
      {fileUploaded ? (
        <div>
          <p>filename.zip</p>
          <CloseIcon onClick={closeFileName} />
        </div>
      ) : null}
    </div>
  );
};

export default withStyles(useStyles)(UploadFromSystem);
