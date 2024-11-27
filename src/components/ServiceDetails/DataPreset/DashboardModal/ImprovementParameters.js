import { useState } from "react";
import { Checkbox, FormControlLabel } from "@mui/material";
import { withStyles } from "@mui/styles";
import { useStyles } from "./styles";
import StyledButton from "../../../common/StyledButton";

const ImprovementParameters = ({ classes, parameters }) => {
  const [paramsForImprove, setParamsForImprove] = useState({});

  const isSelected = (parameterName) => {
    return Object.keys(paramsForImprove).includes(parameterName);
  };
  const selectForImprove = (parameterName) => {
    if (isSelected(parameterName)) {
      setParamsForImprove({ ...paramsForImprove, [parameterName]: false });
      return;
    }
    setParamsForImprove({ ...paramsForImprove, [parameterName]: true });
  };

  const ImprovementParameter = ({ parameter }) => {
    return (
      <div className={classes.parameterContainer}>
        <div className={classes.parameterInfo}>
          <FormControlLabel
            className={classes.checkbox}
            control={
              <Checkbox
                checked={isSelected(parameter.key_name)}
                onChange={() => selectForImprove(parameter.key_name)}
              />
            }
            label={parameter.displayed_name}
          />
          <div className={classes.listOfImprovementsContainer}>
            <div key={parameter.cases_count} className={classes.improvementRaw}>
              <span className={classes.improvementValue}>{parameter.cases_count}</span>
              Issues detected
            </div>
          </div>
        </div>
        <div className={classes.status}>{parameter.status}</div>
      </div>
    );
  };

  return (
    <div className={classes.dasbordModalContainer}>
      <div className={classes.parameters}>
        {parameters.map((parameter) => (
          <ImprovementParameter key={parameter.key_name} parameter={parameter} />
        ))}
      </div>
      <div className={classes.improveButtonContainer}>
        <StyledButton type="gradientAccent" btnText="IMPROVE" />
      </div>
    </div>
  );
};

export default withStyles(useStyles)(ImprovementParameters);
