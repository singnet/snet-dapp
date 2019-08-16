import React from "react";
import { withStyles } from "@material-ui/styles";

import { useStyles } from "./styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";

const GifContainer = ({ classes, content }) => {
  return (
    <Card className={(classes.GifContainer, classes.CardContainer)}>
      <CardMedia
        component="iframe"
        image="https://media.giphy.com/media/pLLLNpJWp6jjW/giphy.gif"
        title="Contemplative Reptile"
      />
    </Card>
  );
};

export default withStyles(useStyles)(GifContainer);
