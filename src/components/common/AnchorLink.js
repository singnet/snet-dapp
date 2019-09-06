import React from "react";
import MUILink from "@material-ui/core/Link";

const AnchorLink = ({ label, href, newTab, ...rest }) => {
  if (newTab) {
    return (
      <MUILink href={href} title={label} target="_blank" rel="noopener" {...rest}>
        {label}
      </MUILink>
    );
  }
  return (
    <MUILink href={href} title={label} {...rest}>
      {label}
    </MUILink>
  );
};

export default AnchorLink;
