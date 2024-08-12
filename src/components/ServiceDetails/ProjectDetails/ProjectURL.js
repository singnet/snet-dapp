import React, { Fragment } from "react";
import PropTypes from "prop-types";
import LaunchIcon from "@mui/icons-material/Launch";
import { withStyles } from "@mui/styles";

import { useStyles } from "./styles";
import Row from "./Row";

const ProjectURL = ({ URL, classes }) => {
  if (!URL) {
    return null;
  }
  return (
    <Row
      className={classes.projectURLContainer}
      content={
        <Fragment>
          {URL ? <LaunchIcon /> : ""}
          <a href={URL} target="_blank" rel="noopener noreferrer" alt="URL">
            {URL}
          </a>
        </Fragment>
      }
    />
  );
};

ProjectURL.propTypes = {
  URL: PropTypes.string,
};

export default withStyles(useStyles)(ProjectURL);
