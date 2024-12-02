import SNETDialog from "../../../common/SNETDialog";
import { withStyles } from "@mui/styles";
import { useStyles } from "./styles";
// import Graphs from "./Graphs";
import ImprovementParameters from "./Parameters";
import TableSamples from "./Table";
import { createContext, useState } from "react";
import ButtonGroup from "./ButtonGroup";

// const analizeAnswer = {
//   overall_score: 8,
//   overall_score_range: [0, 10],
//   cases_count: 537,
//   cases_fraction: 0.537,
//   total_samples: 1000,
//   feature_groups: [
//     {
//       displayed_name: "Text Noise",
//       key_name: "text_noise",
//       group_score: 7,
//       group_score_range: [0, 10],
//       cases_count: 150,
//       cases_fraction: 0.15,
//       group_score_label: "High",
//     },
//     {
//       displayed_name: "Punctuation Issues",
//       key_name: "punctuation_issues",
//       group_score: 9,
//       group_score_range: [0, 10],
//       cases_count: 255,
//       cases_fraction: 0.255,
//       group_score_label: "Perfect",
//     },
//     {
//       displayed_name: "Capitalization Issues",
//       key_name: "capitalization_issues",
//       group_score: 6,
//       group_score_range: [0, 10],
//       cases_count: 125,
//       cases_fraction: 0.125,
//       group_score_label: "Middle",
//     },
//     {
//       displayed_name: "Statistical Outliers",
//       key_name: "statistical_outliers",
//       group_score: 8,
//       group_score_range: [0, 10],
//       cases_count: 45,
//       cases_fraction: 0.045,
//       group_score_label: "Perfect",
//     },
//     {
//       displayed_name: "Language Consistency",
//       key_name: "language_consistency",
//       group_score: 7,
//       group_score_range: [0, 10],
//       cases_count: 60,
//       cases_fraction: 0.06,
//       group_score_label: "Low",
//     },
//   ],
//   graphs: [
//     {
//       group_score_label: "text_length_distribution",
//       displayed_name: "Text Length Distribution",
//       type: "histogram",
//       data: [
//         { bin: "0-10", count: 150 },
//         { bin: "11-20", count: 300 },
//         { bin: "21-30", count: 450 },
//         { bin: "31-40", count: 200 },
//         { bin: "41-50", count: 100 },
//         { bin: "51+", count: 50 },
//       ],
//     },
//     {
//       key_name: "language_distribution",
//       displayed_name: "Language Distribution",
//       type: "pie",
//       data: [
//         { label: "English", value: 70 },
//         { label: "Spanish", value: 15 },
//         { label: "French", value: 10 },
//         { label: "Other", value: 5 },
//       ],
//     },
//     {
//       key_name: "word_frequencies",
//       displayed_name: "Word Frequencies",
//       type: "treemap",
//       data: [
//         {
//           name: "helpful",
//           size: 2004,
//         },
//         {
//           name: "answer",
//           size: 2004,
//         },
//         {
//           name: "safe",
//           size: 1014,
//         },
//         {
//           name: "know",
//           size: 1010,
//         },
//         {
//           name: "information",
//           size: 1010,
//         },
//         {
//           name: "false",
//           size: 1007,
//         },
//         {
//           name: "question",
//           size: 1005,
//         },
//         {
//           name: "possible",
//           size: 1004,
//         },
//         {
//           name: "instruction",
//           size: 1001,
//         },
//         {
//           name: "task",
//           size: 1001,
//         },
//         {
//           name: "describes",
//           size: 1000,
//         },
//         {
//           name: "respectful",
//           size: 1000,
//         },
//         {
//           name: "honest",
//           size: 1000,
//         },
//         {
//           name: "assistant",
//           size: 1000,
//         },
//         {
//           name: "share",
//           size: 1000,
//         },
//         {
//           name: "following",
//           size: 364,
//         },
//         {
//           name: "Classify",
//           size: 242,
//         },
//         {
//           name: "string",
//           size: 226,
//         },
//         {
//           name: "Identify",
//           size: 204,
//         },
//         {
//           name: "percussion",
//           size: 188,
//         },
//       ],
//     },
//   ],
//   datasaet_sample: [
//     [
//       "Which is a species of fish? Tope or Rope",
//       "Below is an instruction that describes a task.\nYou are a helpful, respectful and honest assistant. Always answer as helpful as possible, while being safe. If you don't know the answer to a question, please don't share false information",
//       "Tope",
//     ],
//     [
//       "Identify which instrument is string or percussion: Cantaro, Gudok",
//       "Below is an instruction that describes a task.\nYou are a helpful, respectful and honest assistant. Always answer as helpful as possible, while being safe. If you don't know the answer to a question, please don't share false information",
//       "Gudok is string, Cantaro is percussion.",
//     ],
//     [
//       "Which of the following is useful for transportation: a glass of wine, a lamp, a train, an iced cube tray, a plane, a bicycle, an apple and a scooter.",
//       "Below is an instruction that describes a task.\nYou are a helpful, respectful and honest assistant. Always answer as helpful as possible, while being safe. If you don't know the answer to a question, please don't share false information",
//       "The useful objects for transportation in the list are train, plane, bicyle and scooter.",
//     ],
//   ],
// };

export const DashboardActionsContext = createContext({});

const DashboardModal = ({ classes, onClose, isShow, dataset }) => {
  const [selectedParameters, setSelectedParameters] = useState();
  const [isTableView, setIsTableView] = useState(true);

  const toggleTableView = () => {
    setIsTableView(!isTableView);
  };

  console.log("dataset", dataset);

  return (
    <SNETDialog isDialogOpen={isShow} onDialogClose={onClose} showCloseButton={false}>
      <div className={classes.dasbordModalContainer}>
        <ImprovementParameters
          parameters={dataset?.additionalInfo?.analysis?.feature_groups}
          setSelectedParameters={setSelectedParameters}
        />
        <ButtonGroup
          dataset={dataset}
          selectedParameters={selectedParameters}
          isTableView={isTableView}
          toggleTableView={toggleTableView}
        />
        {isTableView && <TableSamples tableData={dataset?.additionalInfo?.datasaet_sample} />}
        {/*<Graphs graphs={dataset?.additionalInfo?.analysis.graphs} />*/}
      </div>
    </SNETDialog>
  );
};

export default withStyles(useStyles)(DashboardModal);
