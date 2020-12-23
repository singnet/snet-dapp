import React from "react";
import { withStyles } from "@material-ui/styles";
import { useStyles } from "./styles";

const imgStyle = {
  transition: "transform .135s cubic-bezier(0.0,0.0,0.2,1),opacity linear .15s",
};

const cont = {
  backgroundColor: "#eee",
  cursor: "pointer",
  overflow: "hidden",
  position: "relative",
};

const Image = ({ classes, photo, margin, direction, top, left, openLightbox, showOverlay, totalLength }) => {
  if (direction === "column") {
    cont.position = "absolute";
    cont.left = left;
    cont.top = top;
  }

  console.log("photo", photo);

  return (
    <div style={{ margin, height: photo.height, width: photo.width, ...cont }}>
      <img alt={photo.title} style={imgStyle} {...photo} onClick={openLightbox} />
      {showOverlay ? (
        <div className={classes.overlayContainer}>
          <span>See More({totalLength - 4})</span>
        </div>
      ) : null}
    </div>
  );
};

export default withStyles(useStyles)(Image);
