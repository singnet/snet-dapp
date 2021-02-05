import React from "react";
import { connect } from "react-redux";
import { useStylesHook } from "./styles";
import { serviceActions } from "../../../../Redux/actionCreators";

import ToolBar from "./ToolBar";

const Filter = ({ toolbarProps }) => {
  const classes = useStylesHook();

  return (
    <div className={classes.filterContainer}>
      <ToolBar {...toolbarProps} />
    </div>
  );
};

const mapStateToProps = state => ({
  activeFilterItem: state.serviceReducer.activeFilterItem,
  pagination: state.serviceReducer.pagination,
  filterDataProps: state.serviceReducer.filterData,
});

const mapDispatchToProps = dispatch => ({
  handleFilterChange: args => dispatch(serviceActions.handleFilterChange(args)),
  resetFilter: args => dispatch(serviceActions.resetFilter(args)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
