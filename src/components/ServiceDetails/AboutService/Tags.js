import React from "react";
import { withStyles } from "@material-ui/styles";

import { useStyles } from "./styles";
import Tag from "./Tag";

const Tags = ({ classes, tags }) => {
  return (
    <div className={classes.tagsContainer}>
      <h5>Tags</h5>
      <div>{tags && tags.map(tag => <Tag key={tag.tag_name} text={tag.tag_name} />)}</div>
    </div>
  );
};

export default withStyles(useStyles)(Tags);
