import React from "react";
import { withStyles } from "@material-ui/styles";

import { useStyles } from "./styles";

const VideoContainer = ({ classes, content }) => {
  return (
    <video controls className={classes.FullWidth}>
      <source src={content || "http://techslides.com/demos/sample-videos/small.mp4"} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

export default withStyles(useStyles)(VideoContainer);
