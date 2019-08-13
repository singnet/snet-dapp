import React from "react";
import Grid from "@material-ui/core/Grid";
import Radio from '@material-ui/core/Radio';
import { withStyles } from "@material-ui/styles";

import { useStyles } from './styles';

const ChannelSelectionBox = ({ classes }) => {
  return(
  	<Grid container spacing={24} className={classes.ChannelSelectionBoxContainer}>
  		<Grid item xs={4} sm={4} md={4} lg={4} className={classes.LeftSideSection}>
  			<div className={classes.RadioButtonContainer}>
  				<Radio checked={true} color="primary" name="radio-button" />
  			</div>
  			<div className={classes.InputDataContainer}>
  				<h2>Multiple Calls</h2>
  				<input type="text" name="" />
  				<span>0.000002 AGI</span>
  			</div>
  		</Grid>
  		<Grid item xs={8} sm={8} md={8} lg={8} className={classes.selectionBoxDescription}>
  			<p>Select the no of calls you want to make. The tokens are purchased from the available escrow balance. This  option helps save the gas cost.</p>
  		</Grid>
  	</Grid>
  )
};

export default withStyles(useStyles)(ChannelSelectionBox);
