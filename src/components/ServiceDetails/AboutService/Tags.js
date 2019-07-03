import React from "react";
import { withStyles } from "@material-ui/styles";

import { useStyles } from "./styles";
import Tag from "./Tag";

const Tags = ({ classes, tags }) => {
  return (
    <div className={classes.tagsContainer}>
      <h5>Tags</h5>
      {tags && tags.map(value => <Tag key={value} text={value} />)}
    </div>
  );
};

export default withStyles(useStyles)(Tags);
