import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Icon from "@material-ui/core/Icon";
import clsx from "clsx";
import { connect } from "react-redux";

import StyledDropdown from "../../../../common/StyledDropdown";
import { serviceActions } from "../../../../../Redux/actionCreators";
import { useStyles } from "./styles";
import SearchInputToggler from "./SearchInputToggler";

const ToolBar = ({ listView, total_count, fetchService }) => {
  const [showSearchInput, toggleSearchInput] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");

  const handleSearch = event => {
    setSearchKeyword(event.target.value);
    const pagination = {
      offset: 0,
      q: event.target.value,
    };
    fetchService(pagination);
  };

  const classes = useStyles();

  return (
    <Grid container spacing={24} className={classes.toolBar}>
      <Grid item xs={12} sm={6} md={6} lg={6} className={classes.sortBySection}>
        <span className={classes.sortbyTxt}>Sort by:</span>
        <StyledDropdown labelTxt="" />
      </Grid>
      <Grid item xs={12} sm={6} md={6} lg={6} className={classes.iconsContainer}>
        <span className={classes.servicesCount}>{total_count} services &nbsp;&nbsp;&nbsp; | </span>
        <button className={classes.searchBar}>
          <SearchInputToggler
            showSearchInput={showSearchInput}
            toggleSearchInput={toggleSearchInput}
            handleSearch={handleSearch}
            searchKeyword={searchKeyword}
          />
        </button>
        {listView ? (
          <button>
            <Icon className={clsx(classes.icon, "fa fa-th")} />
          </button>
        ) : (
          <button>
            <Icon className={clsx(classes.icon, "fa fa-th-list")} />
          </button>
        )}
      </Grid>
    </Grid>
  );
};

const mapStateToProps = state => ({
  total_count: state.serviceReducer.total_count,
});

const mapDispatchToProps = dispatch => ({
  fetchService: pagination => dispatch(serviceActions.fetchService(pagination)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ToolBar);
