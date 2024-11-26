import React, { useState } from "react";
import Card from "../../common/Card";
import { Grid } from "@mui/material";
import DatasetUploader from "./DatasetUploader";

import { withStyles } from "@mui/styles";
import { useStyles } from "./styles";

const DataPreset = ({ classes }) => {
  const [datasetLink, setDatasetLink] = useState();

  console.log("datasetLink: ", datasetLink);

  const DataPresetContainer = () => {
    return (
      <div className={classes.datasetUploaderContainer}>
        <h2>Upload Your Dataset</h2>
        <Grid container spacing={3}>
          <Grid item md={6} xs={12}>
            <DatasetUploader setDatasetLink={setDatasetLink} />
          </Grid>
          <Grid item md={6} xs={12}>
            <DatasetUploader />
          </Grid>
        </Grid>
      </div>
    );
  };

  return <Card header="Data Preset" children={<DataPresetContainer />} />;
};

export default withStyles(useStyles)(DataPreset);
