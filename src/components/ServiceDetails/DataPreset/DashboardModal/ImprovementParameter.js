import { Checkbox, FormControlLabel } from "@mui/material";
import { withStyles } from "@mui/styles";
import { useStyles } from "./styles";

const ImprovementParameter = ({ classes, parameter }) => {
  return (
    <div className={classes.parameterContainer}>
      <div className={classes.parameterInfo}>
        <FormControlLabel className={classes.checkbox} control={<Checkbox />} label={parameter.title} />
        <div className={classes.listOfImprovementsContainer}>
          {parameter.listOfImprovements.map((improvement) => (
            <div key={improvement.label} className={classes.improvementRaw}>
              <span className={classes.improvementValue}>{improvement.value}</span>
              {improvement.label}
            </div>
          ))}
        </div>
      </div>
      <div className={classes.status}>{parameter.status}</div>
    </div>
  );
};

export default withStyles(useStyles)(ImprovementParameter);
