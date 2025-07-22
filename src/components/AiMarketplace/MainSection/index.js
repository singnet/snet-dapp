import React, { Component } from "react";
import Grid from "@mui/material/Grid";
import { withStyles } from "@mui/styles";
import { connect } from "react-redux";

import Filter from "./Filter";
import StyledPagination from "./StyledPagination";
import ServiceCollection from "./ServiceCollection";
import { useStyles } from "./styles";
import { serviceActions } from "../../../Redux/actionCreators";
import { filterAttributes } from "../../../utility/constants/Pagination";
import { isDesktop } from "../../../utility/constants/UXProperties";

class MainSection extends Component {
  state = {
    listView: false,
  };

  componentDidMount = () => {
    const { fetchFilterData } = this.props;
    this.handleFetchService(this.props.pagination);
    filterAttributes.map((attribute) => fetchFilterData(attribute));
  };

  handlePaginationChange = async (pagination) => {
    await this.props.updatePagination(pagination);
    this.handleFetchService(this.props.pagination);
  };

  handleFetchService = (pagination) => {
    const { currentFilter, fetchService } = this.props;
    fetchService(pagination, currentFilter);
  };

  toggleView = () => {
    this.setState((prevState) => ({ listView: !prevState.listView }));
  };

  render() {
    const { classes, pagination, totalCount } = this.props;
    const { listView } = this.state;
    return (
      <Grid container className={classes.mainSection}>
        <Grid item xs={12} sm={12} md={12} lg={12} className={classes.filterMainContainer}>
          <Filter
            listView={listView}
            handleSearchChange={this.handlePaginationChange}
            toggleView={this.toggleView}
            showToggler={isDesktop}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} className={classes.servieMainContainer}>
          <ServiceCollection listView={listView} />
          <StyledPagination
            limit={pagination.limit}
            page={pagination.page}
            totalCount={totalCount}
            handleChange={this.handlePaginationChange}
          />
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({
  totalCount: state.serviceReducer.totalCount,
  pagination: state.serviceReducer.pagination,
  currentFilter: state.serviceReducer.activeFilterItem,
});

const mapDispatchToProps = (dispatch) => ({
  updatePagination: (pagination) => dispatch(serviceActions.updatePagination(pagination)),
  fetchService: (pagination, filterObj) => dispatch(serviceActions.fetchService(pagination, filterObj)),
  fetchFilterData: (attribute) => dispatch(serviceActions.fetchFilterData(attribute)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(MainSection));
