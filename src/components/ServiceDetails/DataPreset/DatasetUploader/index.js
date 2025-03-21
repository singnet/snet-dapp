import { useState } from "react";
import { withStyles } from "@mui/styles";
import { useStyles } from "./styles";
import { publishDatasetForImproving } from "../../../../Redux/actionCreators/ServiceTrainingActions";
import SNETFileUpload from "../../../common/SNETFileUpload";
import { isEmpty } from "lodash";
import { Typography } from "@mui/material";
import DatasetInfo from "../DatasetInfo";
import StyledButton from "../../../common/StyledButton";
import DashboardModal from "../DashboardModal";
import DatasetTabs from "../DatasetTabs";
import { useDispatch } from "react-redux";
import { fileSizeConverter } from "../../../../utility/JSHelper";
import { LoaderContent } from "../../../../utility/constants/LoaderContent";
import { loaderActions } from "../../../../Redux/actionCreators";

const acceptedFileTypes = { "application/zip": [".zip"], "application/x-zip-compressed": [".zip"] };

const DatasetUploader = ({ classes, setDatasetInfo, datasetInfo, cleanDatasetInfo, isMainDataset }) => {
  const dispatch = useDispatch();

  const [trainingDataFileName, setTrainingDataFileName] = useState(datasetInfo?.name);
  const [trainingDataFileSize, setTrainingDataFileSize] = useState(datasetInfo?.size);
  const [isDashbordOpen, setIsDashbordOpen] = useState(false);

  const handleDrop = async (acceptedFiles, rejectedFiles) => {
    if (!isEmpty(rejectedFiles)) {
      return;
    }
    if (!isEmpty(acceptedFiles)) {
      try {
        dispatch(loaderActions.startAppLoader(LoaderContent.SET_DATASET));
        const fileBlob = acceptedFiles[0];
        const { name, size } = fileBlob;

        setTrainingDataFileName(name);
        setTrainingDataFileSize(size);
        const { url, datasetKey } = await dispatch(publishDatasetForImproving(fileBlob, name));
        setDatasetInfo({ link: url, name, size, datasetKey });
      } catch (error) {
        console.log("error: ", error);

        // setAlert({ type: alertTypes.ERROR, message: error.message });
      } finally {
        dispatch(loaderActions.stopAppLoader());
      }
    }
  };

  const Helpertext = () => {
    return (
      isEmpty(datasetInfo) && (
        <>
          <Typography>Package must be under 50mb</Typography>
          <Typography>Make sure the extension is .zip</Typography>
        </>
      )
    );
  };

  const openDashbordModal = () => {
    setIsDashbordOpen(true);
  };

  const closeDashbordModal = () => {
    setIsDashbordOpen(false);
  };

  const cleanCurrentDataset = () => {
    cleanDatasetInfo();
    setTrainingDataFileName(null);
    setTrainingDataFileSize(null);
  };

  const datasetParameters = !datasetInfo
    ? null
    : [
        { title: "Size", value: fileSizeConverter(datasetInfo?.size) },
        { title: "Format", value: "CSV" },
        {
          title: "Rate",
          value: !datasetInfo?.additionalInfo
            ? null
            : datasetInfo?.additionalInfo?.analysis?.overall_score +
              "/" +
              datasetInfo?.additionalInfo?.analysis?.overall_score_range[1],
          additionalInfo: datasetInfo?.additionalInfo?.analysis?.feature_groups.map((element) => {
            return { value: element.cases_count, title: element.displayed_name };
          }),
        },
      ];

  return (
    <div className={classes.datasetUploader}>
      <div className={classes.uploaderContainer}>
        <p>Drag & Drop or Select File</p>
        <SNETFileUpload
          onDrop={handleDrop}
          accept={acceptedFileTypes}
          multiple={false}
          showFileDetails
          helperText={<Helpertext />}
          fileName={trainingDataFileName}
          fileSize={trainingDataFileSize}
          uploadSuccess={Boolean(trainingDataFileName || datasetInfo)}
          cleanCurrentFile={cleanCurrentDataset}
          isFileStatsDisplay={false}
        />
      </div>
      {isEmpty(datasetInfo) ? (
        <DatasetTabs setDatasetInfo={setDatasetInfo} />
      ) : (
        <>
          <DatasetInfo datasetParameters={datasetParameters} />
          <StyledButton
            type="gradient"
            btnText="Improvment options"
            disabled={!datasetInfo?.additionalInfo}
            onClick={openDashbordModal}
          />
        </>
      )}
      {isDashbordOpen && (
        <DashboardModal
          onClose={closeDashbordModal}
          isShow={isDashbordOpen}
          dataset={datasetInfo}
          setDatasetInfo={setDatasetInfo}
        />
      )}
    </div>
  );
};

export default withStyles(useStyles)(DatasetUploader);
