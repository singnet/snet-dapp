import React from "react";
import Input from "@material-ui/core/Input";
import Icon from "@material-ui/core/Icon";
import clsx from "clsx";

import { useStyles } from "./styles";

const SearchInputToggler = ({ showSearchInput, toggleSearchInput, handleSearch, searchKeyword }) => {
  const classes = useStyles();

  if (showSearchInput) {
    return (
      <Input error onBlur={() => toggleSearchInput(false)} autoFocus onChange={handleSearch} value={searchKeyword} />
    );
  }
  return <Icon className={clsx(classes.icon, "fa fa-search")} onClick={() => toggleSearchInput(true)} />;
};

export default SearchInputToggler;
