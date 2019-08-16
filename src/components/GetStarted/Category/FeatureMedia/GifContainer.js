import React from "react";
import { withStyles } from "@material-ui/styles";

import { useStyles } from "./styles";

const GifContainer = ({ classes, content }) => {
  return (
    <img
      src={content || "https://media.giphy.com/media/pLLLNpJWp6jjW/giphy.gif"}
      alt="Demo Gif File"
      className={classes.FullWidth}
    />
  );
};

export default withStyles(useStyles)(GifContainer);
