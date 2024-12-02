import React, { useEffect } from "react";
import Card from "../../common/Card";
import DatasetUploader from "./DatasetUploader";
import MergeIcon from "@mui/icons-material/CallMerge";

import { withStyles } from "@mui/styles";
import { useStyles } from "./styles";
import AddIcon from "@mui/icons-material/Add";
import StyledButton from "../../common/StyledButton";
import clsx from "clsx";
import { isEmpty } from "lodash";
import { useLocation, useNavigate } from "react-router-dom";
import { setCurrentModelDetails } from "../../../Redux/actionCreators/ServiceTrainingActions";
import { useDispatch, useSelector } from "react-redux";
import {
  addRecentDataset,
  getDatasetStatistic,
  setMainDataset,
  setMergeDataset,
  updateRecentDataset,
  validateMergeDatasets,
} from "../../../Redux/actionCreators/DatasetActions";
import { loaderActions } from "../../../Redux/actionCreators";
import { LoaderContent } from "../../../utility/constants/LoaderContent";
import { startAppLoader, stopAppLoader } from "../../../Redux/actionCreators/LoaderActions";

const DataPreset = ({ classes }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const mainDataset = useSelector((state) => state.datasetReducer.mainDataset);
  const mergeDataset = useSelector((state) => state.datasetReducer.mergeDataset);
  const recentDatasets = useSelector((state) => state.datasetReducer.recentDatasets);

  useEffect(() => {
    !!mainDataset && !mainDataset?.additionalInfo && getStatistic(mainDataset?.datasetKey, setMainDataset);
  }, [mainDataset]);

  useEffect(() => {
    !!mergeDataset && !mergeDataset?.additionalInfo && getStatistic(mergeDataset?.datasetKey, setMergeDataset);
  }, [mergeDataset]);

  const getStatistic = async (datasetKey, setDataset) => {
    try {
      dispatch(loaderActions.startAppLoader(LoaderContent.GET_DATASET_STATISTIC));
      const { data } = await dispatch(getDatasetStatistic(datasetKey));
      const enrichedDataset = { ...mainDataset, additionalInfo: data };
      const actualDatasetIndexInRecent = recentDatasets.find(el => el.datasetKey === datasetKey);
      if (!actualDatasetIndexInRecent) {
        await dispatch(addRecentDataset(enrichedDataset));
      } else {
        await dispatch(updateRecentDataset(datasetKey, data));
      }
      await dispatch(setDataset(enrichedDataset));
    } catch (error) {
      console.error("getStatistic error", error);
      dispatch(setDataset(null));
    } finally {
      dispatch(loaderActions.stopAppLoader());
    }
  };

  const cleanMainDataset = () => {
    dispatch(setMainDataset(mergeDataset));
    dispatch(setMergeDataset(null));
  };

  const cleanMergeDataset = () => {
    dispatch(setMergeDataset(null));
  };

  const goToCreateModel = () => {
    dispatch(setCurrentModelDetails({ dataset: mainDataset }));
    navigate(location.pathname.split("tab/")[0] + "tab/" + 3, { state: { isOpenCreatingModel: true } });
  };

  const setMainDatasetFunction = (data) => dispatch(setMainDataset(data));
  const setMergeDatasetFunction = (data) => dispatch(setMergeDataset(data));

  const onMergeDatasets = async () => {
    try {
      dispatch(startAppLoader(LoaderContent.MERGE_DATASETS));
      const mergedDatasets = await dispatch(validateMergeDatasets(mainDataset?.datasetKey, mergeDataset?.datasetKey));
      const mergedDataset = {
        additionalInfo: mergedDatasets,
        datasetKey: mergedDatasets.dataset_key_merged,
        name: "merged_" + mainDataset?.name + "_" + mergeDataset?.name,
        size: mainDataset?.size + mergeDataset?.size,
        tag:  mainDataset?.tag,
      }
      await dispatch(addRecentDataset(mergedDataset));
      await dispatch(setMainDataset(mergedDataset));
      await dispatch(setMergeDataset(null));
    } catch (error) {
      console.log("error onMergeDatasets:", error);
    } finally {
      dispatch(stopAppLoader());
    }
  };

  const DataPresetContainer = () => {
    return (
      <div className={classes.dataPresetContainer}>
        <h2>Upload Your Dataset</h2>
        <div className={clsx(classes.datasetUploaderContainer, mergeDataset && classes.verticalCentered)}>
          <div className={classes.fileZone}>
            <DatasetUploader
              datasetInfo={mainDataset}
              setDatasetInfo={setMainDatasetFunction}
              cleanDatasetInfo={cleanMainDataset}
              index={0}
            />
          </div>
          {mergeDataset && (
            <div className={classes.mergeButtonContainer}>
              <StyledButton
                btnText={
                  <div className={classes.mergeButton}>
                    Merge
                    <MergeIcon />
                  </div>
                }
                onClick={onMergeDatasets}
              />
            </div>
          )}
          <div className={classes.fileZone}>
            {mainDataset ? (
              <DatasetUploader
                datasetInfo={mergeDataset}
                setDatasetInfo={setMergeDatasetFunction}
                cleanDatasetInfo={cleanMergeDataset}
                index={0}
              />
            ) : (
              <div className={classes.emptyFirstDataset}>
                <AddIcon />
                <p>Add one more file for merge this</p>
              </div>
            )}
          </div>
        </div>
        <div className={classes.fineTuneBatton}>
          <StyledButton disabled={isEmpty(mainDataset)} btnText="Fine-Tune" onClick={goToCreateModel} />
        </div>
      </div>
    );
  };

  return <Card header="Data Preset" children={<DataPresetContainer />} />;
};

export default withStyles(useStyles)(DataPreset);
