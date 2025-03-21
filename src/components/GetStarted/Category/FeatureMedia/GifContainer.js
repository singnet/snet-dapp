import React from "react";
import { withStyles } from "@mui/styles";

import { useStyles } from "./styles";

const GifContainer = ({ classes, content }) => {
  return (
    <img
      src={content || "https://media.giphy.com/media/pLLLNpJWp6jjW/giphy.gif"}
      alt="Demo Gif File"
      className={classes.FullWidth}
      loading="lazy"
    />
  );
};

export default withStyles(useStyles)(GifContainer);
