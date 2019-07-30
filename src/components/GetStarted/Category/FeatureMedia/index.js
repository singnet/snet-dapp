import React from "react";
import { withStyles } from "@material-ui/styles";

import { useStyles } from "./styles";

const FeatureMedia = ({ classes, activeIndex, content }) => {
  return (
    <div>
      {activeIndex === 0 && <TabContainer>Item One</TabContainer>}
      {activeIndex === 1 && <TabContainer>Item Two</TabContainer>}
      {activeIndex === 2 && <TabContainer>Item Three</TabContainer>}
      {activeIndex === 3 && <TabContainer>Item Four</TabContainer>}
      {activeIndex === 4 && <TabContainer>Item Five</TabContainer>}
    </div>
  );
};

function TabContainer(props) {
  return (
    <div>
      {props.children}
    </div>
  );
}

export default withStyles(useStyles)(FeatureMedia);
