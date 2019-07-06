import React, { useState } from "react";
import { connect } from "react-redux";

import StyledExpansionPanel from "./StyledExpansionPanel.js";
import { useStylesHook } from "./styles";
import { serviceActions } from "../../../../Redux/actionCreators/index.js";

const FilterParamters = { display_name: "dn", org_id: "org", tags: "tg" };

let expansionData = {
  display_name: {
    title: "Display name",
    name: "display_name",
    items: [],
  },
  org_id: {
    title: "Organization id",
    name: "org_id",
    items: [],
  },
  tags: {
    title: "Tag name",
    name: "tags",
    items: [],
  },
};

const Filter = ({ services, pagination, updatePagination, fetchService }) => {
  const [activeFilterItem, setActiveFilterItem] = useState({
    display_name: "",
    org_id: "",
    tags: "",
  });
  const classes = useStylesHook();

  if (services.length > 0) {
    services.map(service => {
      if (!expansionData.display_name.items.find(el => el.title === service.display_name)) {
        expansionData.display_name.items.push({ title: service.display_name });
      }
      if (!expansionData.org_id.items.find(el => el.title === service.org_id)) {
        expansionData.org_id.items.push({ title: service.org_id });
      }
      if (service.tags.length > 0) {
        expansionData.tags.map(tag => {
          expansionData.tags.items.push({ title: tag });
        });
      }
    });
  }

  const handleActiveFilterItemChange = async event => {
    const name = event.currentTarget.name;
    const value = event.currentTarget.value;
    const latestPagination = { ...pagination, s: FilterParamters[name], q: value };
    await updatePagination(latestPagination);
    await fetchService(latestPagination);
    setActiveFilterItem({
      ...activeFilterItem,
      [name]: value,
    });
  };

  return (
    <div className={classes.filterContainer}>
      <div className={classes.filterResetBtnContainer}>
        <h2 className={classes.h2}>Filters</h2>
        <button className={classes.resetBtn} type="reset" value="Reset">
          Reset
        </button>
      </div>
      <StyledExpansionPanel
        expansionData={Object.values(expansionData)}
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
