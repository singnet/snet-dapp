import React from "react";
import Grid from "@mui/material/Grid";
import Radio from "@mui/material/Radio";
import { withStyles } from "@mui/styles";

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
      className={`${classes.ChannelSelectionBoxContainer}
       ${disabled && classes.disabledChannelBox} 
       ${checked && classes.selectedChannelBox}`}
      value={value}
      onClick={onClick}
    >
      <Grid item xs={4} sm={4} md={4} lg={4} className={classes.LeftSideSection}>
        <Grid item lg={2} className={classes.RadioButtonContainer}>
          <Radio checked={checked} color="primary" name="radio-button" disabled={disabled} {...restProps} />
        </Grid>
        <Grid
          item
          lg={10}
          className={`${classes.InputDataContainer} ${disabled && classes.disabledInputDataContainer}`}
        >
          <h2>{title}</h2>
          <CallPriceInput classes={classes} disabled={disabled} inputProps={inputProps} />
        </Grid>
      </Grid>
      <Grid
        item
        xs={8}
        sm={8}
        md={8}
        lg={8}
        className={`${classes.selectionBoxDescription} ${disabled && classes.disabledSelectionBoxDescription}`}
      >
        <p>{description}</p>
      </Grid>
    </Grid>
  );
};

export default withStyles(useStyles)(ChannelSelectionBox);
