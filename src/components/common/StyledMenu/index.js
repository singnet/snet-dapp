import React, { Fragment, useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { withStyles } from "@mui/styles";
import CaretIcon from "@mui/icons-material/ArrowDropDown";
import PropTypes from "prop-types";

import { useStyles } from "./styles";
import AnchorLink from "../AnchorLink";

const StyledMenu = ({ classes, label, list }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpen = (event) => {
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
      <Menu
        anchorEl={anchorEl}
        id="simple-menu"
        open={Boolean(anchorEl)}
        onClose={handleClose}
        disableScrollLock={true}
      >
        {list.map((item) => (
          <MenuItem key={item.label} className={classes.menuItem}>
            <AnchorLink label={item.label} href={item.link} newTab={item.newTab} />
          </MenuItem>
        ))}
      </Menu>
    </Fragment>
  );
};

StyledMenu.propTypes = {
  label: PropTypes.string,
  list: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      link: PropTypes.string,
      newTab: PropTypes.bool,
    })
  ),
};

export default withStyles(useStyles)(StyledMenu);
