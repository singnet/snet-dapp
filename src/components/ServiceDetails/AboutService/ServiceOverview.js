import React from "react";
import { withStyles } from "@material-ui/styles";
import parseHtml from "html-react-parser";

import { useStyles } from "./styles";
import Tags from "./Tags";

const ServiceOverview = ({ classes, description, tags }) => {
  const parseDescription = description => {
    if (description.startsWith("<div>")) {
      return parseHtml(description);
    }
    return description;
  };

  return (
    <div className={classes.overViewContainer}>
      <h3>Overview</h3>
      <p>{parseDescription(description)}</p>
      <Tags className={classes.tagsContainer} tags={tags} />
    </div>
  );
};

export default withStyles(useStyles)(ServiceOverview);
