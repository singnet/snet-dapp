import React from "react";
import { withStyles } from "@mui/styles";
import CloseIcon from "@mui/icons-material/Close";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import AnnoucementIcon from "../../../assets/images/AnnoucementIcon.png";

import { useStyles } from "./styles";

const UpdateNotificationBar = ({ classes, showNotification, onCloseClick }) => {
  if (!showNotification) return null;
  return (
    <div className={classes.updateNotificationBar}>
      <img src={AnnoucementIcon} alt="Announcment" />
      <p>
        <span>
          SingularityNET Phase II has officially launched!!! Check your brand new AGIX balance on your wallets or use
          our
        </span>
        <a
          href="https://snapshot.singularitynet.io/"
          title="SingularityNET Snapshot Tool"
          target="_blank"
          rel="noopener noreferrer"
        >
          snapshot tool.
          <ArrowForwardIosIcon />
        </a>
      </p>
      <CloseIcon className={classes.closeIcon} onClick={onCloseClick} />
    </div>
  );
};

export default withStyles(useStyles)(UpdateNotificationBar);
