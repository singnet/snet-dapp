import React from "react";
import MUILink from "@material-ui/core/Link";

const AnchorLink = ({ label, href, external, ...rest }) => {
  if (external) {
    return (
      <MUILink href={href} target="_blank" rel="noopener" {...rest}>
        {label}
      </MUILink>
    );
  }
  return (
    <MUILink href={href} {...rest}>
      {label}
    </MUILink>
  );
};

export default AnchorLink;
