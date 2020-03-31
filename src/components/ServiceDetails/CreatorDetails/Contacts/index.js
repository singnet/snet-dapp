import React, { Fragment } from "react";
import PropTypes from "prop-types";
import isEmpty from "lodash/isEmpty";
import Modal from "@material-ui/core/Modal";
import Card from "@material-ui/core/Card";
import { withStyles } from "@material-ui/styles";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import CloseIcon from "@material-ui/icons/Close";

import { useStyles } from "./styles";
import AlertBox from "../../../common/AlertBox";

const ContactTypes = {
  SUPPORT: "support",
};

const Contacts = ({ contacts, show, handleClose, classes }) => {
  if (isEmpty(contacts)) {
    return null;
  }
  const supportContact = contacts.find(el => el.contact_type.toLowerCase().trim() === ContactTypes.SUPPORT);
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
                secondary={supportContact.email_id}
                secondaryTypographyProps={{
                  component: "a",
                  href: `mailTo:${supportContact.email_id}`,
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
