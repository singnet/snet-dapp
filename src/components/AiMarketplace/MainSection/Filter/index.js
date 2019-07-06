import React, { useState } from "react";
import { connect } from "react-redux";

import StyledExpansionPanel from "./StyledExpansionPanel.js";
import { useStylesHook } from "./styles";
import { serviceActions } from "../../../../Redux/actionCreators/index.js";
import {
  defaultFilterData,
  filterParamters,
  defaultActiveFilterItem,
} from "../../../../utility/constants/Pagination.js";

let filterData = { ...defaultFilterData };

const Filter = ({ services, pagination, updatePagination, fetchService }) => {
  const [activeFilterItem, setActiveFilterItem] = useState(defaultActiveFilterItem);
  const classes = useStylesHook();

  if (services.length > 0) {
    services.map(service => {
      if (!filterData.display_name.items.find(el => el.title === service.display_name)) {
        filterData.display_name.items.push({ title: service.display_name });
      }
      if (!filterData.org_id.items.find(el => el.title === service.org_id)) {
        filterData.org_id.items.push({ title: service.org_id });
      }
      if (service.tags.length > 0) {
        service.tags.map(tag => {
          if (!filterData.tags.items.find(el => el.title === tag)) {
            filterData.tags.items.push({ title: tag });
          }
        });
      }
    });
  }

  const handleActiveFilterItemChange = async event => {
    const name = event.currentTarget.name;
    const value = event.currentTarget.value;
    const latestPagination = { ...pagination, s: filterParamters[name], q: value };
    await updatePagination(latestPagination);
    await fetchService(latestPagination);
    setActiveFilterItem({
      ...activeFilterItem,
      [name]: value,
    });
  };

  const handleFilterReset = async () => {
    const latestPagination = { ...pagination, s: filterParamters.all, q: "" };
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
        expansionData={Object.values(filterData)}
        handleChange={handleActiveFilterItemChange}
        activeFilterItem={activeFilterItem}
      />
    </div>
  );
};

const mapStateToProps = state => ({
  services: state.serviceReducer.services,
  pagination: state.serviceReducer.pagination,
});

const mapDispatchToProps = dispatch => ({
  updatePagination: pagination => dispatch(serviceActions.updatePagination),
  fetchService: pagination => dispatch(serviceActions.fetchService(pagination)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Filter);
