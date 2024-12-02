import { withStyles } from "@mui/styles";
import { useStyles } from "./styles";
import StyledButton from "../../../common/StyledButton";
import TableIcon from "@mui/icons-material/TableChartOutlined";

const ButtonsGroup = ({ classes, selectedParameters, isTableView, toggleTableView, dataset }) => {
  const tableButtonText = isTableView ? "close tablet" : "view tablet";

  const isImproveButtonDisable = !selectedParameters?.size;

  console.log("ButtonsGroup dataset", dataset);

  const improveDataset = () => {
    console.log("improveDataset by params: ", selectedParameters);
  };

  return (
    <div className={classes.buttonsContainer}>
      <StyledButton
        type="transparentBlueBorder"
        btnText={tableButtonText}
        IconComponent={TableIcon}
        onClick={toggleTableView}
      />
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
