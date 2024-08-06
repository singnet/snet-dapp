import React, { useState } from "react";
import { connect } from "react-redux";
import Grid from "@mui/material/Grid";

import { useStyles } from "./styles";
import SearchInputToggler from "./SearchInputToggler";
import ServiceSortOptions from "./ServiceSortOptions";
import ViewToggler from "./ViewToggler";
import StyledDropdown from "../../../../common/StyledDropdown";
import { serviceActions } from "../../../../../Redux/actionCreators";
import {
  defaultPaginationParameters,
  generateOrganizationsFilterObject,
} from "../../../../../utility/constants/Pagination";

const ToolBar = ({
  listView,
  total_count,
  handleSearchChange,
  toggleView,
  currentPagination,
  showToggler,
  filterDataProps,
  pagination,
  handleFilterChange,
}) => {
  const [showSearchInput, toggleSearchInput] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [activeOrgItem, setActiveOrgItem] = useState("default");

  const handleSearch = (event) => {
    setSearchKeyword(event.currentTarget.value);
    const pagination = {
      offset: 0,
      q: event.target.value,
    };
    handleSearchChange({ ...currentPagination, ...pagination });
  };

  const enhancedFilterData = filterDataProps.org_id.map((el) => ({
    value: el.key,
    label: el.value,
  }));

  const handleOrgFilterChange = (event) => {
    const { value, name } = event.target;
    if (value === activeOrgItem) {
      return;
    }
    let filterObj = [];
    if (value !== "default") {
      filterObj = generateOrganizationsFilterObject([value]);
    }
    setActiveOrgItem(value);

    const currentActiveFilterData = { [name]: [value] };

    const latestPagination = { ...pagination, ...defaultPaginationParameters, q: pagination.q };
    handleFilterChange({ pagination: latestPagination, filterObj, currentActiveFilterData });
  };

  const classes = useStyles();

  return (
    <Grid container className={classes.toolBar}>
      <Grid item md={7} lg={6} className={classes.sortBySection}>
        <div className={classes.sortDropdownsContainer}>
          <ServiceSortOptions />
        </div>
        {process.env.REACT_APP_IS_ALL_SERVICES_AVAILIBLE === "true" && (
          <div>
            <span className={classes.sortbyTxt}>Organization</span>
            <StyledDropdown
              list={enhancedFilterData}
              value={activeOrgItem}
              labelTxt="All Organization"
              name="org_id"
              onChange={handleOrgFilterChange}
            />
          </div>
        )}
      </Grid>
      <Grid item md={3} lg={6} className={classes.iconsContainer}>
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

const mapStateToProps = (state) => ({
  filterDataProps: state.serviceReducer.filterData,
  pagination: state.serviceReducer.pagination,
});

const mapDispatchToProps = (dispatch) => ({
  handleFilterChange: (args) => dispatch(serviceActions.handleFilterChange(args)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ToolBar);
