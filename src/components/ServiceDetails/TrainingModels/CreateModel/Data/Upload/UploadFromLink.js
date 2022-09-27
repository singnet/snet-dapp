import React, { Fragment, useState } from "react";
import { withStyles, styled } from "@material-ui/styles";
import InputBase from "@material-ui/core/InputBase";
import SubdirectoryArrowLeftIcon from "@material-ui/icons/SubdirectoryArrowLeft";
import { useStyles } from "./styles";

const Search = styled("div")(({ theme }) => ({
  padding: "9px 17px 9px 14px",
  border: "1px solid #C4C4C4",
  borderRadius: 4,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: theme.palette.text.white,
  //   [theme.breakpoints.up("sm")]: {
  //     marginLeft: theme.spacing(1),
  //     width: "auto",
  //   },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  color: theme.palette.text.primary,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  width: "100%",
  color: "#666",
  fontSize: 14,
}));

const UploadFromLink = ({ classes, trainingDataLink, setTrainingDataLink }) => {
  const handleTrainingDataLinkBox = event => {
    setTrainingDataLink(event.target.value);
  };

  return (
    <div className={classes.uploadFromLinkContainer}>
      <Search>
        <StyledInputBase
          placeholder="URL: http://www.url.com/file"
          inputProps={{ "aria-label": "search" }}
          trainingDataLink={trainingDataLink}
          onChange={handleTrainingDataLinkBox}
        />
        <SearchIconWrapper>
          <SubdirectoryArrowLeftIcon />
        </SearchIconWrapper>
      </Search>
      <p>Link should only include sample data file, other files will be rejected automatically.</p>
    </div>
  );
};

export default withStyles(useStyles)(UploadFromLink);
