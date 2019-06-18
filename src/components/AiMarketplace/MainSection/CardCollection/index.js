import React from "react";

import ToolBar from "./ToolBar/index.js";
import CardGroup from "./CardGroup/index.js";
import StyledPagination from "./StyledPagination/index.js";

// Material UI imports
import { makeStyles } from "@material-ui/styles";
const useStyles = makeStyles(theme => ({
  cardCollection: {
    paddingLeft: 25
  }
}));

function CardCollection() {
  const classes = useStyles();
  return (
    <div className={classes.cardCollection}>
      <ToolBar type="listView" />
      <CardGroup />
      <StyledPagination />
    </div>
  );
}

export default CardCollection;
