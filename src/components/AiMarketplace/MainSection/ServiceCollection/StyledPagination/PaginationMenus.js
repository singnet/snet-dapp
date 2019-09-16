import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Select from "@material-ui/core/Select";

const PaginationMenus = ({ totalItems, itemsPerPage, handleItemsPerPage, classes }) => {
  const menus = [];
  const step = 10;

  if (totalItems >= step) {
    let currentItem = step;
    while (currentItem <= totalItems) {
      menus.push(
        <MenuItem key={currentItem} value={currentItem}>
          {currentItem}
        </MenuItem>
      );
      currentItem = currentItem + step;
    }
    if (totalItems % step !== 0) {
      menus.push(
        <MenuItem key={totalItems} value={totalItems}>
          {totalItems}
        </MenuItem>
      );
    }
  } else {
    menus.push(
      <MenuItem key={totalItems} value={totalItems}>
        {totalItems}
      </MenuItem>
    );
  }
  return (
    <Select
      value={itemsPerPage}
      input={<OutlinedInput labelWidth={75} name="age" id="outlined-age-simple" onChange={handleItemsPerPage} />}
      className={classes.selectBox}
    >
      {menus.map(menu => menu)}
    </Select>
  );
};

export default PaginationMenus;
