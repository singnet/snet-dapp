import React from "react";
import PropTypes from "prop-types";
import isEmpty from "lodash/isEmpty";

import Row from "./Row";

const Contibutors = ({ contributors }) => {
  if (isEmpty(contributors)) {
    return null;
  }
  const contributorsNames = (
    <p>
      {contributors.map((contributor, index) => (
        <span key={contributor.name}>
          {contributor.name} {index + 1 !== contributors.length ? "," : ""}
        </span>
      ))}
    </p>
  );
  return <Row header="Contributors" content={contributorsNames} />;
};

Contibutors.propTypes = {
  contributors: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      email_id: PropTypes.string,
    })
  ),
};

export default Contibutors;
