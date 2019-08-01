import React from "react";
import { withStyles } from "@material-ui/styles";

import { useStyles } from "./styles";

const FeatureMedia = ({ classes, content }) => {
  return <TabContainer>Item One</TabContainer>;
};

function TabContainer(props) {
  return <div>{props.children}</div>;
}

export default withStyles(useStyles)(FeatureMedia);
