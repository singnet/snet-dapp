import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import { useStyles } from "./styles";
import SearchInputToggler from "./SearchInputToggler";
import ViewToggler from "./ViewToggler";
import StyledDropdown from "@common/StyledDropdown";
import { serviceActions } from "@redux/actionCreators";
import { defaultPaginationParameters } from "@utility/constants/Pagination";
import { sortByCategories } from "../../../../utility/constants/Pagination";

const Filter = ({ listView, handleSearchChange, toggleView, currentPagination, showToggler }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { totalCount, filterData, pagination, activeFilterItem } = useSelector((state) => state.serviceReducer);
  const activeFilterDefault = {
    orgId: activeFilterItem?.orgId || "default",
    tagName: activeFilterItem?.tagName || "default",
  };
  const [showSearchInput, toggleSearchInput] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [activeFilter, setActiveFilter] = useState(activeFilterDefault);
  const [activeSortItem, setActiveSortItem] = useState("default");
  const [isViewOnlyAvailable, setIsViewOnlyAvailable] = useState(activeFilterItem.onlyAvailable);

  useEffect(() => {
    return () => dispatch(serviceActions.resetFilter({ pagination }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const handleSearch = (event) => {
    setSearchKeyword(event.currentTarget.value);
    const pagination = {
      page: 1,
      q: event.target.value,
    };
    handleSearchChange({ ...currentPagination, ...pagination });
  };

  const enhancedorgIdFilterData = Object.keys(filterData.orgId).map((key) => ({
    value: key,
    label: filterData.orgId[key],
  }));

  const enhancedTagFilterData = filterData.tagName.map((tag) => ({
    value: tag,
    label: tag,
  }));

  const handleOrgFilterChange = async (event) => {
    const { value, name } = event.target;

    if (value === activeFilter[name]) {
      return;
    }

    const filterObj = { ...activeFilterItem, [name]: [value] };

    if (value === "default") {
      setActiveFilter({ ...activeFilter, [name]: "default" });
      delete filterObj[name];
    } else {
      setActiveFilter({ ...activeFilter, [name]: [value] });
    }

    const latestPagination = { ...pagination, page: defaultPaginationParameters.page };
    await dispatch(serviceActions.handleFilterChange(latestPagination, filterObj));
  };

  const handleSortChange = async (event) => {
    const value = event.target.value;
    if (value === "default" || value === activeSortItem) {
      return;
    }
    setActiveSortItem(value);
    const latestPagination = { ...pagination, page: defaultPaginationParameters.page, sort: value };
    await dispatch(serviceActions.handleFilterChange(latestPagination, activeFilterItem));
  };

  const handleOnlyAvailableChange = async () => {
    setIsViewOnlyAvailable(!isViewOnlyAvailable);
    console.log("pagination: ", pagination);

    await dispatch(
      serviceActions.handleFilterChange(
        { ...pagination, page: defaultPaginationParameters.page },
        { ...activeFilterItem, onlyAvailable: !isViewOnlyAvailable }
      )
    );
  };

  return (
    <Grid container className={classes.toolBar}>
      <Grid item md={8} lg={8} className={classes.sortBySection}>
        <div className={classes.sortDropdownsContainer}>
          <span className={classes.sortbyTxt}>Sort by</span>
          <StyledDropdown
            list={sortByCategories}
            value={activeSortItem}
            labelTxt="Select"
            onChange={handleSortChange}
          />
        </div>
        {process.env.REACT_APP_IS_ALL_SERVICES_AVAILIBLE === "true" && (
          <div className={classes.sortDropdownsContainer}>
            <span className={classes.sortbyTxt}>Organization</span>
            <StyledDropdown
              list={enhancedorgIdFilterData}
              value={activeFilter.orgId}
              labelTxt="All Organization"
              name="orgId"
              onChange={handleOrgFilterChange}
            />
          </div>
        )}
        <div className={classes.sortDropdownsContainer}>
          <span className={classes.sortbyTxt}>Tag</span>
          <StyledDropdown
            list={enhancedTagFilterData}
            value={activeFilter.tagName}
            labelTxt="All tags"
            name="tagName"
            onChange={handleOrgFilterChange}
          />
        </div>
        <div className={classes.sortDropdownsContainer}>
          <FormControlLabel
            className={classes.sortbyTxt}
            control={<Checkbox checked={isViewOnlyAvailable} onChange={handleOnlyAvailableChange} color="primary" />}
            label="Only available"
            labelPlacement="start"
          />
        </div>
      </Grid>
      <Grid item md={4} lg={4} className={classes.iconsContainer}>
        <span className={classes.servicesCount}>{totalCount} services</span>
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

export default Filter;
