import React from "react";
import { connect } from "react-redux";
import { serviceActions } from "../../../../Redux/actionCreators";

import ToolBar from "./ToolBar";

const Filter = ({ toolbarProps }) => {
  return <ToolBar {...toolbarProps} />;
};

const mapStateToProps = (state) => ({
  activeFilterItem: state.serviceReducer.activeFilterItem,
  pagination: state.serviceReducer.pagination,
  filterDataProps: state.serviceReducer.filterData,
});

const mapDispatchToProps = (dispatch) => ({
  handleFilterChange: (args) => dispatch(serviceActions.handleFilterChange(args)),
  resetFilter: (args) => dispatch(serviceActions.resetFilter(args)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
