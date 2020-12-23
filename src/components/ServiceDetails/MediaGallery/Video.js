import React from "react";
import { withStyles } from "@material-ui/styles";
import { useStyles } from "./styles";

const cont = {
  backgroundColor: "#eee",
  cursor: "pointer",
  overflow: "hidden",
  position: "relative",
};

const Video = ({ classes, src, photo, margin, direction, top, left, openLightbox, showOverlay, totalLength }) => {
  if (direction === "column") {
    cont.position = "absolute";
    cont.left = left;
    cont.top = top;
  }

  return (
    <div style={{ margin, height: photo.height, width: photo.width, ...cont }}>
      <iframe
        src={src}
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        onClick={openLightbox}
      />
      {showOverlay ? (
        <div className={classes.overlayContainer}>
          <span>See More({totalLength - 4})</span>
        </div>
      ) : null}
    </div>
  );
};

export default withStyles(useStyles)(Video);
