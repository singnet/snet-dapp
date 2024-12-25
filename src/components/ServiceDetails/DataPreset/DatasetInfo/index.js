import { withStyles } from "@mui/styles";
import { useStyles } from "./styles";
import HelpOutline from "@mui/icons-material/HelpOutline";
// import InlineLoader from "../../../common/InlineLoader";
import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

const DatasetInfo = ({ classes, datasetParameters }) => {
  const DatasetRateInfo = ({ additionalInfo }) => {
    return (
      <span className={classes.additionalInfoContainer}>
        {additionalInfo.map((additionalField) => (
          <div className={classes.additionalFieldRaw} key={additionalField.title}>
            <span className={classes.additionalFieldValue}>{additionalField.value}</span>
            {additionalField.title}
          </div>
        ))}
      </span>
    );
  };
  return (
    <div className={classes.datasetInfoContainer}>
      <p>Dataset info</p>
      <div className={classes.parametersContainer}>
        {datasetParameters.map((datasetParameter) => (
          <div key={datasetParameter.value} className={classes.datasetParameter}>
            <div className={classes.parameterTitleContainer}>
              <p className={classes.parameterTitle}>{datasetParameter.title}</p>
              {datasetParameter?.additionalInfo && (
                <>
                  <HelpOutline />
                  <DatasetRateInfo additionalInfo={datasetParameter.additionalInfo} />
                </>
              )}
            </div>
            {!datasetParameter?.value ? (
              <CircularProgress />
            ) : (
              <p className={classes.parameterValue}>{datasetParameter.value}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default withStyles(useStyles)(DatasetInfo);
