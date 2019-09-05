import React from "react";

const AlertLink = ({ link }) => {
  if (link) {
    return (
      <a href="#" title="demo">
        {link}
      </a>
    );
  }
  return null;
};

export default AlertLink;
