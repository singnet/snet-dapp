import React from "react";
import Blockies from "react-blockies";
import PropTypes from "prop-types";

const UserBlockies = props => {
  const { seed, size, scale, className } = props;
  return <Blockies seed={seed} size={size} scale={scale} className={className} />;
};

UserBlockies.propTypes = {
  seed: PropTypes.string.isRequired,
  size: PropTypes.number,
  scale: PropTypes.number,
  className: PropTypes.string,
};

UserBlockies.defaultProps = {
  size: 15,
  scale: 4,
  className: "identicon",
};

export default UserBlockies;
