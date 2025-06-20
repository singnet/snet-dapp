import React, { useState } from "react";
import { withStyles } from "@mui/styles";
import PropTypes from "prop-types";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import Avatar from "@mui/material/Avatar";

import SingularityLogo from "../../../assets/images/avatar.png";
import { useStyles } from "./styles";
import Contacts from "./Contacts";

const CreatorDetails = ({ classes, organizationName, orgImg }) => {
  const [showContacts, setShowContacts] = useState(false);

  return (
    <div className={classes.content}>
      <div className={classes.companyInfo}>
        <Avatar alt="Singularity" src={orgImg || SingularityLogo} className={classes.avatar} />
        <div className={classes.companyName}>
          <h3>{organizationName}</h3>
        </div>
      </div>

      <div className={classes.footer} onClick={() => setShowContacts(true)}>
        <span>
          <ChatBubbleOutlineIcon fontSize="small" /> Contact
        </span>
      </div>
      <Contacts show={showContacts} handleClose={() => setShowContacts(false)} />
    </div>
  );
};

CreatorDetails.propTypes = {
  orgImg: PropTypes.string,
  organizationName: PropTypes.string,
};

export default withStyles(useStyles)(CreatorDetails);
