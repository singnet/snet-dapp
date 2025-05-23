import PropTypes from "prop-types";
import isEmpty from "lodash/isEmpty";

const Contibutors = ({ contributors }) => {
  if (isEmpty(contributors)) {
    return null;
  }
  const contributorsNames = contributors.map((contributor, index) => contributor.name).join(", ");
  return contributorsNames;
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
