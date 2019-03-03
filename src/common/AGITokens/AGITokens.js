import React from 'react';
import PropTypes from 'prop-types';

const AGITokens = ({ children }) => {
  return (
    <span>
      {children} AGI
    </span>
  );
};

AGITokens.propTypes = {
  children: PropTypes.string.isRequired
};

export default AGITokens;
