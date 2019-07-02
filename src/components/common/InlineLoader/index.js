import React from "react";
import PropTypes from "prop-types";
import { Icon } from "@material-ui/core";

import { useStyles } from "./styles";

const InlineLoader = ({ loading }) => {
  const classes = useStyles();
  if (loading) {
    return (
      <div className={classes.pendingSection}>
        <Icon className="far fa-hourglass" />
        <span>Pending</span>
      </div>
    );
  }
  return null;
};

InlineLoader.propTypes = {
  loading: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};

export default InlineLoader;
