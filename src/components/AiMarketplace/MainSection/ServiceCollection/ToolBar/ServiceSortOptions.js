import React, { Fragment, useState } from "react";
import { connect } from "react-redux";

import StyledDropdown from "../../../../common/StyledDropdown";
import { useStyles } from "./styles";
import { sortByCategories, defaultPaginationParameters } from "../../../../../utility/constants/Pagination";
import { serviceActions } from "../../../../../Redux/actionCreators";

const ServiceSortOptions = ({ pagination, updatePagination, fetchService }) => {
  const [activeSortItem, setActiveSortItem] = useState(sortByCategories[0].value);
  const classes = useStyles();

  const handleSortChange = async event => {
    const value = event.currentTarget.value;
    const latestPagination = { ...pagination, ...defaultPaginationParameters, sort_by: value };
    updatePagination(latestPagination);
    await fetchService(latestPagination);
    setActiveSortItem(value);
  };

  return (
    <Fragment>
      <span className={classes.sortbyTxt}>Sort by:</span>
      <StyledDropdown list={sortByCategories} value={activeSortItem} labelTxt={"select"} onChange={handleSortChange} />
    </Fragment>
  );
};

const mapStateToProps = state => ({
  pagination: state.serviceReducer.pagination,
});

const mapDispatchToProps = dispatch => ({
  fetchService: pagination => dispatch(serviceActions.fetchService(pagination)),
  updatePagination: pagination => dispatch(serviceActions.updatePagination(pagination)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ServiceSortOptions);
