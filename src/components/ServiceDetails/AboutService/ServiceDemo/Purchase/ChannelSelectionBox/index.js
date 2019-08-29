import React from "react";
import Grid from "@material-ui/core/Grid";
import Radio from "@material-ui/core/Radio";
import { withStyles } from "@material-ui/styles";

import { useStyles } from "./styles";
import CallPriceInput from "./CallPriceInput";

const ChannelSelectionBox = ({
  classes,
  checked,
  value,
  title,
  description,
  hasInput,
  disabled,
  onClick,
  inputProps,
  ...restProps
}) => {
  return (
    <Grid
      container
      spacing={24}
      className={`${classes.ChannelSelectionBoxContainer}
       ${disabled && classes.disabledChannelBox} 
       ${checked && classes.selectedChannelBox}`}
      value={value}
      onClick={onClick}
    >
      <Grid item xs={4} sm={4} md={4} lg={4} className={classes.LeftSideSection}>
        <div className={classes.RadioButtonContainer}>
          <Radio checked={checked} color="primary" name="radio-button" disabled={disabled} {...restProps} />
        </div>
        <div className={`${classes.InputDataContainer} ${disabled && classes.disabledInputDataContainer}`}>
          <h2>{title}</h2>
          <CallPriceInput classes={classes} disabled={disabled} inputProps={inputProps} />
        </div>
      </Grid>
      <Grid
        item
        xs={8}
        sm={8}
        md={8}
        lg={8}
        className={`${classes.selectionBoxDescription} ${disabled && classes.disabledSelectionBoxDescription}`}
      >
        <p>{description}.</p>
      </Grid>
    </Grid>
  );
};

export default withStyles(useStyles)(ChannelSelectionBox);
