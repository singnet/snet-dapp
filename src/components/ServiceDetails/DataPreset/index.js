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
import { getDatasetStatistic, setMainDataset, setMergeDataset } from "../../../Redux/actionCreators/DatasetActions";

const DataPreset = ({ classes }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const mainDataset = useSelector((state) => state.datasetReducer.mainDataset);
  const mergeDataset = useSelector((state) => state.datasetReducer.forgotPasswordSubmit);
  console.log("DataPreset mainDataset", mainDataset);
  console.log("DataPreset mergeDataset", mergeDataset);

  //TODO remove
  // const downloadDatasetFromS3 = async (url) => {
  //   console.log("downloadDatasetFromS3");
  //   try {
  //     let instance = axios.create({
  //       headers: {
  //         Authorization: "S1kDjcub9k78JFAyrLPsfS0yQoQ4mgmmpeWKlIoVvYsk6JVq5v4HHKvKQgZ0VdI7",
  //       },
  //     });
  //     console.log("downloadDatasetFromS3 instance", instance);
  //     const response = await instance.get(url);
  //     console.log("downloadDatasetFromS3 response", response);
  //   } catch (err) {
  //     throw new Error(err);
  //   }
  // };

  useEffect(() => {
    console.log("mainDataset UPDATED", mainDataset);
    mainDataset && !mainDataset?.additionalInfo && getStatistic(mainDataset?.datasetKey);
  }, [mainDataset]);
  const getStatistic = async (datasetKey) =>  {
    try{
      const { data } = await dispatch(getDatasetStatistic(datasetKey));
      console.log('data', data);
      await dispatch(setMainDataset({ ...mainDataset, additionalInfo: data }));
    } catch (error) {
      console.error("getStatistic error", error);
    }
  }

  const cleanMainDataset = async () => {
    dispatch(setMainDataset(mergeDataset));
    dispatch(setMergeDataset(null));
  };

  const goToCreateModel = () => {
    dispatch(setCurrentModelDetails({ dataset: mainDataset }));
    navigate(location.pathname.split("tab/")[0] + "tab/" + 3, { state: { isOpenCreatingModel: true } });
  };

  const setMainDatasetFunction = (data) => dispatch(setMainDataset(data));
  const setMergeDatasetFunction = (data) => dispatch(setMergeDataset(data));

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
              />
            </div>
          )}
          <div className={classes.fileZone}>
            {mainDataset ? (
              <DatasetUploader
                datasetInfo={mergeDataset}
                setDatasetInfo={setMergeDatasetFunction}
                cleanDatasetInfo={() => dispatch(setMergeDataset(null))}
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
