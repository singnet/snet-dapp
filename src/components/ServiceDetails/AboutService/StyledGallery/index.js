import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import ImageGallery from "react-image-gallery";

import { useStyles } from "./styles";

class StyledGallery extends Component {
  state = {};

  render() {
    const { classes } = this.props;

    const images = [
      {
        original: "http://lorempixel.com/352/172/nature/1/",
        thumbnail: "http://lorempixel.com/115/115/nature/1/",
      },
      {
        thumbnail: "http://lorempixel.com/115/115/nature/2/",
      },
      {
        thumbnail: "http://lorempixel.com/115/115/nature/3/",
      },
      {
        thumbnail: "http://lorempixel.com/115/115/nature/4/",
      },
      {
        thumbnail: "http://lorempixel.com/115/115/nature/5/",
      },
    ];

    return (
      <div className={classes.galleryContainer}>
        <h3>Gallery</h3>
        <ImageGallery
          additionalClass={classes.gallery}
          items={images}
          infinite={false}
          showNav={false}
          showFullscreenButton={false}
          showPlayButton={false}
        />
      </div>
    );
  }
}

export default withStyles(useStyles)(StyledGallery);
