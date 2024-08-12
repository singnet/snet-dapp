import React, { Fragment } from "react";
import PropTypes from "prop-types";
import isEmpty from "lodash/isEmpty";
import Modal from "@mui/material/Modal";
import Card from "@mui/material/Card";
import { withStyles } from "@mui/styles";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import CloseIcon from "@mui/icons-material/Close";

import { useStyles } from "./styles";
import AlertBox from "../../../common/AlertBox";

const ContactTypes = {
  SUPPORT: "support",
};

const Contacts = ({ contacts, show, handleClose, classes }) => {
  if (isEmpty(contacts)) {
    return null;
  }
  const supportContact = contacts.find((el) =>
    el.contact_type ? el.contact_type.toLowerCase().trim() === ContactTypes.SUPPORT : null
  );

  if (!supportContact) {
    return (
      <Modal open={show} onClose={handleClose}>
        <Card className={classes.card}>
          <AlertBox message="No Contact Details Found" />
        </Card>
      </Modal>
    );
  }

  return (
    <Modal open={show} onClose={handleClose}>
      <Card className={classes.card}>
        <CardHeader
          className={classes.header}
          title={
            <Fragment>
              <span className={classes.headerTitle}>Contact Details</span>
              <span className={classes.closeIcon}>
                <CloseIcon onClick={handleClose} />
              </span>
            </Fragment>
          }
        />
        <CardContent className={classes.cardContent}>
          <List>
            <ListItem alignItems="flex-start" divider>
              <ListItemText
                primary="Support email"
                secondary={supportContact.email}
                secondaryTypographyProps={{
                  component: "a",
                  href: `mailTo:${supportContact.email}`,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: classes.anchor,
                }}
                className={classes.listItemText}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Support phone"
                secondary={supportContact.phone}
                secondaryTypographyProps={{ component: "span", className: classes.phoneNo }}
                className={classes.listItemText}
              />
            </ListItem>
          </List>
        </CardContent>
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
