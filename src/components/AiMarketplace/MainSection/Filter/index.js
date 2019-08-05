import React from "react";
import { connect } from "react-redux";

import StyledExpansionPanel from "./StyledExpansionPanel";
import { useStylesHook } from "./styles";
import { serviceActions } from "../../../../Redux/actionCreators";
import {
  defaultPaginationParameters,
  generateFilterObject,
  filterTitles,
} from "../../../../utility/constants/Pagination";

const Filter = ({ activeFilterItem, pagination, filterDataProps, handleFilterChange, resetFilter }) => {
  const classes = useStylesHook();
  const filterData = {};
  Object.entries(filterDataProps).forEach(
    ([key, items]) => (filterData[key] = { title: filterTitles[key], name: key, items })
  );

  const handleActiveFilterItemChange = async event => {
    const name = event.currentTarget.name;
    const value = event.currentTarget.value;
    const currentFilterItem = [...activeFilterItem[name]];
    if (!currentFilterItem.includes(value)) {
      currentFilterItem.push(value);
    } else {
      currentFilterItem.splice(currentFilterItem.findIndex(el => el === value), 1);
    }
    const currentActiveFilterData = { ...activeFilterItem, [name]: currentFilterItem };
    let filterObj = [];
    for (let i in currentActiveFilterData) {
      if (currentActiveFilterData[i].length > 0) {
        filterObj = generateFilterObject(currentActiveFilterData);
        break;
      }
    }
    const latestPagination = { ...pagination, ...defaultPaginationParameters, q: pagination.q };
    handleFilterChange({ pagination: latestPagination, filterObj, currentActiveFilterData });
  };

  const handleFilterReset = async () => {
    const latestPagination = { ...pagination, ...defaultPaginationParameters };
    resetFilter({ pagination: latestPagination });
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
  activeFilterItem: state.serviceReducer.activeFilterItem,
  pagination: state.serviceReducer.pagination,
  filterDataProps: state.serviceReducer.filterData,
});

const mapDispatchToProps = dispatch => ({
  handleFilterChange: args => dispatch(serviceActions.handleFilterChange({ ...args })),
  resetFilter: args => dispatch(serviceActions.resetFilter({ ...args })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Filter);
