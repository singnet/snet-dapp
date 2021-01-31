import React, { useState } from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";

import { useStyles } from "./styles";
import SearchInputToggler from "./SearchInputToggler";
import ServiceSortOptions from "./ServiceSortOptions";
import ViewToggler from "./ViewToggler";
import StyledDropdown from "../../../../common/StyledDropdown";
import { filterTitles } from "../../../../../utility/constants/Pagination";

const ToolBar = ({
  listView,
  total_count,
  handleSearchChange,
  toggleView,
  currentPagination,
  showToggler,
  filterDataProps,
}) => {
  const [showSearchInput, toggleSearchInput] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const filterData = {};
  Object.entries(filterDataProps).forEach(
    ([key, items]) => (filterData[key] = { title: filterTitles[key], name: key, items })
  );

  const handleSearch = event => {
    setSearchKeyword(event.currentTarget.value);
    const pagination = {
      offset: 0,
      q: event.target.value,
    };
    handleSearchChange({ ...currentPagination, ...pagination });
  };

  const classes = useStyles();

  return (
    <Grid container spacing={24} className={classes.toolBar}>
      <Grid item xs={6} sm={6} md={6} lg={6} className={classes.sortBySection}>
        <ServiceSortOptions />
        <div className={classes.organizationDropdownContainer}>
          <span className={classes.sortbyTxt}>Organization</span>
          <StyledDropdown list={Object.values(filterData)} />
        </div>
      </Grid>
      <Grid item xs={6} sm={6} md={6} lg={6} className={classes.iconsContainer}>
        <span className={classes.servicesCount}>{total_count} services</span>
        <button className={classes.searchBar}>
          <SearchInputToggler
            showSearchInput={showSearchInput}
            toggleSearchInput={toggleSearchInput}
            handleSearch={handleSearch}
            searchKeyword={searchKeyword}
          />
        </button>
        <ViewToggler listView={listView} toggleView={toggleView} show={showToggler} />
      </Grid>
    </Grid>
  );
};

const mapStateToProps = state => ({
  filterDataProps: state.serviceReducer.filterData,
});

export default connect(mapStateToProps)(ToolBar);
