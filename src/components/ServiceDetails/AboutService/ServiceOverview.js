import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { withStyles } from "@mui/styles";
import parseHtml from "html-react-parser";

import { useStyles } from "./styles";
import Tags from "../../common/Tags";
import Card from "../../common/Card";
import { Link, useLocation } from "react-router-dom";

const ServiceOverview = ({ classes, isTrainingAvailable }) => {
  const location = useLocation();
  const { description, tags } = useSelector((state) => state.serviceDetailsReducer.details);

  const parsedDescription = useMemo(() => {
    return description.startsWith("<div>") ? parseHtml(description) : description;
  }, [description]);

  const SandboxInfo = () => {
    if (!process.env.REACT_APP_SANDBOX) return null;
    return (
      <>
        <p>After testing your component you can package your component with the below command</p>
        <strong> npm run zip-components</strong>
      </>
    );
  };

  const trainingLinkPath = useMemo(() => {
    return location.pathname.split("tab/")[0] + "tab/" + 3;
  }, [location.pathname]);

  const TrainingLink = ({ path }) => (
    <div className={classes.trainingLink}>
      <p>For this service you can create your own training model!</p>
      <Link className={classes.tryTrainingBtn} to={path} aria-label="Try service training now">
        Try now!
      </Link>
    </div>
  );

  return (
    <Card
      header="Overview"
      children={
        <>
          <SandboxInfo />
          <p className={classes.description}>{parsedDescription}</p>
          <Tags tags={tags} />
          {isTrainingAvailable && <TrainingLink path={trainingLinkPath} />}
        </>
      }
    />
  );
};

export default withStyles(useStyles)(ServiceOverview);

ServiceOverview.propTypes = {
  classes: PropTypes.object.isRequired,
  isTrainingAvailable: PropTypes.bool.isRequired,
};
