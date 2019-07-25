import React from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/styles";
import Typography from '@material-ui/core/Typography'

import { useStyles } from "./styles";

const FeatureMedia = ({ classes, activeIndex }) => {
	return (
		<div>
		  { activeIndex === 0 && <TabContainer>Item One</TabContainer> }
      { activeIndex === 1 && <TabContainer>Item Two</TabContainer> }
      { activeIndex === 2 && <TabContainer>Item Three</TabContainer> }
      { activeIndex === 3 && <TabContainer>Item Four</TabContainer> }
      { activeIndex === 4 && <TabContainer>Item Five</TabContainer> }
    </div>
	)
}

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 24 }}>
      {props.children}
    </Typography>
  );
}

export default withStyles(useStyles)(FeatureMedia);