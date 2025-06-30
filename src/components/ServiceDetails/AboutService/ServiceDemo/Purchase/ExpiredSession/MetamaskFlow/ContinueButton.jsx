import { memo } from "react";
import { withStyles } from "@mui/styles";
import { useStyles } from "./style";
import Tooltip from "@mui/material/Tooltip";
import PropTypes from "prop-types";
import StyledButton from "../../../../../../common/StyledButton";

const ContinueButton = ({classes, isServiceAvailable, isContinueEnabled, handleSubmit}) => {
    const tooltipText = "Service is currently offline. Please try after sometime";
    const showTooltip = !isServiceAvailable;
    const isDisabled = !isServiceAvailable || !isContinueEnabled;

    return (
      <Tooltip
            title={showTooltip ? tooltipText : ""}
            className={classes.tooltip}
            disableHoverListener={!showTooltip}
      >
        <div>
          <StyledButton
            type="blue"
            btnText="Continue"
            onClick={handleSubmit}
            disabled={isDisabled}
          />
        </div>
      </Tooltip>
    )
  }

  export default memo(withStyles(useStyles)(ContinueButton));

  ContinueButton.propTypes = {
    classes: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    isContinueEnabled: PropTypes.bool.isRequired,
    isServiceAvailable: PropTypes.bool.isRequired
  };