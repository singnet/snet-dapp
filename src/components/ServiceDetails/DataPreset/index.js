import React, { useState } from "react";
import Card from "../../common/Card";
import DatasetUploader from "./DatasetUploader";
import MergeIcon from "@mui/icons-material/CallMerge";

import { withStyles } from "@mui/styles";
import { useStyles } from "./styles";
import AddIcon from "@mui/icons-material/Add";
import StyledButton from "../../common/StyledButton";
import clsx from "clsx";
import { isEmpty } from "lodash";

const DataPreset = ({ classes }) => {
  const [datasetInfo, setDatasetInfo] = useState();
  const [datasetForMergeInfo, setDatasetForMergeInfo] = useState();

  const cleanMainDataset = () => {
    setDatasetInfo(datasetForMergeInfo);
    setDatasetForMergeInfo();
  };

  const DataPresetContainer = () => {
    return (
      <div className={classes.dataPresetContainer}>
        <h2>Upload Your Dataset</h2>
        <div className={clsx(classes.datasetUploaderContainer, datasetForMergeInfo && classes.verticalCentered)}>
          <div className={classes.fileZone}>
            <DatasetUploader
              datasetInfo={datasetInfo}
              setDatasetInfo={setDatasetInfo}
              cleanDatasetInfo={cleanMainDataset}
            />
          </div>
          {datasetForMergeInfo && (
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
            {datasetInfo ? (
              <DatasetUploader
                datasetInfo={datasetForMergeInfo}
                setDatasetInfo={setDatasetForMergeInfo}
                cleanDatasetInfo={() => setDatasetForMergeInfo()}
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
          <StyledButton disabled={isEmpty(datasetInfo)} btnText="Fine-Tune" />
        </div>
      </div>
    );
  };

  return <Card header="Data Preset" children={<DataPresetContainer />} />;
};

export default withStyles(useStyles)(DataPreset);
