import React from 'react';
import PropTypes from 'prop-types';

import Tag from '../Tag/Tag';

const Tags = ({ list }) => {
  return list.map(tag => <Tag key={tag}>{tag}</Tag>);
};

Tags.propTypes = {
  list: PropTypes.arrayOf(PropTypes.string.isRequired)
};

Tags.defaultProps = {
  list: []
};

export default Tags;
