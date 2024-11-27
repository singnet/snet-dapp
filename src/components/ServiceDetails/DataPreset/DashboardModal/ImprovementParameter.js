import { Checkbox, FormControlLabel } from "@mui/material";
import { withStyles } from "@mui/styles";
import { useStyles } from "./styles";

const ImprovementParameter = ({ classes, parameter }) => {
  return (
    <div className={classes.parameterContainer}>
      <div className={classes.parameterInfo}>
        <FormControlLabel className={classes.checkbox} control={<Checkbox />} label={parameter.displayed_name} />
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

export default withStyles(useStyles)(ImprovementParameter);
