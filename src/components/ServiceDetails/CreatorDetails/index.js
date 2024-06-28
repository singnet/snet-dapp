import React, { useState } from "react";
import { withStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import Avatar from "@material-ui/core/Avatar";

import SingularityLogo from "../../../assets/images/avatar.png";
import { useStyles } from "./styles";
import Contacts from "./Contacts";

const CreatorDetails = ({ classes, organizationName, orgImg, contacts }) => {
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
      <Contacts contacts={contacts} show={showContacts} handleClose={() => setShowContacts(false)} />
    </div>
  );
};

CreatorDetails.propTypes = {
  orgImg: PropTypes.string,
  organizationName: PropTypes.string,
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      phone: PropTypes.string,
      email_id: PropTypes.string,
      contact_type: PropTypes.string,
    })
  ),
};

export default withStyles(useStyles)(CreatorDetails);
