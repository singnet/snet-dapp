import React, { Fragment } from "react";
import Input from "@material-ui/core/Input";
import Icon from "@material-ui/core/Icon";
import clsx from "clsx";

import { useStyles } from "./styles";

const SearchInputToggler = ({ showSearchInput, toggleSearchInput, handleSearch, searchKeyword }) => {
    const classes = useStyles();

    return (
        <Fragment>
            {showSearchInput ? (
                <Input
                    error
                    onBlur={() => toggleSearchInput(false)}
                    autoFocus
                    onChange={handleSearch}
                    value={searchKeyword}
                />
            ) : (
                <Icon className={clsx(classes.icon, "fa fa-search")} onClick={() => toggleSearchInput(true)} />
            )}
        </Fragment>
    );
};

export default SearchInputToggler;
