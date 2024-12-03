import { withStyles } from "@mui/styles";
import { useStyles } from "./styles";
import StyledButton from "../../../common/StyledButton";
import TableIcon from "@mui/icons-material/TableChartOutlined";
import { useDispatch } from "react-redux";
import {
  addRecentDataset,
  improveDataset,
  setMainDataset,
  setMergeDataset,
} from "../../../../Redux/actionCreators/DatasetActions";
import { startAppLoader, stopAppLoader } from "../../../../Redux/actionCreators/LoaderActions";
import { LoaderContent } from "../../../../utility/constants/LoaderContent";
import { DatafactoryInstanceS3 } from "../../../../config/DatasetS3Client";
import { getDatasetSizeFromS3 } from "../../../../Redux/actionCreators/ServiceTrainingActions";

const ButtonsGroup = ({ classes, selectedParameters, isTableView, toggleTableView, dataset, index }) => {
  const dispatch = useDispatch();

  const tableButtonText = isTableView ? "close tablet" : "view tablet";

  const isImproveButtonDisable = !selectedParameters?.size;

  const getImprovedDataset = async () => {
    try {
      dispatch(startAppLoader(LoaderContent.IMPROVE_DATASET));
      const { data } = await dispatch(improveDataset(dataset.datasetKey, Array.from(selectedParameters.keys())));
      const size = await getDatasetSizeFromS3(data.dataset_key_new, DatafactoryInstanceS3);
      const improvedDataset = {
        additionalInfo: {
          analysis: data.analysis,
          datasaet_sample: data.dataset_sample,
        },
        datasetKey: data.dataset_key_new,
        name: dataset.name + "_improved_rate_" + data.analysis.overall_score,
        size,
        tag: dataset.tag,
      };
      await dispatch(addRecentDataset(improvedDataset));
      !index ? await dispatch(setMainDataset(improvedDataset)) : await dispatch(setMergeDataset(improvedDataset));
    } catch (error) {
      console.error("getImprovedDataset error", error);
    } finally {
      dispatch(stopAppLoader());
    }
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
        onClick={getImprovedDataset}
      />
    </div>
  );
};

export default withStyles(useStyles)(ButtonsGroup);
