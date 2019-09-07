import React, { Fragment, useState } from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { withStyles } from "@material-ui/styles";
import CaretIcon from "@material-ui/icons/ArrowDropDown";

import { useStyles } from "./styles";
import AnchorLink from "../AnchorLink";

const StyledMenu = ({ classes, label, list }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Fragment>
      <div onClick={handleOpen}>
        <Button className={classes.button}>{label}</Button>
        <CaretIcon />
      </div>
      <Menu anchorEl={anchorEl} id="simple-menu" open={Boolean(anchorEl)} onClose={handleClose}>
        {list.map(item => (
          <MenuItem key={item.label} className={classes.menuItem}>
            <AnchorLink label={item.label} href={item.link} newTab={item.newTab} />
          </MenuItem>
        ))}
      </Menu>
    </Fragment>
  );
};

export default withStyles(useStyles)(StyledMenu);
