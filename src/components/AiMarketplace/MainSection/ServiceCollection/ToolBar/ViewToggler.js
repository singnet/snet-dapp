import React from "react";
import Icon from "@material-ui/core/Icon";
import clsx from "clsx";

import { useStyles } from "./styles";

const ViewToggler = ({ listView, toggleView }) => {
  const classes = useStyles();

  if (!listView) {
    return (
      <button onClick={toggleView}>
        <Icon className={clsx(classes.icon, "fa fa-th-list")} />
      </button>
    );
  }
  return (
    <button onClick={toggleView}>
      <Icon className={clsx(classes.icon, "fa fa-th")} />
    </button>
  );
};

export default ViewToggler;
