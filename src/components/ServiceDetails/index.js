import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/styles";
import { connect } from "react-redux";

import TitleCard from "./TitleCard";
import PricingDetails from "./PricingDetails";
import StyledTabs from "./StyledTabs";
import { useStyles } from "./styles";
import { serviceActions } from "../../Redux/actionCreators";

class ServiceDetails extends Component {
  state = {
    service_row_id: "",
    service: [],
  };

  componentDidMount = () => {
    console.log("props", this.props);
    const service_row_id = this.props.match.params.service_row_id;
    // if (!this.props.serviceList || this.props.serviceList.length === 0) {
    //   this.props.fetchService(this.props.pagination);
    //   return;
    // }
    // const service = this.props.serviceList.filter(el => el.service_id === service_row_id)[0];
    // this.setState({ service_row_id, service });
  };

  componentDidUpdate = () => {
    console.log("props", this.props);
  };

  render() {
    const { classes } = this.props;
    return (
      <Grid container spacing={24} className={classes.serviceDetailContainer}>
        <TitleCard />
        <PricingDetails />
        <StyledTabs />
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  serviceList: state.serviceReducer.serviceList,
  pagination: state.serviceReducer.pagination,
});

const mapDispatchToProps = dispatch => ({
  fetchService: pagination => dispatch(serviceActions.fetchService(pagination)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(ServiceDetails));
