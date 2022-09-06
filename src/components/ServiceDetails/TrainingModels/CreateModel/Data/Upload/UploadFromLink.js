import React, { Fragment } from "react";
import { withStyles } from "@material-ui/styles";
import SubdirectoryArrowLeftIcon from '@material-ui/icons/SubdirectoryArrowLeft';
import { useStyles } from "./styles";

const UploadFromLink = ({ classes }) => {
  return (
    <div className={classes.uploadFromLinkContainer}>
      <div>
        <StyledInputBase placeholder="URL: http://www.url.com/file" inputProps={{ "aria-label": "search" }} />
        <SubdirectoryArrowLeftIcon />
      </div>
      <p>Link should only include sample data file, other files will be rejected automatically.</p>
    </div>
  );
};

export default withStyles(useStyles)(UploadFromLink);
