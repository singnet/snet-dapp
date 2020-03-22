import React from "react";
import PropTypes from "prop-types";
import LaunchIcon from "@material-ui/icons/Launch";

import Row from "./Row";

const ProjectURL = ({ URL }) => {
  if (!URL) {
    return null;
  }
  return (
    <Row
      header="Project URL"
      content={
        <React.Fragment>
          {URL ? <LaunchIcon /> : ""}
          <a href={URL} target="_blank" rel="noopener noreferrer" alt="URL">
            {URL}
          </a>
        </React.Fragment>
      }
    />
  );
};

ProjectURL.propTypes = {
  URL: PropTypes.string,
};

export default ProjectURL;
