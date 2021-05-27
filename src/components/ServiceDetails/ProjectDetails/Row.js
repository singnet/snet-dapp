import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/styles";

import { useStyles } from "./styles";

const Row = ({ header, content, isURL, classes, className }) => {
  return (
    <div className={className}>
      {header ? <h5>{header}</h5> : null}
      <div>{content}</div>
    </div>
  );
};

Row.propTypes = {
  header: PropTypes.string.isRequired,
  content: PropTypes.string | PropTypes.element.isRequired,
  isURL: PropTypes.bool,
};

export default withStyles(useStyles)(Row);
