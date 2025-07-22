import React, { Fragment } from "react";
import PropTypes from "prop-types";
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
import { useSelector } from "react-redux";

const Contacts = ({ show, handleClose, classes }) => {
  const supportContacts = useSelector((state) => state.serviceDetailsReducer.details.supportContacts);

  if (!supportContacts) {
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
                secondary={supportContacts.email}
                secondaryTypographyProps={{
                  component: "a",
                  href: `mailTo:${supportContacts.email}`,
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
                secondary={supportContacts.phone}
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
  classes: PropTypes.object.isRequired,
};

export default withStyles(useStyles)(Contacts);
