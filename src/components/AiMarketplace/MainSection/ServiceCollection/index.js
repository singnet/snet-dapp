import React from "react";
import { makeStyles } from "@material-ui/styles";

import ToolBar from "./ToolBar";
import CardGroup from "./CardGroup";
import StyledPagination from "./StyledPagination";

const useStyles = makeStyles(theme => ({
  serviceCollection: {
    paddingLeft: 25
  }
}));

function ServiceCollection({ data }) {
  const classes = useStyles();
  return (
    <div className={classes.serviceCollection}>
      <ToolBar />
      <CardGroup data={data} />
      <StyledPagination />
    </div>
  );
}

export default ServiceCollection;
