import React from "react";

import ToolBar from "./ToolBar";
import CardGroup from "./CardGroup";
import StyledPagination from "./StyledPagination";
import { useStyles } from "./styles";

const ServiceCollection = ({ cardGroupProps, toolbarProps, paginationProps }) => {
  const classes = useStyles();
  return (
    <div className={classes.serviceCollection}>
      <ToolBar {...toolbarProps} />
      <CardGroup {...cardGroupProps} />
      <StyledPagination {...paginationProps} />
    </div>
  );
};

export default ServiceCollection;
