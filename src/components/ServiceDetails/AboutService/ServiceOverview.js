import React from "react";
import { withStyles } from "@material-ui/styles";
import parseHtml from "html-react-parser";

import { useStyles } from "./styles";
import Tags from "../../common/Tags";

const ServiceOverview = ({ classes, description, tags }) => {
  const parseDescription = (description) => {
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
          <strong> npm run zip-components</strong>
        </>
      );
    }
    return null;
  };

  return (
    <>
      {renderSandboxInfo()}
      <p className={classes.description}>{parseDescription(description)}</p>
      <Tags tags={tags} />
    </>
  );
};

export default withStyles(useStyles)(ServiceOverview);
