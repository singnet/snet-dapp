import React from "react";
import { withStyles } from "@material-ui/styles";

import { useStyles } from "./styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";

const VideoContainer = ({ classes, content }) => {
  return (
    <Card className={(classes.VideoContainer, classes.CardContainer)}>
      <CardMedia
        component="iframe"
        image="http://techslides.com/demos/sample-videos/small.mp4"
        title="Contemplative Reptile"
        clasName={classes.CardMediaContainer}
      />
    </Card>
  );
};

export default withStyles(useStyles)(VideoContainer);
