import React from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/styles";

import Feature from "./Feature";
import { useStyles } from "./styles";

const Features = ({ classes }) => {
	return (
		<div className={classes.FeaturesWrapper}>
			<h2>All-in-one solution with powerful features</h2>
			<Feature />
		</div>
	)
}


export default withStyles(useStyles)(Features);