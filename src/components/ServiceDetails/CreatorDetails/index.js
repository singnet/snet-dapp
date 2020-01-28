import React, { useState, Fragment } from "react";
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
    <Fragment>
      <div className={classes.creatorDetailsContainer}>
        <h3>Provider</h3>
        <div className={classes.content}>
          <div className={classes.companyInfo}>
            <Avatar alt="Singularity" src={orgImg || SingularityLogo} className={classes.avatar} />
            <div className={classes.companyName}>
              <h4>{organizationName}</h4>
            </div>
          </div>
        </div>
        <div className={classes.footer}>
          <span onClick={() => setShowContacts(true)}>
            <ChatBubbleOutlineIcon fontSize="small" /> Contact
          </span>
        </div>
      </div>
      <Contacts contacts={contacts} show={showContacts} handleClose={() => setShowContacts(false)} />
    </Fragment>
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
