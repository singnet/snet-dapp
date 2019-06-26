import React from "react";

import ToolBar from "./ToolBar";
import CardGroup from "./CardGroup";
import StyledPagination from "./StyledPagination";
import { useStyles } from "./styles";

const ServiceCollection = ({ data }) => {
    const classes = useStyles();
    return (
        <div className={classes.serviceCollection}>
            <ToolBar />
            <CardGroup data={data} />
            <StyledPagination />
        </div>
    );
};

export default ServiceCollection;
