import React, { useState } from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";

import { useStyles } from "./styles";
import SearchInputToggler from "./SearchInputToggler";
import ServiceSortOptions from "./ServiceSortOptions";
import ViewToggler from "./ViewToggler";
import StyledDropdown from "../../../../common/StyledDropdown";
import { serviceActions } from "../../../../../Redux/actionCreators";
import { defaultPaginationParameters } from "../../../../../utility/constants/Pagination";

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

  const handleSearch = event => {
    setSearchKeyword(event.currentTarget.value);
    const pagination = {
      offset: 0,
      q: event.target.value,
    };
    handleSearchChange({ ...currentPagination, ...pagination });
  };

  const enhancedFilterData = filterDataProps.org_id.map(el => ({
    value: el.key,
    label: el.value,
  }));

  const handleOrgFilterChange = event => {
    const { value, name } = event.target;
    if (value === activeOrgItem) {
      return;
    }
    let filterObj = [];
    if (value !== "default") {
      filterObj = [
        {
          filter: [
            {
              filter_condition: {
                attr: "org_id",
                operator: "IN",
                value: [value],
              },
            },
          ],
        },
      ];
    }
    setActiveOrgItem(value);

    const currentActiveFilterData = { [name]: [value] };

    const latestPagination = { ...pagination, ...defaultPaginationParameters, q: pagination.q };
    handleFilterChange({ pagination: latestPagination, filterObj, currentActiveFilterData });
  };

  const classes = useStyles();

  return (
    <Grid container spacing={24} className={classes.toolBar}>
      <Grid item xs={6} sm={9} md={9} lg={6} className={classes.sortBySection}>
        <ServiceSortOptions />
        <div className={classes.organizationDropdownContainer}>
          <span className={classes.sortbyTxt}>Organization</span>
          <StyledDropdown
            list={enhancedFilterData}
            value={activeOrgItem}
            labelTxt="All Organization"
            name="org_id"
            onChange={handleOrgFilterChange}
          />
        </div>
      </Grid>
      <Grid item xs={6} sm={3} md={3} lg={6} className={classes.iconsContainer}>
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
  pagination: state.serviceReducer.pagination,
});

const mapDispatchToProps = dispatch => ({
  handleFilterChange: args => dispatch(serviceActions.handleFilterChange(args)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ToolBar);
