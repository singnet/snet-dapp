import React from "react";
import { withStyles } from "@mui/styles";
import parseHtml from "html-react-parser";

import { useStyles } from "./styles";
import Tags from "../../common/Tags";
import Card from "../../common/Card";
import { Link, useLocation } from "react-router-dom";

const ServiceOverview = ({ classes, description, tags, isTrainingAvailable }) => {
  const location = useLocation();

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
    <Card
      header="Overview"
      children={
        <>
          {renderSandboxInfo()}
          <p className={classes.description}>{parseDescription(description)}</p>
          <Tags tags={tags} />
          {isTrainingAvailable && (
            <div className={classes.trainingLink}>
              <p>For this service you can create your own training model!</p>
              {/* //TODO */}
              <Link className={classes.tryTrainingBtn} to={location.pathname.split("tab/")[0] + "tab/" + 2}>
                Try now!
              </Link>
            </div>
          )}
        </>
      }
    />
  );
};

export default withStyles(useStyles)(ServiceOverview);
