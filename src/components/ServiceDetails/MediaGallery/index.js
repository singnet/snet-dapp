import React from "react";

import { withStyles } from "@material-ui/styles";

import { useStyles } from "./styles";

const MediaGallery = ({ classes }) => {
  return (
    <div className={classes.mediaGalleryContainer}>
      <h2>Media Gallery</h2>
    </div>
  );
};

export default withStyles(useStyles)(MediaGallery);
