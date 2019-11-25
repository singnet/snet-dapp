import React, { Fragment } from "react";
import PropTypes from "prop-types";
import isEmpty from "lodash/isEmpty";

const ContactTypes = {
  SUPPORT: "support",
};

const Contacts = ({ contacts }) => {
  if (isEmpty(contacts)) {
    return null;
  }

  const supportContact = contacts.find(el => el.contact_type === ContactTypes.SUPPORT);
  return (
    <Fragment>
      <p>
        <strong>Phone:</strong> {supportContact.phone}
      </p>
      <p>
        <strong>Email:</strong> {supportContact.email_id}
      </p>
    </Fragment>
  );
};

Contacts.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      phone: PropTypes.string,
      email_id: PropTypes.string,
      contact_type: PropTypes.string,
    })
  ),
};

export default Contacts;
