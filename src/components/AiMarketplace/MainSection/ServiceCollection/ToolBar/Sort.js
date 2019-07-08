import React, { Fragment } from "react";

import StyledDropdown from "../../../../common/StyledDropdown";
import { useStyles } from "./styles";
import { sortByCategories } from "../../../../../utility/constants/Pagination";

const Sort = () => {
  const classes = useStyles();
  return (
    <Fragment>
      <span className={classes.sortbyTxt}>Sort by:</span>
      <StyledDropdown list={sortByCategories} labelTxt="select one" />
    </Fragment>
  );
};

export default Sort;
