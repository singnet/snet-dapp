import React from "react";
import { withStyles } from "@material-ui/styles";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";

import { useStyles } from "./styles";

const ImageUpload = ({ classes, imageType }) => {
  return (
    <div className={classes.imageUploadContainer}>
      <div className={classes.imageUploadFromContainer}>
        <h4>{imageType}</h4>
        <span className={classes.upload}>Upload</span>
        <span>URL</span>
        <span>Gallery</span>
        <IconButton aria-label="Settings" className={classes.showMore}>
          <MoreVertIcon />
        </IconButton>
      </div>
      <div className={classes.imageUploaderBox}>
        <i className="fas fa-cloud-upload-alt" />
        <span>
          Drag and drop image here or
          <a href="#" title="Click">
            click
          </a>
        </span>
        <p>(Image must be under 10mb. Source images are not saved on the servers after the job is processed.)</p>
      </div>
    </div>
  );
};

export default withStyles(useStyles)(ImageUpload);
