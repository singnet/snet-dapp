import React from "react";

import ToolBar from "./ToolBar";
import CardGroup from "./CardGroup";
import StyledPagination from "./StyledPagination";
import { useStyles } from "./styles";

const ServiceCollection = ({ data, toolbarProps, paginationProps }) => {
  const classes = useStyles();
  return (
    <div className={classes.serviceCollection}>
      <ToolBar {...toolbarProps} />
      <CardGroup cards={data} />
      <StyledPagination {...paginationProps} />
    </div>
  );
};

export default ServiceCollection;
