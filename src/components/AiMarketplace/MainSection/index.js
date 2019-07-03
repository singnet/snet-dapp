import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/styles";
import { connect } from "react-redux";

import Filter from "./Filter";
import ServiceCollection from "./ServiceCollection";
import { useStyles } from "./styles";
import { serviceActions } from "../../../Redux/actionCreators";

class MainSection extends Component {
  state = {
    listView: true,
  };

  componentDidMount = () => {
    this.handleFetchService(this.props.pagination);
  };

  handlePaginationChange = async pagination => {
    await this.props.updatePagination(pagination);
    this.handleFetchService(this.props.pagination);
  };

  handleFetchService = pagination => {
    this.props.fetchService(pagination);
  };

  toggleView = () => {
    this.setState(prevState => ({ listView: !prevState.listView }));
  };

  render() {
    const { classes, serviceList, pagination } = this.props;
    const { listView } = this.state;
    return (
      <Grid container spacing={24} className={classes.mainSection}>
        <Grid item xs={12} sm={3} md={3} lg={3}>
          <Filter />
        </Grid>
        <Grid item xs={12} sm={9} md={9} lg={9}>
          <ServiceCollection
            data={serviceList}
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
            }}
          />
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  serviceList: state.serviceReducer.serviceList,
  pagination: state.serviceReducer.pagination,
  isLoggedIn: state.userReducer.login.isLoggedIn,
});

const mapDispatchToProps = dispatch => ({
  updatePagination: pagination => dispatch(serviceActions.updatePagination(pagination)),
  fetchService: pagination => dispatch(serviceActions.fetchService(pagination)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(MainSection));
