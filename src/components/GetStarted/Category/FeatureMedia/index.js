import React from "react";
import { withStyles } from "@material-ui/styles";

import { useStyles } from "./styles";
import VideoContainer from "./VideoContainer";
import GifContainer from "./GifContainer";
import ImgContainer from "./ImgContainer";

const FeatureMedia = ({ media }) => {
  if (media.type === "video") {
    return <VideoContainer content={media.content} />;
  }
  if (media.type === "gif") {
    return <GifContainer content={media.content} />;
  }
  if (media.type === "img") {
    return <ImgContainer content={media.content} />;
  }
  return null;
};

FeatureMedia.defaultProps = {
  media: {},
};

export default withStyles(useStyles)(FeatureMedia);
