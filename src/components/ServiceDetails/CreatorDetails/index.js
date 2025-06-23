import React, { useState } from "react";
import { withStyles } from "@mui/styles";
import PropTypes from "prop-types";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import Avatar from "@mui/material/Avatar";

import SingularityLogo from "../../../assets/images/avatar.png";
import { useStyles } from "./styles";
import Contacts from "./Contacts";
import { useSelector } from "react-redux";

const CreatorDetails = ({ classes }) => {
  const [showContacts, setShowContacts] = useState(false);
  const { organization_name: organizationName, org_assets_url } = useSelector(
    (state) => state.serviceDetailsReducer.details
  );
  const orgImg = org_assets_url?.hero_image;

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
  classes: PropTypes.object.isRequired,
};

export default withStyles(useStyles)(CreatorDetails);
