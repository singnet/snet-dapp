import React from "react";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import { useStyles } from "./styles";

const NavBar = ({ data, newTab }) => {
  const classes = useStyles();

  return (
    <List component="nav" className={classes.navUl}>
      {data.map(tab => (
        // eslint-disable-next-line react/jsx-key
        <ListItem button component="a" href={tab.link} target={tab.newTab ? "_blank" : "_self"} title={tab.title}>
          <ListItemText primary={tab.title} />
        </ListItem>
      ))}
    </List>
  );
};

export default NavBar;
