import React from "react";
import { withStyles } from "@material-ui/styles";

import { useStyles } from "./styles";

const Tags = ({ classes, tags }) => {
  const Tag = ({ text }) => {
    return <div className={classes.tag}>{text}</div>;
  };

  return (
    <div className={classes.tagsHolder}>
      <h5>Tags</h5>
      <div className={classes.tagsContainer}>
        {tags && tags.map((tag) => <Tag key={tag.tag_name} text={tag.tag_name} />)}
      </div>
    </div>
  );
};

export default withStyles(useStyles)(Tags);
