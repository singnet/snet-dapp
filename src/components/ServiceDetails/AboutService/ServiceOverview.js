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

  const renderSandboxInfo = () => {
    if (process.env.REACT_APP_SANDBOX) {
      return (
        <>
          <p>After testing your component you can package your component with the below command</p>
          <strong> npm run zip-component</strong>
        </>
      );
    }
    return null;
  };

  return (
    <div className={classes.overViewContainer}>
      <h2>Overview</h2>
      {renderSandboxInfo()}
      <p>{parseDescription(description)}</p>
      <Tags className={classes.tagsContainer} tags={tags} />
    </div>
  );
};

export default withStyles(useStyles)(ServiceOverview);
