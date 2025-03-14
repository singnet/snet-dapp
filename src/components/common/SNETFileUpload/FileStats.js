import React from "react";
import Typography from "@mui/material/Typography";
import FolderIcon from "@mui/icons-material/Folder";
import PropTypes from "prop-types";

import { useStyles } from "./styles";
import { fileSizeConverter } from "../../../utility/JSHelper";

const FileStats = (props) => {
  const { uploadSuccess, show, fileName, fileSize, error } = props;
  const classes = useStyles();

  if (!show) {
    return null;
  }

  return (
    <div className={classes.uploadDetails}>
      <div className={uploadSuccess ? classes.successfullUpload : classes.uploadStatusContainer}>
        <div className={error ? classes.errorField : classes.uploadStatusContainer}>
          <FolderIcon />
          <Typography className={uploadSuccess ? classes.uploaded : classes.uploadStatus}>
            {uploadSuccess ? "Files Uploaded Successfully" : "No/Wrong Files Uploaded"}
          </Typography>
        </div>
      </div>
      <div className={classes.statRow}>
        <Typography className={classes.title}>File Name:</Typography>
        <Typography className={classes.value}>{fileName}</Typography>
      </div>
      <div className={classes.statRow}>
        <Typography className={classes.title}>Size:</Typography>
        <Typography className={classes.value}>{fileSizeConverter(fileSize)}</Typography>
      </div>
    </div>
  );
};

FileStats.prototypes = {
  show: PropTypes.bool,
  uploadSuccess: PropTypes.func,
  fileName: PropTypes.func,
  fileSize: PropTypes.number,
  fileDownloadURL: PropTypes.string,
};

export default FileStats;
