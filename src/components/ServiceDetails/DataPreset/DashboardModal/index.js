import SNETDialog from "../../../common/SNETDialog";
import ImprovementParameter from "./ImprovementParameter";

import { withStyles } from "@mui/styles";
import { useStyles } from "./styles";
import StyledButton from "../../../common/StyledButton";

const parameters = [
  {
    title: "Outlier filtering",
    status: "Good",
    listOfImprovements: [
      { value: "55", label: "Too short/long lines 1" },
      { value: "55", label: "Too short/long lines 2" },
      { value: "55", label: "Too short/long lines 3" },
    ],
  },
  {
    title: "Outlier filtering 2",
    status: "Good",
    listOfImprovements: [
      { value: "55", label: "Too short/long lines 1" },
      { value: "55", label: "Too short/long lines 2" },
      { value: "55", label: "Too short/long lines 3" },
    ],
  },
  {
    title: "Outlier filtering 3",
    status: "Good",
    listOfImprovements: [
      { value: "55", label: "Too short/long lines 1" },
      { value: "55", label: "Too short/long lines 2" },
      { value: "55", label: "Too short/long lines 3" },
    ],
  },
  {
    title: "Outlier filtering 4",
    status: "Good",
    listOfImprovements: [
      { value: "55", label: "Too short/long lines 1" },
      { value: "55", label: "Too short/long lines 2" },
      { value: "55", label: "Too short/long lines 3" },
    ],
  },
  {
    title: "Outlier filtering 3",
    status: "Good",
    listOfImprovements: [
      { value: "55", label: "Too short/long lines 1" },
      { value: "55", label: "Too short/long lines 2" },
      { value: "55", label: "Too short/long lines 3" },
    ],
  },
  {
    title: "Normalising punctuation",
    status: "Good",
    listOfImprovements: [
      { value: "55", label: "Too short/long lines 1" },
      { value: "55", label: "Too short/long lines 2" },
      { value: "55", label: "Too short/long lines 3" },
      { value: "55", label: "Too short/long lines 4" },
    ],
  },
];

const DashboardModal = ({ classes, onClose, isShow }) => {
  return (
    <SNETDialog isDialogOpen={isShow} onDialogClose={onClose} showCloseButton={false}>
      <div className={classes.dasbordModalContainer}>
        <h2>Quality check of the dataset</h2>
        <div className={classes.parameters}>
          {parameters.map((parameter) => (
            <ImprovementParameter key={parameter.title} parameter={parameter} />
          ))}
        </div>
        <div className={classes.improveButtonContainer}>
          <StyledButton type="gradientAccent" btnText="IMPROVE" />
        </div>
      </div>
    </SNETDialog>
  );
};

export default withStyles(useStyles)(DashboardModal);
