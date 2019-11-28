import React from "react";
import PropTypes from "prop-types";
import isEmpty from "lodash/isEmpty";
import Modal from "@material-ui/core/Modal";
import Card from "@material-ui/core/Card";
import { withStyles } from "@material-ui/styles";
import CardHeader from "@material-ui/core/CardHeader";

import { useStyles } from "./styles";

const ContactTypes = {
  SUPPORT: "support",
};

const Contacts = ({ contacts, show, handleClose, classes }) => {
  if (isEmpty(contacts)) {
    return null;
  }

  const supportContact = contacts.find(el => el.contact_type.toLowerCase().trim() === ContactTypes.SUPPORT);
  return (
    <Modal open={show} onClose={handleClose}>
      <Card className={classes.card}>
        <CardHeader title="Contact Details" />
        <ul>
          <li>
            <strong>Support email:</strong> {supportContact.email_id}
          </li>
          <li>
            <strong>Support phone:</strong> {supportContact.phone}
          </li>
        </ul>
      </Card>
    </Modal>
  );
};

Contacts.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      phone: PropTypes.string,
      email_id: PropTypes.string,
      contact_type: PropTypes.string,
    })
  ),
  classes: PropTypes.object.isRequired,
};

export default withStyles(useStyles)(Contacts);
