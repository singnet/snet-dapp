import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/styles";
import { connect } from "react-redux";

import Filter from "./Filter";
import ServiceCollection from "./ServiceCollection";
import { useStyles } from "./styles";
import { serviceActions } from "../../../Redux/actionCreators";
import { filterAttributes, generateFilterObject } from "../../../utility/constants/Pagination";

class MainSection extends Component {
  state = {
    listView: true,
  };

  componentDidMount = () => {
    const { fetchFilterData } = this.props;
    this.handleFetchService(this.props.pagination);
    filterAttributes.map(attribute => {
      fetchFilterData(attribute);
    });
  };

  handlePaginationChange = async pagination => {
    await this.props.updatePagination(pagination);
    this.handleFetchService(this.props.pagination);
  };

  handleFetchService = pagination => {
    const { currentFilter, fetchService } = this.props;
    let filterObj = [];
    for (let i in currentFilter) {
      if (currentFilter[i].length > 0) {
        filterObj = generateFilterObject(this.props.currentFilter);
        break;
      }
    }
    fetchService(pagination, filterObj);
  };

  toggleView = () => {
    this.setState(prevState => ({ listView: !prevState.listView }));
  };

  render() {
    const { classes, services, pagination, currentFilter } = this.props;
    const { listView } = this.state;
    return (
      <Grid container spacing={24} className={classes.mainSection}>
        <Grid item xs={12} sm={3} md={3} lg={3}>
          <Filter />
        </Grid>
        <Grid item xs={12} sm={9} md={9} lg={9}>
          <ServiceCollection
            data={services}
            paginationProps={{
              limit: pagination.limit,
              offset: pagination.offset,
              total_count: pagination.total_count,
              handleChange: this.handlePaginationChange,
            }}
            toolbarProps={{
              listView: listView,
              total_count: pagination.total_count,
              handleSearchChange: this.handlePaginationChange,
              toggleView: this.toggleView,
              currentPagination: pagination,
              currentFilter,
            }}
          />
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  services: state.serviceReducer.services,
  pagination: state.serviceReducer.pagination,
  isLoggedIn: state.userReducer.login.isLoggedIn,
  currentFilter: state.serviceReducer.activeFilterItem,
});

const mapDispatchToProps = dispatch => ({
  updatePagination: pagination => dispatch(serviceActions.updatePagination(pagination)),
  fetchService: (pagination, filterObj) => dispatch(serviceActions.fetchService(pagination, filterObj)),
  fetchFilterData: attribute => dispatch(serviceActions.fetchFilterData(attribute)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(MainSection));
