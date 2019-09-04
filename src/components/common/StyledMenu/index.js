import React, { Fragment, useState } from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MUILink from "@material-ui/core/Link";
import { withStyles } from "@material-ui/core/styles";
import { useStyles } from "./styles";

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
      <Button onClick={handleOpen} className={classes.button}>
        {label}
      </Button>
      <Menu anchorEl={anchorEl} id="simple-menu" open={Boolean(anchorEl)} onClose={handleClose}>
        {list.map(item => (
          <MenuItem key={item.label}>
            <MUILink target="_blank" rel="noopener" href={item.link}>
              {item.label}
            </MUILink>
          </MenuItem>
        ))}
      </Menu>
    </Fragment>
  );
};

export default withStyles(useStyles)(StyledMenu);
