import SNETDialog from "../../../common/SNETDialog";
import ImprovementParameter from "./ImprovementParameter";

import { withStyles } from "@mui/styles";
import { useStyles } from "./styles";
import StyledButton from "../../../common/StyledButton";
import Graphs from "./Graphs";

const analizeAnswer = {
  overall_score: 8,
  overall_score_range: [0, 10],
  cases_count: 537,
  cases_fraction: 0.537,
  total_samples: 1000,
  feature_groups: [
    {
      displayed_name: "Text Noise",
      key_name: "text_noise",
      group_score: 7,
      group_score_range: [0, 10],
      cases_count: 150,
      cases_fraction: 0.15,
    },
    {
      displayed_name: "Punctuation Issues",
      key_name: "punctuation_issues",
      group_score: 9,
      group_score_range: [0, 10],
      cases_count: 255,
      cases_fraction: 0.255,
    },
    {
      displayed_name: "Capitalization Issues",
      key_name: "capitalization_issues",
      group_score: 6,
      group_score_range: [0, 10],
      cases_count: 125,
      cases_fraction: 0.125,
    },
    {
      displayed_name: "Statistical Outliers",
      key_name: "statistical_outliers",
      group_score: 8,
      group_score_range: [0, 10],
      cases_count: 45,
      cases_fraction: 0.045,
    },
    {
      displayed_name: "Language Consistency",
      key_name: "language_consistency",
      group_score: 7,
      group_score_range: [0, 10],
      cases_count: 60,
      cases_fraction: 0.06,
    },
  ],
  graphs: [
    {
      key_name: "text_length_distribution",
      displayed_name: "Text Length Distribution",
      type: "histogram",
      data: [
        { bin: "0-10", count: 150 },
        { bin: "11-20", count: 300 },
        { bin: "21-30", count: 450 },
        { bin: "31-40", count: 200 },
        { bin: "41-50", count: 100 },
        { bin: "51+", count: 50 },
      ],
    },
    {
      key_name: "language_distribution",
      displayed_name: "Language Distribution",
      type: "pie",
      data: [
        { label: "English", value: 70 },
        { label: "Spanish", value: 15 },
        { label: "French", value: 10 },
        { label: "Other", value: 5 },
      ],
    },
    {
      key_name: "word_frequency",
      displayed_name: "Most Frequent Words",
      type: "word_cloud",
      data: [
        { word: "data", frequency: 120 },
        { word: "text", frequency: 1100 },
        { word: "analysis", frequency: 900 },
        { word: "error", frequency: 850 },
        { word: "model", frequency: 800 },
      ],
    },
  ],
};

const DashboardModal = ({ classes, onClose, isShow }) => {
  return (
    <SNETDialog isDialogOpen={isShow} onDialogClose={onClose} showCloseButton={false}>
      <div className={classes.dasbordModalContainer}>
        <h2>Quality check of the dataset</h2>
        <div className={classes.parameters}>
          {analizeAnswer.feature_groups.map((parameter) => (
            <ImprovementParameter key={parameter.key_name} parameter={parameter} />
          ))}
        </div>
        <div className={classes.improveButtonContainer}>
          <StyledButton type="gradientAccent" btnText="IMPROVE" />
        </div>
      </div>
      <h2>Quality of the dataset</h2>
      <div className={classes.graphs}>
        {analizeAnswer.graphs.map((graph) => (
          <Graphs key={graph.key_name} name={graph.displayed_name} type={graph.type} data={graph.data} />
        ))}
      </div>
    </SNETDialog>
  );
};

export default withStyles(useStyles)(DashboardModal);
