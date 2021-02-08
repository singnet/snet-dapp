import React from "react";
import { withStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import isEmpty from "lodash/isEmpty";

import { useStyles } from "./styles";
import Row from "./Row";

const Contibutors = ({ contributors, classes }) => {
  if (isEmpty(contributors)) {
    return null;
  }
  const contributorsNames = (
    <p className={classes.contributorsName}>
      {contributors.map((contributor, index) => (
        <span key={contributor.name}>
          {contributor.name} {index + 1 !== contributors.length ? "," : ""}
        </span>
      ))}
    </p>
  );
  return <Row content={contributorsNames} />;
};

Contibutors.propTypes = {
  contributors: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      email_id: PropTypes.string,
    })
  ),
};

export default withStyles(useStyles)(Contibutors);
