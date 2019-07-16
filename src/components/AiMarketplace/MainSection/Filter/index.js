import React, { useState } from "react";
import { connect } from "react-redux";

import StyledExpansionPanel from "./StyledExpansionPanel.js";
import { useStylesHook } from "./styles";
import { serviceActions } from "../../../../Redux/actionCreators/index.js";
import {
  filterParamters,
  defaultActiveFilterItem,
  defaultPaginationParameters,
  generateFilterObject,
} from "../../../../utility/constants/Pagination.js";

// let filterData = { ...defaultFilterData };

const Filter = ({ services, pagination, updatePagination, fetchService, filterDataProps }) => {
  const [activeFilterItem, setActiveFilterItem] = useState(defaultActiveFilterItem);
  const classes = useStylesHook();
  const filterData = {};
  Object.entries(filterDataProps).map(([key, items]) => {
    filterData[key] = { title: key, name: key, items };
  });

  // if (services.length > 0) {
  //   services.map(service => {
  //     if (service.tags.length > 0) {
  //       service.tags.map(tag => {
  //         if (!filterData.tags.items.find(el => el.title === tag)) {
  //           filterData.tags.items.push({ title: tag });
  //         }
  //       });
  //     }
  //   });
  // }

  const handleActiveFilterItemChange = async event => {
    const name = event.currentTarget.name;
    const value = event.currentTarget.value;
    const currentFilterItem = [...activeFilterItem[name]];
    if (!currentFilterItem.includes(value)) {
      currentFilterItem.push(value);
    } else {
      currentFilterItem.splice(currentFilterItem.findIndex(value), 1);
    }
    const currentActiveFilterData = { ...activeFilterItem, [name]: currentFilterItem };
    const filterObj = generateFilterObject(currentActiveFilterData);
    const latestPagination = { ...pagination, ...defaultPaginationParameters, s: filterParamters[name], q: value };
    await updatePagination(latestPagination);
    await fetchService(latestPagination, filterObj);
    setActiveFilterItem(currentActiveFilterData);
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
  updatePagination: pagination => dispatch(serviceActions.updatePagination(pagination)),
  fetchService: (pagination, filterObj) => dispatch(serviceActions.fetchService(pagination, filterObj)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Filter);
