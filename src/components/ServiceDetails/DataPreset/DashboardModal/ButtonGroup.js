import { withStyles } from "@mui/styles";
import { useStyles } from "./styles";
import StyledButton from "../../../common/StyledButton";

const ButtonsGroup = ({ classes, selectedParameters, isTableView, toggleTableView }) => {
  const tableButtonText = isTableView ? "close tablet" : "view tablet";

  console.log("selectedParameters: ", selectedParameters);

  const isImproveButtonDisable = !selectedParameters?.size;
  console.log("isImproveButtonDisable: ", isImproveButtonDisable);

  const improveDataset = () => {
    console.log("improveDataset by params: ", selectedParameters);
  };

  return (
    <div className={classes.buttonsContainer}>
      <StyledButton type="transparentBlueBorder" btnText={tableButtonText} onClick={toggleTableView} />
      <StyledButton
        disabled={isImproveButtonDisable}
        type="gradientAccent"
        btnText="IMPROVE"
        onClick={improveDataset}
      />
    </div>
  );
};

export default withStyles(useStyles)(ButtonsGroup);
