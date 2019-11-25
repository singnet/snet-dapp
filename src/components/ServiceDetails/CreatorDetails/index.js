import React from "react";
import { withStyles } from "@material-ui/styles";
import PropTypes from "prop-types";

import SingularityLogo from "../../../assets/images/avatar.png";
import { useStyles } from "./styles";
import Contacts from "./Contacts";

const CreatorDetails = ({ classes, organizationName, orgImg, contacts }) => {
  return (
    <div className={classes.creatorDetailsContainer}>
      <h3>Provider</h3>
      <div className={classes.content}>
        <div className={classes.companyInfo}>
          <img src={orgImg || SingularityLogo} alt="SingularityNET" />
          <div className={classes.companyName}>
            <h4>{organizationName}</h4>
          </div>
        </div>
        <Contacts contacts={contacts} />
      </div>
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
