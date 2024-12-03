import { useState } from "react";
import { Checkbox, FormControlLabel } from "@mui/material";
import { withStyles } from "@mui/styles";
import { useStyles } from "./styles";
import clsx from "clsx";

const ImprovementParameters = ({ classes, parameters, setSelectedParameters }) => {
  const [paramsForImprove, setParamsForImprove] = useState(new Map());

  const selectForImprove = (parameterName) => {
    let params = new Map(paramsForImprove);

    if (paramsForImprove.has(parameterName)) {
      params.delete(parameterName);
    } else {
      params.set(parameterName, true);
    }
    setParamsForImprove(params);
    setSelectedParameters(params);
  };

  const ImprovementParameter = ({ parameter }) => {
    return (
      <div className={clsx(classes.parameterContainer, classes[parameter.group_score_label])}>
        <div className={classes.parameterInfo}>
          <FormControlLabel
            className={classes.checkbox}
            control={
              <Checkbox
                checked={paramsForImprove.has(parameter.key_name)}
                onChange={() => selectForImprove(parameter.key_name)}
              />
            }
            label={parameter.displayed_name}
          />
          <div className={classes.listOfImprovementsContainer}>
            <div key={parameter.cases_count} className={classes.improvementRaw}>
              <span className={classes.improvementValue}>{parameter.cases_count}</span>
              <div className={classes.issuesText}>Issues detected</div>
            </div>
          </div>
        </div>
        <div className={classes.status}>{parameter.group_score_label}</div>
      </div>
    );
  };

  return (
    <div className={classes.parametersContainer}>
      <h2>Quality check of the dataset</h2>
      <div className={classes.parameters}>
        {parameters.map((parameter) => (
          <ImprovementParameter key={parameter.key_name} parameter={parameter} />
        ))}
      </div>
    </div>
  );
};

export default withStyles(useStyles)(ImprovementParameters);
