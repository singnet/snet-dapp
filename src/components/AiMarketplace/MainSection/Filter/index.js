import React, { useState } from "react";
import { connect } from "react-redux";

import StyledExpansionPanel from "./StyledExpansionPanel";
import { useStylesHook } from "./styles";
import { serviceActions, loaderActions } from "../../../../Redux/actionCreators";
import {
  filterParamters,
  defaultActiveFilterItem,
  defaultPaginationParameters,
  generateFilterObject,
} from "../../../../utility/constants/Pagination";
import { LoaderContent } from "../../../../utility/constants/LoaderContent";

const Filter = ({ services, pagination, updatePagination, fetchService, filterDataProps, startLoader, stopLoader }) => {
  const [activeFilterItem, setActiveFilterItem] = useState(defaultActiveFilterItem);
  const classes = useStylesHook();
  const filterData = {};
  Object.entries(filterDataProps).map(([key, items]) => {
    filterData[key] = { title: key, name: key, items };
  });

  const handleActiveFilterItemChange = async event => {
    startLoader();
    const name = event.currentTarget.name;
    const value = event.currentTarget.value;
    const currentFilterItem = [...activeFilterItem[name]];
    if (!currentFilterItem.includes(value)) {
      currentFilterItem.push(value);
    } else {
      currentFilterItem.splice(currentFilterItem.findIndex(el => el === value), 1);
    }
    const currentActiveFilterData = { ...activeFilterItem, [name]: currentFilterItem };
    const filterObj = generateFilterObject(currentActiveFilterData);
    const latestPagination = { ...pagination, ...defaultPaginationParameters, s: filterParamters[name], q: value };
    await updatePagination(latestPagination);
    await fetchService(latestPagination, filterObj);
    setActiveFilterItem(currentActiveFilterData);
    stopLoader();
  };

  const handleFilterReset = async () => {
    const latestPagination = { ...pagination, ...defaultPaginationParameters, s: filterParamters.all, q: "" };
    await fetchService(latestPagination);
    setActiveFilterItem(defaultActiveFilterItem);
  };

  return (
    <div className={classes.filterContainer}>
      <div className={classes.filterResetBtnContainer}>
        <h2 className={classes.h2}>Filters</h2>
        <button className={classes.resetBtn} type="reset" value="Reset" onClick={handleFilterReset}>
          Reset
        </button>
      </div>
      <StyledExpansionPanel
        expansionItems={Object.values(filterData)}
        handleChange={handleActiveFilterItemChange}
        activeFilterItem={activeFilterItem}
      />
    </div>
  );
};

const mapStateToProps = state => ({
  services: state.serviceReducer.services,
  pagination: state.serviceReducer.pagination,
  filterDataProps: state.serviceReducer.filterData,
});

const mapDispatchToProps = dispatch => ({
  startLoader: () => dispatch(loaderActions.startAppLoader(LoaderContent.FILTER)),
  stopLoader: () => dispatch(loaderActions.stopAppLoader),
  updatePagination: pagination => dispatch(serviceActions.updatePagination(pagination)),
  fetchService: (pagination, filterObj) => dispatch(serviceActions.fetchService(pagination, filterObj)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Filter);
