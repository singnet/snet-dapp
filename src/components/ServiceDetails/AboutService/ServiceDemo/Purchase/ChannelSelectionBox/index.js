import React from "react";
import Grid from "@material-ui/core/Grid";
import Radio from '@material-ui/core/Radio';
import { withStyles } from "@material-ui/styles";

import { useStyles } from './styles';

const ChannelSelectionBox = ({ classes, checked, title, description, hasInput, disabled }) => {
  return(
  	<Grid container spacing={24} className={classes.ChannelSelectionBoxContainer}>
  		<Grid item xs={4} sm={4} md={4} lg={4} className={classes.LeftSideSection}>
  			<div className={classes.RadioButtonContainer}>
  				<Radio checked={checked} color="primary" name="radio-button" />
  			</div>
  			<div className={classes.InputDataContainer}>
  				<h2>{title}</h2>
          {
            hasInput ?
              <div>
  				      <input type="text" disabled={disabled} />
  				      <span className={classes.value}>0.000002</span>
                <span className={classes.unit}>AGI</span>
              </div>
            :
              ''
          }
  			</div>
  		</Grid>
  		<Grid item xs={8} sm={8} md={8} lg={8} className={classes.selectionBoxDescription}>
  			<p>{description}.</p>
  		</Grid>
  	</Grid>
  )
};

export default withStyles(useStyles)(ChannelSelectionBox);
