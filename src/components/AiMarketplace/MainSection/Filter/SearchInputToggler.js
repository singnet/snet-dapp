import React from "react";
import Input from "@mui/material/Input";
import Icon from "@mui/material/Icon";
import clsx from "clsx";

import { useStyles } from "./styles";

const SearchInputToggler = ({ showSearchInput, toggleSearchInput, handleSearch, searchKeyword }) => {
  const classes = useStyles();
  const handleBlur = () => {
    if (searchKeyword !== "") {
      return;
    }
    toggleSearchInput(false);
  };

  if (showSearchInput) {
    return <Input error onBlur={handleBlur} autoFocus onChange={handleSearch} value={searchKeyword} />;
  }
  return <Icon className={clsx(classes.icon, "fa fa-search")} onClick={() => toggleSearchInput(true)} />;
};

export default SearchInputToggler;
