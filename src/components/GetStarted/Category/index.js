import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/styles";
import SeacrhIcon from "@material-ui/icons/Search";

import FeatureMedia from "./FeatureMedia";
import VerticalTabs from "./VerticalTabs";
import { useStyles } from "./styles";

class Category extends Component {
	state = { activeIndex: 0 }
	handleChange = (_, activeIndex) => this.setState({ activeIndex })

	render(){		
	  const { activeIndex } = this.state;		
	  const { classes } = this.props;

		return(
			<Grid container spacing={24} className={classes.CategoryWrapper}>
				<Grid item xs={12} sm={12} md={6} lg={6} className={classes.CategoryContent}>
					<div className={classes.Title}>
						<SeacrhIcon />
						<h3>Browsing AI Marketplace</h3>
					</div>
					<p>Exploring AI – Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
					</p>
					<VerticalTabs activeIndex={activeIndex} handleChange={this.handleChange} />
				</Grid>
				<Grid item xs={12} sm={12} md={6} lg={6} className={classes.CategoryMedia}>
					<FeatureMedia activeIndex={activeIndex} />
				</Grid>
			</Grid>
		)
	}
}	

export default withStyles(useStyles)(Category);