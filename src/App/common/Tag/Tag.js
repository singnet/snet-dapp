import React from 'react';
import PropTypes from 'prop-types';
import Chip from '@material-ui/core/Chip';

const Tag = ({ children }) => {
  return <Chip label={children} />;
};

Tag.propTypes = {
  children: PropTypes.string.isRequired
};

export default Tag;
